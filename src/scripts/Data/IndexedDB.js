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
    const imgMedium = await fetch(`${SERVER_API}/images/medium/${id}`);
    const imgMediumBlob = await imgMedium.blob();
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
    const RestoData = await this.getRestoDetail(id);
    const errorMsg = 'Tidak Ada Data Tersimpan';
    const NotFound = { error: true, errorMsg };
    return RestoData || NotFound;
  },
  async getRestoDetail(id) {
    return (await IndexedDB).get(STORE, id);
  },
  async getAllResto() {
    return (await IndexedDB).getAll(STORE);
  },
  async addResto(restaurantData) {
    return (await IndexedDB).put(STORE, restaurantData);
  },
  async deleteResto(id) {
    return (await IndexedDB).delete(STORE, id);
  },
};

const RestoIDB = { Blob, Resto };

export default RestoIDB;
