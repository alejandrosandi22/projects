import css from 'styled-jsx/css';

const globals = css.global`
  :root {
    --primary: #E0E0E0;
    --secondary: #2D2C3F;
    --third: #14151B;
    --color: #151515;
    --darkShadow: #5A5A5A;
    --lightShadow: #fff;
    .darkMode {
      --primary: #151515;
      --secondary: #2D2C3F;
      --third: #14151B;
      --color: #E0E0E0;
      --darkShadow: #080808;
      --lightShadow: #222222;
    }
    font-size: 1vw;
    @media (max-width: 1024px) {
      font-size: 1.8vh;
    }
    @media (max-height: 500px) {
      font-size: 2vw;
    }

  }

  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
  }

  .App {
    width: 100%;
        height: 100%;
        position: absolute;
    background: var(--primary);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default globals;
