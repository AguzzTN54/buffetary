import {
  getEmail,
  getSite,
  getTelp,
  jamBuka,
} from '../../../Utils/RestoRandomData/Index';
import '../../../../styles/Resto/Detail.scss';
import '../StarRating';
import RestoDetailTpl from '../../Templates/RestoDetail-Tpl';
import ContentOnScroll from './ContentScrollEvent';
import Thumbnail from '../../../Utils/Thumbnail-Helper';
import Jadwal from '../../../Utils/RestoRandomData/JadwalBuka-Helper';
import LoveButton from '../../../Utils/Init/LoveButonInitiator';
import RestoIDB from '../../../Data/IndexedDB';

class RestoDetailComponent extends HTMLElement {
  connectedCallback() {
    document.body.classList.remove('open');
    this.setAttribute('id', 'content');
    this.innerHTML = RestoDetailTpl.preload();
  }

  set data(restoData) {
    this._isFavorite = restoData.isFavorite;
    const { error, restaurant, errorMsg } = restoData;
    const isError = error || !restaurant;
    return isError
      ? this.renderError(errorMsg)
      : this.setData(restaurant);
  }

  setData(data) {
    const restaurant = data;
    restaurant.buka = jamBuka();
    restaurant.email = getEmail(restaurant.name);
    restaurant.website = getSite(restaurant.name);
    restaurant.phone = getTelp();
    this._data = restaurant;
    this.render();
  }

  render() {
    this.innerHTML = RestoDetailTpl.main(this._data, Jadwal.print());
    const { pictureId } = this._data;
    const thumbnailElement = this.querySelector('img');
    Thumbnail(thumbnailElement);
    this.renderConsumerReview();
    this.event();
    if (this._isFavorite) this._updateSavedPic(pictureId);
  }

  async _updateSavedPic(pictureId) {
    const imgBlob = await RestoIDB.Blob.get(pictureId);
    const thumbnailElement = this.querySelector('img');
    thumbnailElement.src = imgBlob;
  }

  renderConsumerReview() {
    const reviewElement = this.querySelector('consumer-review');
    reviewElement.data = this._data.consumerReviews;
  }

  event() {
    LoveButton.init({
      element: this.querySelector('.love-button'),
      data: this._data,
    });
    const jadwalElement = this.querySelector('.hariini');
    jadwalElement.addEventListener('click', () => {
      jadwalElement.classList.toggle('active');
    });
    const navButton = this.querySelectorAll('.nav-button');
    navButton.forEach((button) => this.slider(button));
    this.contentScrollHighlightInit();
  }

  slider(button) {
    button.addEventListener('click', (e) => {
      this.removeActiveMenu();
      e.preventDefault();
      e.target.classList.add('active');
      const contentTargetID = e.target.getAttribute('data-target');
      const slider = this.querySelector('.slides');
      const contentTarget = this.querySelector(contentTargetID);
      this.setActiveMenu(contentTarget, slider);
    });
  }

  setActiveMenu(contentTarget, slider) {
    contentTarget.removeAttribute('style');
    const slidePosition = -1 * contentTarget.offsetLeft;
    const sliderElement = slider;
    sliderElement.style.transform = `translateX(${slidePosition}px)`;
    return this;
  }

  removeActiveMenu() {
    const activeMenu = this.querySelector('.nav-button.active');
    const activeID = activeMenu.getAttribute('data-target');
    const activeContentMenu = this.querySelector(activeID);
    activeMenu.classList.remove('active');
    activeContentMenu.style.height = 0;
  }

  contentScrollHighlightInit() {
    const contentContainer = this.querySelectorAll('article.description');
    contentContainer.forEach((content) => ContentOnScroll.event(content));
  }

  renderError(message) {
    const printMsg = message || '';
    this.innerHTML = `<error-page data-message="${printMsg}"></error-page>`;
  }
}

customElements.define('resto-detail', RestoDetailComponent);
