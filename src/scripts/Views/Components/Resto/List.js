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
    return isError ? this.renderError() : this._render(restaurants);
  }

  set query(query) {
    const searchResult = this._restoData.restaurants.filter((data) => {
      const { name, city, description } = data;
      return name.toLowerCase().includes(query)
        || city.toLowerCase().includes(query)
        || description.toLowerCase().includes(query);
    });
    return (searchResult.length > 0)
      ? this._renderSearchResult(query, searchResult)
      : this.renderError(`No Item(s) Found For '${query}'`);
  }

  _renderSearchResult(query, result) {
    const element = this.querySelector('section');
    element.innerHTML = `<h2 class="heading-title" style="text-align:center"> ${result.length} Item(s) found for "${query}"</h2>
    <div class="resto"></div>`;
    this._render(result);
  }

  _render(restoData) {
    const restoItemContainer = this.querySelector('.resto');
    restoItemContainer.innerHTML = '';
    restoData.forEach((data) => {
      const restoItemElement = document.createElement('resto-item');
      restoItemElement.data = data;
      restoItemContainer.appendChild(restoItemElement);
    });
  }

  renderError(dataMessage) {
    const element = this.querySelector('section');
    element.innerHTML = `<error-page ${dataMessage ? `data-message="${dataMessage}"` : ''}></error-page>`;
  }
}

customElements.define('resto-list', RestoListComponent);
