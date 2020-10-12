class FavoriteRestoSearchPresenter {
  constructor({ favoriteResto, view }) {
    this._view = view;
    this._listenToSearchRequestByUser();
    this._favoriteResto = favoriteResto;
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchResto(latestQuery);
    });
  }

  async _searchResto(latestQuery) {
    this._latestQuery = latestQuery.trim();
    let foundResto;
    if (this.latestQuery.length > 0) {
      foundResto = await this._favoriteResto.searchResto(this.latestQuery);
    } else {
      foundResto = await this._favoriteResto.getAllResto();
    }
    this._showFoundResto(foundResto);
  }

  get latestQuery() {
    return this._latestQuery;
  }

  _showFoundResto(restaurants) {
    this._view.showFavoriteResto(restaurants);
  }
}

export default FavoriteRestoSearchPresenter;
