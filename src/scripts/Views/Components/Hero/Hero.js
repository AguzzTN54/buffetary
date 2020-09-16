import '../../../../styles/Hero/Hero.scss';
import HeroTpl from '../../Templates/Hero-Tpl';

class HeroComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = HeroTpl;
    this.sendOffsetToAppBar();
  }

  sendOffsetToAppBar() {
    const heroSearchForm = this.querySelector('.hero-search-form');
    const heroSearchFormOffsetTop = heroSearchForm.offsetTop;
    const Appbar = document.querySelector('app-bar');
    Appbar.heroSearchOffset = heroSearchFormOffsetTop;
  }
}

customElements.define('hero-content', HeroComponent);
