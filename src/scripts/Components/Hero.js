import '../../styles/Hero/Hero.scss'

class Hero extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
      <img src="./images/heros/hero-image_2.jpg" alt="Banner Image" />
      <div class="hero-fill">

        <div class="greet">
          <h1>
            Jelajahi <span>RESTORAN</span> <br/> di Sekitarmu
          </h1>
        </div>
        <div class="search">
          <input type="text" name="query" aria-label="Cari Restoran" placeholder="Cari Tempat" />
          <button type="submit" aria-label="Tombol Cari">
            <i class="bi bi-search"></i>
          </button>

          <a href="#content" class="explore">
            Explore Now
          </a>
        </div>

      </div>
    `
  }
}

customElements.define('hero-content', Hero)
