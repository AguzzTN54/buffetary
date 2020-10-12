import FavoriteRestoSearchPresenter
  from '../src/scripts/Views/Pages/Liked/FavoriteRestoSearchPresenter';
import RestoIDB from '../src/scripts/Data/IndexedDB';
import FavoriteRestoSearchView
  from '../src/scripts/Views/Pages/Liked/FavoriteRestoSearchView';

describe('Searching restaurant', () => {
  const stringQuery = 'Great Bufetaria';
  const stringID = 'TestWithKarma';
  let presenter;
  let favoriteResto;
  let view;

  const searchResto = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestoSearchContainer = () => {
    view = new FavoriteRestoSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteResto = spyOnAllFunctions(RestoIDB.Resto);
    presenter = new FavoriteRestoSearchPresenter({
      favoriteResto,
      view,
    });
  };

  beforeEach(() => {
    setRestoSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchResto(stringQuery);
      expect(presenter.latestQuery).toEqual(stringQuery);
    });

    it('should ask the model to search for restaurant', () => {
      searchResto(stringQuery);
      expect(favoriteResto.searchResto).toHaveBeenCalledWith(stringQuery);
    });

    it('should show the found restaurant', () => {
      presenter._showFoundResto([{ id: `${stringID}1` }]);
      expect(document.querySelectorAll('.resto-content-item').length).toEqual(1);
      presenter._showFoundResto([
        { id: `${stringID}1`, name: stringQuery },
        { id: `${stringID}2`, name: `${stringQuery} Dua` },
      ]);
      expect(document.querySelectorAll('.resto-content-item').length).toEqual(2);
    });

    it('should show the title of the found restaurant', () => {
      presenter._showFoundResto([
        { id: `${stringID}1`, name: stringQuery },
      ]);
      // console.log(document.querySelectorAll('.resto-content-item'))
      expect(document.querySelectorAll('.resto-title')
        .item(0).textContent)
        .toEqual(stringQuery);
    });

    it('should show - when the resto returned does not contain a title', (done) => {
      document.getElementById('resto')
        .addEventListener('resto:updated', () => {
          const restoTitles = document.querySelectorAll('.resto-title');
          expect(restoTitles.item(0).textContent).toEqual('No Name');
          done();
        });

      favoriteResto.searchResto.withArgs(stringQuery).and.returnValues([
        { id: 444 },
      ]);
      searchResto(stringQuery);
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchResto(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchResto('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchResto('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchResto('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurant', () => {
      searchResto('    ');
      expect(favoriteResto.getAllResto).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurant could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('resto')
        .addEventListener('resto:updated', () => {
          expect(document.querySelectorAll('.resto-item__not__found').length).toEqual(1);
          done();
        });
      favoriteResto.searchResto.withArgs(stringQuery).and.returnValues([]);
      searchResto(stringQuery);
    });

    it('should not show any resto', (done) => {
      document.getElementById('resto')
        .addEventListener('resto:updated', () => {
          expect(document.querySelectorAll('.resto-content-item').length).toEqual(0);
          done();
        });
      favoriteResto.searchResto.withArgs(stringQuery).and.returnValues([]);
      searchResto(stringQuery);
    });
  });
});
