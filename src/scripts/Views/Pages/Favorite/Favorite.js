import RestoIDB from '../../../Data/IndexedDB';
import '../../Components/Favorite/Favorite';

const Favorites = {
  setContainer(container) {
    this._container = container;
    return this;
  },

  render() {
    const myFavoriteElements = document.createElement('my-favorite');
    this._container.appendChild(myFavoriteElements);
    RestoIDB.Resto
      .getAllResto()
      .then((data) => { myFavoriteElements.data = data; });
  },
};

export default Favorites;
