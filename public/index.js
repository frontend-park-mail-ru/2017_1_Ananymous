// import Router from './modules/Route/Router';
// import SignIn from './views/SignIn/SignIn';
// import SignUp from './views/SignUp/SignUp';
// import Scoreboard from './views/Scoreboard/Scoreboard';
// import Main from './views/Main/Main';
//
// import './css/reset.scss';
//
// const router = new Router();
//
// router
//   .addRoute('/SignUp', SignUp)
//   .addRoute('/SignIn', SignIn)
//   .addRoute('/Scoreboard', Scoreboard)
//   .addRoute('/', Main)
//   .start();

import Button from './components/Button/Button';

const btn = new Button({
  text: 'Click me'
});

document.body.appendChild(btn.render());
