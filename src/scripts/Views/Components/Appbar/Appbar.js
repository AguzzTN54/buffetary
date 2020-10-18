import '../../../../styles/Appbar/Appbar.scss';
import AppbarTpl from '../../Templates/Appbar-Tpl';
import DrawerEvent from './DrawerEvents';
import NavLinkEvents from './NavLinkEvent';
import SearchForm from './SearchFormEvent';

class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = AppbarTpl;
    this._offsetTopStickyAppbar = 15;
    this.event();
  }

  event() {
    this.addEventListener('click', (event) => {
      this.navigation(event);
    });
    document.addEventListener('keydown', (event) => {
      this.onEscapePress(event);
    });
    const brandLogo = this.querySelector('.brand img');
    window.addEventListener('scroll', () => {
      this.stickyAppbarScrollEvent(brandLogo);
    });
  }

  set heroSearchOffset(heroSearchPosition) {
    this._offsetTopStickyAppbar = heroSearchPosition;
  }

  stickyAppbarScrollEvent(brandLogo) {
    const isStickyAppbar = (window.pageYOffset > (this._offsetTopStickyAppbar * 3));
    return isStickyAppbar
      ? this.stickyAppbar(brandLogo)
      : this.staticAppbar(brandLogo);
  }

  stickyAppbar(logoContainer) {
    const AppbarElement = this.classList;
    const brand = logoContainer;
    brand.src = './images/Buffetary-Logo.svg';
    AppbarElement.remove('p-absolute');
    AppbarElement.add('p-fixed');
  }

  staticAppbar(logoContainer) {
    const AppbarElement = this.classList;
    const brand = logoContainer;
    brand.src = './images/Buffetary-Logo-white.svg';
    AppbarElement.remove('p-fixed');
    AppbarElement.add('p-absolute');
  }

  navigation(event) {
    DrawerEvent.onClick(this, event);
    NavLinkEvents.onClick(this, event);
    SearchForm.onClick(this, event);
  }

  onEscapePress(event) {
    const escapePressed = () => {
      this.querySelector('.nav-link').classList.remove('active');
      this.querySelector('.drawer-toggle').focus();
    };
    const isEscapeKey = event.key === 'Escape';
    return isEscapeKey ? escapePressed() : null;
  }

  set data(restoData) {
    const form = this.querySelector('input');
    form.addEventListener('keyup', (e) => {
      const query = e.target.value;
      const result = restoData.filter((data) => this._filterResult(data, query));
      if (query.length > 0) this._showQuickResult(result, query);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _filterResult(data, query) {
    const { name } = data;
    return name.toLowerCase().includes(query);
  }

  _showQuickResult(result, query) {
    const resultContainer = this.querySelector('.quick-result');
    let printResult = '';
    result.forEach((data) => {
      const { id, name } = data;
      printResult += `<a href="#/restaurant/${id}">
        ${name.replace(new RegExp(query, 'gi'), `<span>${query}</span>`)}
      </a>`;
    });
    resultContainer.innerHTML = printResult;
    const links = resultContainer.querySelectorAll('a');
    if (links.length > 0) this._resultEvent(links);
  }

  _resultEvent(links) {
    links.forEach((linkItem) => {
      linkItem.addEventListener('click', () => {
        SearchForm.close(null, this.querySelector('input'));
      });
    });
  }
}

customElements.define('app-bar', AppBar);
