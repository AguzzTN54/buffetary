import AppBar from '../../Views/Components/Appbar/Appbar';

const AppbarInitiator = (headerContainer) => {
  const header = headerContainer;
  const newHeaderBar = document.createElement('app-bar');
  newHeaderBar.classList.add('p-absolute');
  header.appendChild(newHeaderBar);

  customElements.define('app-bar', AppBar);
};

export default AppbarInitiator;
