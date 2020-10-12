const LoveButtonPresenter = {
  async init({ loveButtonContainer, favoriteResto, resto }) {
    this._likeButtonContainer = loveButtonContainer;
    this._resto = resto;
    this._favoriteResto = favoriteResto;
    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._resto;
    if (await this._isRestoExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestoExist(id) {
    const resto = await this._favoriteResto.getRestoDetail(id);
    return !!resto;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = '<i class="bi bi-heart"></i>';
    const likeButton = document.querySelector('.love-button');
    likeButton.addEventListener('click', async () => {
      await this._favoriteResto.addResto(this._resto);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = '<i class="bi bi-heart-o"></i>';
    const likeButton = document.querySelector('.love-button');
    likeButton.addEventListener('click', async () => {
      await this._favoriteResto.deleteResto(this._resto.id);
      this._renderButton();
    });
  },
};

export default LoveButtonPresenter;
