import '../../../../styles/Hero/Hero.scss';
import HeroTpl from '../../Templates/Hero-Tpl';

class HeroComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = HeroTpl;
    this._sendOffsetToAppBar();
  }

  _sendOffsetToAppBar() {
    const heroSearchForm = this.querySelector('.hero-search-form');
    const heroSearchFormOffsetTop = heroSearchForm.offsetTop;
    const Appbar = document.querySelector('app-bar');
    Appbar.heroSearchOffset = heroSearchFormOffsetTop;
    this._searchFormOnSubmit(heroSearchForm);
  }

  _searchFormOnSubmit(searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = this.querySelector('input[type="text"]');
      const resultContainer = document.querySelector('resto-list');
      if (query.value) resultContainer.query = query.value.toLowerCase();
    });
  }
}

customElements.define('hero-content', HeroComponent);
