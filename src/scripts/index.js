import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import RegisterSW from './Utils/SW-Register';
import App from './Views/App';

const Buffetary = new App({
  header: document.querySelector('header'),
  content: document.querySelector('main'),
  loader: document.querySelector('.loader'),
});

window.addEventListener('hashchange', () => {
  Buffetary.renderPage();
});

window.addEventListener('load', () => {
  Buffetary.renderPage();
  RegisterSW.register();
});
