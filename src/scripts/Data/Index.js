export default class Data {
  static getList() {
    fetch('./DATA.json')
      .then((r) => r.json())
      .then((d) => {
        document.querySelector('resto-list').data = d
      })
      .catch((e) => new Error(e))
  }
}
