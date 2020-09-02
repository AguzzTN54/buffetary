import '../../styles/Appbar/Appbar.scss'

class AppBar extends HTMLElement {
  connectedCallback() {
    this.render()
    this.event()
  }

  event() {
    this.addEventListener('click', (e) => this.navigation(e))
    document.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        this.querySelector('.nav-link').classList.remove('active')
        this.querySelector('.drawer-toggle').focus()
      }
    })

    const form = this.querySelector('form')
    const input = this.querySelector('input')
    form.querySelector('.submit').addEventListener('click', (e) => {
      const fData = new FormData(form).get('q')
      e.preventDefault()
      if (fData.replace(/ /g, '').length == 0) {
        input.parentElement.classList.add('active')
        input.focus()
        if (document.documentElement.clientWidth < 425) {
          document.body.classList.add('open')
        }
      } else {
        form.submit()
      }
    })

    form.querySelector('.close').addEventListener('click', (e) => {
      e.preventDefault()
      document.body.classList.remove('open')
      input.parentElement.classList.remove('active')
      input.value = ''
    })

    const x = setTimeout(() => {
      clearTimeout(x)

      const searchPcc = document.querySelector('.search').offsetTop
      const cl = document.querySelector('app-bar').classList
      const brand = this.querySelector('.brand img')

      window.addEventListener('scroll', () => {
        if (window.pageYOffset > searchPcc * 3) {
          brand.src = './images/Buffetary-Logo.svg'
          cl.remove('p-absolute')
          cl.add('p-fixed')
        } else {
          brand.src = './images/Buffetary-Logo-white.svg'
          cl.remove('p-fixed')
          cl.add('p-absolute')
        }
      })
    }, 300)
  }

  navigation(e) {
    e.preventDefault()
    const cl = e.target.classList

    if (
      cl.contains('drawer-toggle') ||
      cl.contains('d-close') ||
      cl.contains('mask')
    ) {
      this.querySelector('.nav-link').classList.toggle('active')
      document.body.classList.toggle('open')
    }

    if (cl.contains('link')) {
      if (cl.contains('profile')) {
        cl.toggle('active')
      } else {
        this.querySelector('.link.active').classList.remove('active')
        cl.add('active')
      }
    }
  }

  render() {
    this.innerHTML = `
    <nav>
      <div class="draw-toggle">
        <button class="drawer-toggle" aria-label="Buka Drawer Navigation">
          <span></span>
        </button>
      </div>

      <a href="/" class="brand" title="Logo Buffetary">
        <img src="./images/Buffetary-Logo-white.svg" alt="Logo Buffetary" />
      </a>

      <form class="search-form" action="" method="post">
        <div class="search-mask">
          <hr />
          <div>
            Fungsi Pencarian Belum Berjalan
          </div>
        </div>

        <input type="text" name="q" id="search" placeholder="Cari Restoran" autocomplete="off" aria-label="Cari Restoran">
        <button type="submit" class="submit"><i class="bi bi-search"></i></button>
        <button class="times close" aria-label="Tutup Search Form"><span></span></button>
      </form>

      <div class="nav-link">
        <div class="mask"></div>
        <ul>
          <li class="top-drawer">
            <button class="times close d-close" aria-label="tutup drawer">
              <span></span>
            </button>
            <img src="./images/Buffetary-Logo.svg" alt="Logo Drawer" class="brand"/>
          </li>
          <li>
            <a href="/" title="Home" class="link active">
              <i class="bi bi-home"></i> Home
            </a>
          </li>
          <li>
            <a href="#" title="Favorite" class="link">
              <i class="bi bi-heart"></i> Favorite
            </a>
          </li>
          <li class="p-relative">
            <a href="#" title="Profile" class="profile link">
              <i class="bi bi-user"></i> Profile
            </a>
            <ul  class="profile-link">
              <li>
                <a href="https://www.github.com/AguzzTN54" title="Github Profile" rel="noreferrer" target="_blank">
                  <i class="bi bi-github"></i> Github
                </a>
                <a href="https://www.facebook.com/agustinus.yohannesnang" rel="noreferrer" title="Facebook Profile" target="_blank">
                  <i class="bi bi-facebook"></i> Facebook
                </a>
                <a href="https://www.twitter.com/AguzzTN54" title="Twitter Profile" rel="noreferrer" target="_blank">
                  <i class="bi bi-twitter"></i> Twitter
                </a>
                <a href="https://www.instagram.com/aguzztn54" rel="noreferrer" title="Instagram Profile" target="_blank">
                  <i class="bi bi-instagram"></i> Instagram
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>`
  }
}

customElements.define('app-bar', AppBar)
