import { itActsAsFavoriteRestoModel } from './Contract/favoriteRestoContract';
import RestoIDB from '../src/scripts/Data/IndexedDB';

describe('Favorite Resto IDB Contract Test Implementation', () => {
  afterEach(async () => {
    (await RestoIDB.Resto.getAllResto()).forEach(async (resto) => {
      await RestoIDB.Resto.deleteResto(resto.id);
    });
  });

  itActsAsFavoriteRestoModel(RestoIDB.Resto);
});
