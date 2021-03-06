import { UserInputError } from 'apollo-server-micro';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from '../../utils/mongoose';
import User from '../../models/User';

dbConnect();

export const userResolvers = {
  Query: {
    currentUser: async (_root, _args, context) => {
      try {
        return context.currentUser;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    allUsers: async () => {
      const users = await User.find().catch((error) => {
        throw new UserInputError(error.message);
      });
      return users;
    },
  },
  Mutation: {
    createUser: async (_root, args) => {
      try {
        const user = await User.findOne({ email: args.email });
        if (user) throw new UserInputError('User already exist');
        const HashPassword = await bcrypt.hash(args.password, 12);
        const newUser = await new User({ ...args, password: HashPassword });

        const userForToken = {
          name: args.name,
          image: args.image ? args.image : '',
          email: args.email,
          id: newUser._id,
        };

        const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '8d',
        });

        await newUser.save();

        return {
          value: token,
        };
      } catch (error) {
        throw new UserInputError(error);
      }
    },
    socialSignIn: async (_root, args) => {
      try {
        const user = await User.findOne({ email: args.email });
        if (!user) {
          const newUser = await new User({
            name: args.name,
            email: args.email,
            image: args.image ? args.image : '',
            provider: args.provider,
          });

          const userForToken = {
            name: args.name,
            image: args.image ? args.image : '',
            email: args.email,
            _id: newUser._id,
          };

          const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '8d',
          });

          await newUser.save();

          return {
            value: token,
          };
        }
        if (user.provider) {
          const userForToken = {
            name: args.name,
            image: args.image ? args.image : '',
            email: args.email,
            id: user._id,
          };
          const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '8d',
          });

          return {
            value: token,
          };
        }
        throw new UserInputError('User logged with email and password');
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    signIn: async (_root, args) => {
      try {
        const user = await User.findOne({ email: args.email });
        if (!user) throw new UserInputError('User does not exist');

        const doMatch = await bcrypt.compare(args.password, user.password);

        if (!doMatch) throw new UserInputError('Incorrect credentials');

        const userForToken = {
          name: user.name,
          image: user.image ? user.image : '',
          email: args.email,
          id: user._id,
        };

        const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '8d',
        });

        return {
          value: token,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    deleteUser: async (_root, args) => {
      const deletedUser = await User.findOneAndDelete({ email: args.email });
      if (!deletedUser) throw new UserInputError('User does not exist');

      return deletedUser;
    },
  },
};
