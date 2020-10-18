import Data from '../../Data/RestoAPI';
import '../../Views/Components/Appbar/Appbar';

const AppbarInitiator = (headerContainer) => {
  const header = headerContainer;
  const newHeaderBar = document.createElement('app-bar');
  newHeaderBar.classList.add('p-absolute');
  header.appendChild(newHeaderBar);
  Data.RestoList()
    .then((data) => { newHeaderBar.data = data.restaurants; });
};

export default AppbarInitiator;
