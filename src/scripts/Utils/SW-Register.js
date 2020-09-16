const RegisterSW = {
  register() {
    const isSupportSW = 'serviceWorker' in navigator;
    return isSupportSW ? this._doRegister() : this._error();
  },
  async _doRegister() {
    const success = 'ServiceWorker berhasil didaftarkan';
    await navigator.serviceWorker.register('./sw.js')
      .then(() => console.log(success));
    return null;
  },
  _error() {
    console.error('Browser Tidak Mendukung Service Worker');
    return null;
  },
};

export default RegisterSW;
