import { openDB } from 'idb';
import APP_CONFIG from '../Globals/Config';

const { IDB, SERVER_API } = APP_CONFIG;
const { DBNAME, STORE, VERSION } = IDB;
const IMGSTORE = 'BlobResto';

const IndexedDB = openDB(DBNAME, VERSION, {
  upgrade(db) {
    db.createObjectStore(STORE, { keyPath: 'id' });
    db.createObjectStore(IMGSTORE, { keyPath: 'id' });
  },
});

const Blob = {
  async save(id) {
    const imgLarge = await fetch(`${SERVER_API}/images/large/${id}`);
    const imgMediumBlob = await imgLarge.blob();
    const imgToSave = { id, blob: imgMediumBlob };
    return (await IndexedDB).put(IMGSTORE, imgToSave);
  },
  async get(id) {
    const img = await (await IndexedDB).get(IMGSTORE, id.toString());
    const URL = window.URL || window.webkitURL;
    return URL.createObjectURL(img.blob);
  },
  async delete(id) {
    return (await IndexedDB).delete(IMGSTORE, id);
  },
};

const Resto = {
  async RestoDetails(id) {
    if (!id) return;
    const RestoData = await this.getRestoDetail(id);
    const errorMsg = 'Tidak Ada Data Tersimpan';
    const NotFound = { error: true, errorMsg };
    return RestoData || NotFound;
  },
  async getRestoDetail(id) {
    if (!id) return;
    return (await IndexedDB).get(STORE, id);
  },
  async getAllResto() {
    return (await IndexedDB).getAll(STORE);
  },
  async searchResto(query) {
    return (await this.getAllResto()).filter((resto) => {
      const { restaurant } = resto;
      const restoTitle = (restaurant.name || '-').toLowerCase();
      const jammedRestoTitle = restoTitle.replace(/\s/g, '');
      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');
      return jammedRestoTitle.indexOf(jammedQuery) !== -1;
    });
  },
  async addResto(restaurantData) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurantData.hasOwnProperty('id')) return;
    return (await IndexedDB).put(STORE, restaurantData);
  },
  async deleteResto(id) {
    if (!id) return;
    return (await IndexedDB).delete(STORE, id);
  },
};

const RestoIDB = { Blob, Resto };

export default RestoIDB;
