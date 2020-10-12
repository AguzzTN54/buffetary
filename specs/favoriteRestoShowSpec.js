/* eslint-disable no-new */
import FavoriteRestoSearchView
  from '../src/scripts/Views/Pages/Liked/FavoriteRestoSearchView';
import FavoriteRestoShowPresenter
  from '../src/scripts/Views/Pages/Liked/FavoriteRestoShowPresenter';
import RestoIDB from '../src/scripts/Data/IndexedDB';

describe('Showing all favorite resto', () => {
  let view;
  const renderTemplate = () => {
    view = new FavoriteRestoSearchView();
    document.body.innerHTML = view.getTemplate();
  };
  beforeEach(() => { renderTemplate(); });

  describe('When no resto have been loved', () => {
    it('should ask for the favorite resto', () => {
      const favoriteResto = spyOnAllFunctions(RestoIDB.Resto);
      new FavoriteRestoShowPresenter({ view, favoriteResto });
      expect(favoriteResto.getAllResto).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no resto have been loved', (done) => {
      document.getElementById('resto').addEventListener('resto:updated', () => {
        expect(document.querySelectorAll('.resto-item__not__found').length).toEqual(1);
        done();
      });

      const favoriteResto = spyOnAllFunctions(RestoIDB.Resto);
      favoriteResto.getAllResto.and.returnValues([]);
      new FavoriteRestoShowPresenter({ view, favoriteResto });
    });

    it('should show the resto', (done) => {
      document.getElementById('resto').addEventListener('resto:updated', () => {
        expect(document.querySelectorAll('.resto-content-item').length).toEqual(2);
        done();
      });

      const favoriteResto = spyOnAllFunctions(RestoIDB.Resto);
      favoriteResto.getAllResto.and.returnValues([
        { id: 'TestKarmaID1', restaurant: { name: 'Resto Item Tes1' } },
        { id: 'TestKarmaID2', restaurant: { name: 'Resto Item Tes2' } },
      ]);
      new FavoriteRestoShowPresenter({ view, favoriteResto });
    });
  });
});
