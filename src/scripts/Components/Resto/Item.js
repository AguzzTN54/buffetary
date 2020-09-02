import { getEmail, getSite, getTelp, jamBuka } from '../../Functions'

class RestoItem extends HTMLElement {
  // connectedCallback() {
  //   this.render()
  // }

  set setData(data) {
    data.reviewCount = Math.floor(Math.random() * 123)
    data.buka = jamBuka()
    data.email = getEmail(data.name)
    data.website = getSite(data.name)
    data.phone = getTelp()
    this._data = data
    this.render()
    this.event()
  }

  event() {
    this.querySelector('.more').addEventListener('click', () => {
      const el = document.querySelector('preview-resto')
      el.data = this._data
      el.classList.add('show')
    })
  }

  render() {
    const {
      buka,
      city,
      description,
      id,
      name,
      pictureId,
      rating,
      reviewCount,
    } = this._data

    let dsc, rate
    dsc = description.substring(0, 50) + '..'
    rate = (rating / 5) * 100

    const td = new Date(),
      day = td.getDay()
    let statusBuka = ''
    if (buka[day].status == 'tutup') {
      statusBuka = '<span class="closed"> Tutup</span>'
    } else if (
      parseInt(buka[day].buka) > td.getHours() ||
      parseInt(buka[day].tutup) < td.getHours()
    ) {
      statusBuka = '<span class="closed"> Tutup</span>'
    }

    this.innerHTML = `
      <figure>
        <img src="${pictureId}" alt="Thumbnail ${name}" />
        <div class="lokasi">
          <i class="bi bi-places"></i> ${city}
        </div>
      </figure>
      <figcaption>
        <h4>
          <a href="#">${name}</a>
        </h4>

        <span class="rating">
          <span class="star">
            <i class="bi bi-star"></i>
            <i class="bi bi-star"></i>
            <i class="bi bi-star"></i>
            <i class="bi bi-star"></i>
            <i class="bi bi-star"></i>
          </span>
          <div class="blend">
            <span class="gray"></span>
            <span class="yellow" style="width:${rate}%"></span>
          </div>
        </span>
        <span style="margin-left:0; padding-left:10px;">${rating} (${reviewCount}) ${statusBuka}</span>

        <p class="description">
        ${dsc} <button id="${id}" class="more">Read More</button>
        </p>
      </figcaption>
    `
  }
}

customElements.define('resto-item', RestoItem)
