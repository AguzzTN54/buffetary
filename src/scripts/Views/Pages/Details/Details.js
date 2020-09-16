import Data from '../../../Data/RestoAPI';
import RestoIDB from '../../../Data/IndexedDB';
import UrlParser from '../../../Routes/UrlParser';
import '../../Components/Resto/Details';

const Details = {
  setContainer(container) {
    this._container = container;
    return this;
  },

  render() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const DataSource = url.verb ? RestoIDB.Resto : Data;
    const detailElements = document.createElement('resto-detail');
    this._container.appendChild(detailElements);
    DataSource.RestoDetails(url.id)
      .then((data) => {
        const restoData = data;
        restoData.isFavorite = !!url.verb;
        detailElements.data = restoData;
      });
  },
};

export default Details;
