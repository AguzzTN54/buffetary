/* eslint-disable class-methods-use-this */

import RestoListItemTpl from '../../Templates/RestoListItem';

class FavoriteRestoSearchView {
  getTemplate() {
    return `
       <div class="content">
       <input id="query" type="text">
       <h2 class="content__heading">Your Loved Resto</h2>
           <div id="resto">
           </div>
       </div>
   `;
  }

  getFavoriteRestoTemplate() {
    return `
       <div class="content">
           <h2 class="content__heading">Your Loved Resto</h2>
           <div id="resto">
           </div>
       </div>
       `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteResto(resto = []) {
    let html;
    if (resto.length) {
      html = resto.reduce((carry, restoItem) => carry.concat(RestoListItemTpl(restoItem)), '');
    } else {
      html = this._getEmptyRestoTemplate();
    }
    document.getElementById('resto').innerHTML = html;
    document.getElementById('resto').dispatchEvent(new Event('resto:updated'));
  }

  showResto(resto) {
    this.showFavoriteResto(resto);
  }

  _getEmptyRestoTemplate() {
    return '<div class="resto-item__not__found">Tidak ada film untuk ditampilkan</div>';
  }
}

export default FavoriteRestoSearchView;
