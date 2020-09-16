import '../../../styles/ErrorPage.scss';
import ErrorPageTpl from '../Templates/ErrorPage-Tpl';

class PageError extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute('data-type');
    const isNotFoundType = type === 'not-found';
    return isNotFoundType
      ? this.notFound()
      : this.failedToLoad();
  }

  failedToLoad() {
    const message = this.getAttribute('data-message');
    this.innerHTML = ErrorPageTpl.failedLoad(message);
    this.refreshClick();
  }

  notFound() {
    this.innerHTML = ErrorPageTpl.notFound();
    const brand = document.querySelector('.brand img');
    brand.src = './images/Buffetary-Logo.svg';
  }

  refreshClick() {
    const buttonRefresh = this.querySelector('button');
    buttonRefresh.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.reload();
    });
  }
}

customElements.define('error-page', PageError);
