import APP_CONFIG from '../Globals/Config';

const { SERVER_API } = APP_CONFIG;

const Data = {
  _postOption(dataReview) {
    const headers = {
      'Content-Type': ' application/json',
      'X-Auth-Token': '12345',
    };
    const sendReviewOption = {
      method: 'POST',
      headers,
      body: JSON.stringify(dataReview),
    };
    return dataReview ? sendReviewOption : null;
  },

  async _sendRequest(endpoint, data = null) {
    try {
      const response = await fetch(SERVER_API + endpoint, this._postOption(data));
      return response.json();
    } catch (error) {
      return new Error('Gagal Memuat Data', error);
    }
  },

  async RestoList() {
    const response = await this._sendRequest('/list');
    return response;
  },
  async RestoDetails(id) {
    const response = await this._sendRequest(`/detail/${id}`);
    return response;
  },
  SendReview(dataReview) {
    return this._sendRequest('/review', dataReview);
  },
};

export default Data;
