import '../Components/PageError';

const NotFound = {
  setContainer(container) {
    this._container = container;
    return this;
  },

  render() {
    const notFoundElements = document.createElement('error-page');
    notFoundElements.setAttribute('data-type', 'not-found');
    this._container.appendChild(notFoundElements);
  },
};

export default NotFound;
