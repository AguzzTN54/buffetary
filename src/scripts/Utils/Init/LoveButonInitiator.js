import RestoIDB from '../../Data/IndexedDB';

const LoveButton = {
  init({ element, data }) {
    this._data = data;
    this._element = element;
    this._id = data.id;
    this._pictureId = data.pictureId;
    this._checkData();
    element.addEventListener('click', () => this.handleClick());
  },

  async handleClick() {
    return await this._isRestoAlreadySaved()
      ? this._handleSaved()
      : this._handleToSave();
  },

  async _checkData() {
    return await this._isRestoAlreadySaved()
      ? this._markSaved()
      : this._markUnsave();
  },

  async _handleToSave() {
    const restaurant = this._data;
    const dataToSave = {
      error: false,
      id: this._id,
      restaurant,
    };
    await RestoIDB.Resto.addResto(dataToSave);
    await RestoIDB.Blob.save(this._pictureId);
    this._markSaved();
  },

  async _handleSaved() {
    await RestoIDB.Resto.deleteResto(this._id);
    await RestoIDB.Blob.delete(this._pictureId);
    this._markUnsave();
  },

  async _isRestoAlreadySaved() {
    const resto = await RestoIDB.Resto.getRestoDetail(this._id);
    return !!resto;
  },

  _markUnsave() {
    this._element.innerHTML = '<i class="bi bi-heart-o"></i>';
  },

  _markSaved() {
    this._element.innerHTML = '<i class="bi bi-heart"></i>';
  },
};

export default LoveButton;
