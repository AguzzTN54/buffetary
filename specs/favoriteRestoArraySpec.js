/* eslint-disable no-prototype-builtins */
import { itActsAsFavoriteRestoModel } from './Contract/favoriteRestoContract';

let favoriteResto = [];

const FavoriteRestoArray = {
  getRestoDetail(id) {
    if (!id) return;
    return favoriteResto.find((resto) => resto.id === id);
  },

  getAllResto() {
    return favoriteResto;
  },

  addResto(resto) {
    if (!resto.hasOwnProperty('id')) return;
    if (this.getRestoDetail(resto.id)) return;
    favoriteResto.push(resto);
  },

  deleteResto(id) {
    favoriteResto = favoriteResto.filter((resto) => resto.id !== id);
  },

  searchResto(query) {
    return this.getAllResto()
      .filter((resto) => {
        const RestoTitle = (resto.restaurant.name || '-').toLowerCase();
        const jammedRestoTitle = RestoTitle.replace(/\s/g, '');
        const CaseQuery = query.toLowerCase();
        const jammedQuery = CaseQuery.replace(/\s/g, '');
        return jammedRestoTitle.indexOf(jammedQuery) !== -1;
      });
  },
};

describe('Favorite Resto Array Contract Test Implementation', () => {
  afterEach(() => { favoriteResto = []; });
  itActsAsFavoriteRestoModel(FavoriteRestoArray);
});
