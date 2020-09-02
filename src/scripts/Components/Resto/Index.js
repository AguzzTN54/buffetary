import './Preview'
import './Item'
import '../../../styles/Resto/Resto.scss'

class Resto extends HTMLElement {
  // connectedCallback() {
  //   this.render()
  // }

  set data(data) {
    this._data = data
    this.render()
    this.event()
  }

  event() {
    this._data.restaurants.forEach((data) => {
      const el = document.createElement('resto-item')
      el.setData = data
      this.querySelector('.resto').appendChild(el)
    })
  }

  render() {
    this.innerHTML = `
      <preview-resto> </preview-resto>
      <section class="container">
        <h2>DISCOVER</h2>
        <div class="resto"></div>
      </section>
    `
  }
}

customElements.define('resto-list', Resto)
