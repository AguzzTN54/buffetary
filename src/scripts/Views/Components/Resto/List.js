import RestoListTpl from '../../Templates/RestoList-Tpl';
import '../../../../styles/Resto/Resto.scss';
import '../PageError';
import './ListItem';
import './QuickView';

class RestoListComponent extends HTMLElement {
  connectedCallback() {
    let itemPlacehoder = '';
    for (let i = 0; i < 20; i++) {
      itemPlacehoder += RestoListTpl;
    }
    this.innerHTML = `
      <hero-content></hero-content>
      <preview-resto></preview-resto>
      <section class="container" id="content" tabindex>
        <h2 class="heading-title"> DISCOVER</h2>
        <div class="resto">${itemPlacehoder}</div>
      </section>
    `;
    const footer = document.querySelector('footer');
    footer.style.height = 'unset';
  }

  set data(data) {
    const { error, restaurants } = data;
    const isError = error || !restaurants;
    this._restoData = data;
    return isError ? this.renderError() : this.event();
  }

  event() {
    const restoItemContainer = this.querySelector('.resto');
    restoItemContainer.innerHTML = '';
    this._restoData.restaurants.forEach((data) => {
      const restoItemElement = document.createElement('resto-item');
      restoItemElement.data = data;
      restoItemContainer.appendChild(restoItemElement);
    });
  }

  renderError() {
    const element = this.querySelector('section');
    element.innerHTML = '<error-page></error-page>';
  }
}

customElements.define('resto-list', RestoListComponent);
