import '../../Components/Hero/Hero';
import '../../Components/Resto/List';
import Data from '../../../Data/RestoAPI';

const Home = {
  setContainer(container) {
    this._container = container;
    return this;
  },

  render() {
    const restoList = document.createElement('resto-list');
    this._container.appendChild(restoList);
    Data
      .RestoList()
      .then((data) => { restoList.data = data; });
  },
};

export default Home;
