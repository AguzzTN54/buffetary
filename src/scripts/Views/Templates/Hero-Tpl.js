const HeroTpl = `
  <img src="./images/heros/hero-image_2.webp"
    srcset="./images/heros/hero-image_2-small.webp 480w, ./images/heros/hero-image_2-medium.webp 800w"
    sizes="(max-width: 600px) 480px, 800px"
    alt="Hero Item"
  />
<div class="hero-fill">

  <div class="greet">
    <h1>
      Jelajahi <span>RESTORAN</span> <br/> di Sekitarmu
    </h1>
  </div>
  <form class="hero-search-form">
    <input type="text" name="q" aria-label="Cari Restoran" placeholder="Cari Tempat" autocomplete="off" class="hero-input-form" />
    <button type="submit" aria-label="Tombol Cari">
      <i class="bi bi-search"></i>
    </button>

    <a href="#content" class="explore">
      Explore Now
    </a>
  </form>

</div>`;

export default HeroTpl;
