// import FavoriteTpl from '../../Templates/Favorite-Tpl';
import RestoListTpl from '../../Templates/RestoList-Tpl';
import '../../../../styles/Resto/Favorite.scss';
import '../Resto/ListItem';
import '../Resto/QuickView';

class FavoriteComponent extends HTMLElement {
  connectedCallback() {
    let itemPlacehoder = '';
    for (let i = 0; i < 4; i++) {
      itemPlacehoder += RestoListTpl;
    }
    this.innerHTML = `
      <figure>
        <img src="./images/heros/hero-image_2.webp"
          srcset="./images/heros/hero-image_2-small.webp 480w, ./images/heros/hero-image_2-medium.webp 800w"
          sizes="(max-width: 600px) 480px, 800px"
          alt="Banner Favorite"
        />
        <h1>FAVORITE</h1>
      </figure>
      <preview-resto> </preview-resto>
      <section class="container" id="content" tabindex>
        <h2 class="heading-title">MY FAVORITE RESTAURANTS</h2>
        <div class="resto">${itemPlacehoder}</div>
      </section>
    `;
    const footer = document.querySelector('footer');
    footer.style.height = 'unset';
  }

  set data(data) {
    const isHasData = data.length > 0;
    this._restoData = data;
    return isHasData ? this.render() : this.renderError();
  }

  render() {
    const restoItemContainer = this.querySelector('.resto');
    restoItemContainer.innerHTML = '';
    this._restoData.forEach((data) => this.renderFavorit(data, restoItemContainer));
  }

  renderFavorit(data, restoItemContainer) {
    const { restaurant } = data;
    restaurant.isFavorite = true;
    const restoItemElement = document.createElement('resto-item');
    restoItemElement.data = restaurant;
    restoItemContainer.appendChild(restoItemElement);
    return this;
  }

  renderError() {
    const restoItemContainer = this.querySelector('.resto');
    const message = 'Belum Ada Restoran Favorit';
    restoItemContainer.innerHTML = `<error-page data-message="${message}"></error-page>`;
  }
}

customElements.define('my-favorite', FavoriteComponent);
