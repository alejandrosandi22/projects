import passport from 'passport';
import dbConnect from '../../../../../utils/mongoose';
import '../../../../../utils/passport';

dbConnect();

export default async function (req, res, next) {
  passport.authenticate('auth-google', {
    scope: ['profile', 'email'],
    session: false,
  })(req, res, next);
}
