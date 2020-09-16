const UrlParser = {
  parseActiveUrlWithCombiner() {
    const URL = window.location.hash.slice(1).toLocaleLowerCase();
    const splitedURL = this._urlSplitter(URL);
    return this._urlCombiner(splitedURL);
  },

  parseActiveUrlWithoutCombiner() {
    const URL = window.location.hash.slice(1).toLocaleLowerCase();
    const splitedURL = this._urlSplitter(URL);
    return splitedURL;
  },

  _urlSplitter(url) {
    const urlSplits = url.split('/');
    return {
      resource: urlSplits[1] || null,
      id: urlSplits[2] || null,
      verb: urlSplits[3] || null,
    };
  },

  _urlCombiner(splitedURL) {
    return (splitedURL.resource ? `/${splitedURL.resource}` : '/')
      + (splitedURL.id ? '/:id' : '')
      + (splitedURL.verb ? `/${splitedURL.verb}` : '');
  },
};

export default UrlParser;
