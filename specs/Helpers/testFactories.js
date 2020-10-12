import LoveButtonPresenter from '../../src/scripts/Utils/LoveButtonPresenter';
import RestoIDB from '../../src/scripts/Data/IndexedDB';

const createLoveButtonPresenterWithResto = async (resto) => {
  await LoveButtonPresenter.init({
    loveButtonContainer: document.querySelector('.love-button'),
    favoriteResto: RestoIDB.Resto,
    resto,
  });
};

export { createLoveButtonPresenterWithResto };
