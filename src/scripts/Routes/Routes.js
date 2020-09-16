import Details from '../Views/Pages/Details/Details';
import Favorites from '../Views/Pages/Favorite/Favorite';
import Home from '../Views/Pages/Home/Home';
import NotFound from '../Views/Pages/NotFound';

const Routes = {
  '/': Home,
  '/restaurant/:id': Details,
  '/restaurant/:id/saved': Details,
  '/favorite': Favorites,
  '/notfound': NotFound,
};

export default Routes;
