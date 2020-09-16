import './Review';
import '../StarRating';
import ContentOnScroll from './ContentScrollEvent';
import QuickViewTpl from '../../Templates/QuickView-Tpl';
import Thumbnail from '../../../Utils/Thumbnail-Helper';
import Jadwal from '../../../Utils/RestoRandomData/JadwalBuka-Helper';

class QuickViewComponent extends HTMLElement {
  set data(data) {
    this._restoData = data;
    this.innerHTML = QuickViewTpl(data, Jadwal.print());
    this.didRender();
  }

  didRender() {
    document.body.classList.add('open');
    const jadwalElement = this.querySelector('.hariini');
    const closeElement = this.querySelector('.close');
    this.events({ jadwalElement, closeElement });
    const thumbnailElement = this.querySelector('img');
    Thumbnail(thumbnailElement);
  }

  events({ jadwalElement, closeElement }) {
    jadwalElement.addEventListener('click', () => {
      jadwalElement.classList.toggle('active');
    });
    document.addEventListener('keydown', (e) => (
      e.key === 'Escape' ? this.hide() : null
    ));
    closeElement.addEventListener('click', () => this.hide());
    this.descriptionScrollHighlight();
    this.querySelector('.preview-content').scrollTo(0, 0);
  }

  hide() {
    document.body.classList.remove('open');
    this.classList.remove('show');
    document.getElementById(this._restoData.id).focus();
    this.innerHTML = '';
  }

  descriptionScrollHighlight() {
    const descriptionContainer = this.querySelector('.description');
    descriptionContainer.focus();
    ContentOnScroll.event(descriptionContainer);
  }
}

customElements.define('preview-resto', QuickViewComponent);
