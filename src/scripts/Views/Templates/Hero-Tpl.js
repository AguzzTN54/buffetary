const HeroTpl = `
<img src="./images/heros/hero-image_2.jpg" alt="Banner Image" />
<div class="hero-fill">

  <div class="greet">
    <h1>
      Jelajahi <span>RESTORAN</span> <br/> di Sekitarmu
    </h1>
  </div>
  <form class="hero-search-form">
    <input type="text" name="q" aria-label="Cari Restoran" placeholder="Cari Tempat" />
    <button type="submit" aria-label="Tombol Cari">
      <i class="bi bi-search"></i>
    </button>

    <a href="#content" class="explore">
      Explore Now
    </a>
  </form>

</div>`;

export default HeroTpl;
