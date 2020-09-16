import APP_CONFIG from '../../Globals/Config';

const { NAME } = APP_CONFIG;

const AppbarCreator = `<nav>
  <div class="draw-toggle">
    <button class="drawer-toggle" aria-label="Buka Drawer Navigation">
      <span></span>
    </button>
  </div>

  <a href="#/" class="brand" title="Logo ${NAME}">
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
    <button type="submit" class="search-submit">
      <i class="bi bi-search"></i>
    </button>
    <button class="times close" aria-label="Tutup Search Form"> <span></span> </button>
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
        <a href="#/" title="Home" class="link active">
          <i class="bi bi-home"></i> Home
        </a>
      </li>
      <li>
        <a href="#/favorite" title="Favorite" class="link">
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
</nav>`;

export default AppbarCreator;
