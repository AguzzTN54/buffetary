import RestoIDB from '../../../Data/IndexedDB';
import {
  getEmail,
  getSite,
  getTelp,
  jamBuka,
} from '../../../Utils/RestoRandomData/Index';
import Thumbnail from '../../../Utils/Thumbnail-Helper';
import RestoListItemTpl from '../../Templates/RestoListItem';
import '../StarRating';

class RestoListItem extends HTMLElement {
  set data(data) {
    const restoData = data;
    const { isFavorite, pictureId } = data;
    restoData.reviewCount = Math.floor(Math.random() * 123);
    restoData.buka = jamBuka();
    restoData.email = getEmail(data.name);
    restoData.website = getSite(data.name);
    restoData.phone = getTelp();
    this._restoData = restoData;
    this.render();
    this.event();
    if (isFavorite) this._updateSavedPic(pictureId);
  }

  async _updateSavedPic(pictureId) {
    const imgBlob = await RestoIDB.Blob.get(pictureId);
    const thumbnailElement = this.querySelector('img');
    thumbnailElement.src = imgBlob;
    this._restoData.pictureBlob = imgBlob;
  }

  event() {
    const thumbnailElement = this.querySelector('img');
    Thumbnail(thumbnailElement);
    const moreButon = this.querySelector('.more');
    moreButon.addEventListener('click', () => {
      const previewElement = document.querySelector('preview-resto');
      previewElement.data = this._restoData;
      previewElement.classList.add('show');
    });
  }

  render() {
    const restoData = this._restoData;
    const { description } = restoData;
    const shortDescription = `${description.substring(0, 50)}..`;
    restoData.shortDescription = shortDescription;
    restoData.statusBuka = this.statusBuka();
    this.innerHTML = RestoListItemTpl(restoData);
  }

  statusBuka() {
    const { buka } = this._restoData;
    const today = new Date();
    const day = today.getDay();
    const schedule = buka[day].jadwal;
    const isStatusBuka = (buka[day].status === 'tutup'
      || parseInt(schedule.buka, 10) > today.getHours()
      || parseInt(schedule.tutup, 10) < today.getHours());

    return isStatusBuka
      ? '<span class="closed"> Tutup</span>'
      : '';
  }
}

customElements.define('resto-item', RestoListItem);
