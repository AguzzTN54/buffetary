class PreviewResto extends HTMLElement {
  set data(data) {
    this._data = data
    this.render()
    this.event()
  }

  event() {
    document.body.classList.add('open')
    const ps = this.querySelector('.description')
    const p = ps.querySelector('.info-desc')
    ps.focus()

    const jadwal = this.querySelector('.hariini')
    jadwal.addEventListener('click', () => jadwal.classList.toggle('active'))

    if (ps.scrollTop + ps.offsetHeight < p.offsetHeight) {
      ps.classList.add('bt')
    }
    this.querySelector('.preview-content').scrollTo(0, 0)

    ps.addEventListener('scroll', () => {
      ps.scrollTop > 0 ? ps.classList.add('tp') : ps.classList.remove('tp')

      ps.scrollTop + ps.offsetHeight < p.offsetHeight
        ? ps.classList.add('bt')
        : ps.classList.remove('bt')
    })

    this.querySelector('.close').addEventListener('click', () => {
      this.hide()
    })

    document.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') this.hide()
    })
  }

  hide() {
    document.body.classList.remove('open')
    this.classList.remove('show')
    document.getElementById(this._data.id).focus()
    this.innerHTML = ''
  }

  jadwal() {
    const { buka } = this._data
    const td = new Date(),
      day = td.getDay()
    let statusBuka = buka[day].buka + ' - ' + buka[day].tutup

    if (buka[day].status == 'tutup') {
      statusBuka = 'Tutup'
    } else if (
      parseInt(buka[day].buka) > td.getHours() ||
      parseInt(buka[day].tutup) < td.getHours()
    ) {
      statusBuka = 'Tutup'
    }

    let itemjdwl = ''
    buka.forEach((bk) => {
      let jm = bk.buka.replace(/-/g, '') + ' - ' + bk.tutup.replace(/-/g, '')
      itemjdwl += `<tr>
        <td>${bk.hari} </td>
        <td>${jm == ' - ' ? 'Tutup' : jm}</td>
      </tr>`
    })

    return `
      <div class="jadwal">
        <button class="hariini"> <i class="bi bi-clock"></i> ${statusBuka}</button>

        <div class="jadwal-list">
          <table>
            <tbody>
              ${itemjdwl}
            </tbody>
          </table>
        </div>
      </div>
    `
  }

  render() {
    let rate
    const {
      email,
      city,
      description,
      name,
      phone,
      pictureId,
      rating,
      reviewCount,
      website,
    } = this._data
    rate = (rating / 5) * 100

    this.innerHTML = `
      <div class="preview-dialog">
        <button class="times close" aria-label="tutup preview" tabindex="3" title="Press ESC to close">
            <span></span>
        </button>

        <div class="preview-content">
          <figure>
            <img src="${pictureId}" alt="Gambar ${name}">
          </figure>

          <figcaption>
            <div class="top">
              <h2>${name}</h2>
              <span class="rating mleft-1 mright-1">
                <span class="star">
                  <i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                </span>
                <div class="blend">
                  <div class="gray"></div>
                  <div class="yellow" style="width:${rate}%"></div>
                </div>
              </span> ${rating} (${reviewCount} Ulasan)
            </div>

            <div class="description" tabindex="1">
              <div class="info-desc">
                <ul class="info">
                  <li>
                    <i class="bi bi-places"></i> ${city}
                  </li>
                  <li>
                    ${this.jadwal()}
                  </li>
                  <li>
                    <i class="bi bi-phone"></i> ${phone}
                  </li>
                  <li>
                    <i class="bi bi-mail"></i> ${email}
                  </li>
                  <li>
                    <i class="bi bi-web"></i> <a href="#" tabindex="2" title="Official Site">${website} </a>
                  </li>
                </ul>

                <h3>Description</h3>
                <p> ${description} </p>
              </div>
            </div>
          </figcaption>
        </div>
      </div>
    `
  }
}

customElements.define('preview-resto', PreviewResto)
