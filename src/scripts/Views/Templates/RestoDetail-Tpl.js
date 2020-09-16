import APP_CONFIG from '../../Globals/Config';

const RestoDetailTpl = {
  preload() {
    return `
    <figure class="left-side">
      <div class="load-placeholder detail-pic"></div>
    </figure>

    <figcaption class="right-side mtop-2">
      <div class="head-title">
        <h1 class="load-placeholder" style="height:20px; width:80%"> </h1>
        <div class="load-placeholder" style="height:15px; width:40%"></div>
      </div>

      <div class="navigation-content mtop-2 pleft-2 pright-2 mbottom-5">
        <p class="load-placeholder" style="height:10px; width:100%; margin:12px 0;"></p>
        <p class="load-placeholder" style="height:10px; width:100%; margin:12px 0;"></p>
        <p class="load-placeholder" style="height:10px; width:80%; margin:12px 0;"></p>
        <p class="load-placeholder" style="height:10px; width:30%; margin:12px 0;"></p>
      </div>
    </figcaption>
    `;
  },

  main(restoData, schedule) {
    const {
      consumerReviews,
      id,
      name,
      menus,
      rating,
      pictureId,
    } = restoData;
    const { SERVER_API } = APP_CONFIG;
    const picture = `${SERVER_API}/images/large/${pictureId}`;

    return `
    <figure class="left-side">
      <img src="${picture}" alt="${name}" class="load-placeholder" />
    </figure>

    <figcaption class="right-side">
      <div class="head-title">
        <button class="love-button" aria-label="Save as Favorite">
          <i class="bi bi-heart-o"></i>
        </button>
        <h1> ${name}</h1>
        <div style="display:flex;align-items:center;">
          <star-rating data-rating="${rating}" style="font-size:x-large"></star-rating>
          <span>
            &nbsp; (${rating}) ${consumerReviews.length} Ulasan
          </span>
        </div>
      </div>

      <div class="navigation-pane">
        <button data-target="#general-info" class="active nav-button">
          <i class="bi bi-information"></i> Info
        </button>
        <button data-target="#menu" class="nav-button">
          <i class="bi bi-menus"></i> Menu
        </button>
        <button data-target="#review" class="nav-button"> 
          <i class="bi bi-review"></i> Reviews
        </button>
      </div>
      <div class="navigation-content">
        <div class="slides">
          <article id="general-info" class="description">
            <div class="info-desc">
              ${this.generalInfo(restoData, schedule)}
            </div>
          </article>

          <article id="menu" class="description" style="height:0;">
            <div class="info-desc">
              ${this.menus(menus)}
            </div>
          </article>

          <article id="review" class="description" style="height:0;">
            <div class="info-desc">
              <review-form id=${id}></review-form>
              <consumer-review></consumer-review>
            </div>
          </article>
        </div>
      </div>
    </figcaption>
    `;
  },

  generalInfo(restoData, schedule) {
    const {
      address,
      categories,
      city,
      description,
      email,
      phone,
      website,
    } = restoData;
    const { hariIni, semuaJadwal } = schedule;
    const category = categories
      .map((name) => name.name)
      .join(' - ');

    return `
    <ul class="info">
      <li>
        <i class="bi bi-places"></i> ${address} - ${city}
      </li>
      <li>
        <i class="bi bi-food"></i> ${category}
      </li>
      <li>
        <div class="jadwal">
          <button class="hariini"> <i class="bi bi-clock"></i> ${hariIni}</button>
  
          <div class="jadwal-list">
            <table>
              <tbody>
                ${semuaJadwal}
              </tbody>
            </table>
          </div>
        </div>
      </li>
      <li>
        <i class="bi bi-phone"></i> ${phone}
      </li>
      <li>
        <i class="bi bi-mail"></i> ${email}
      </li>
      <li>
        <i class="bi bi-web"></i> <a href="#" title="Official Site">${website} </a>
      </li>
    </ul>

    <h2>Description</h2>
    <p> ${description} </p>`;
  },

  menus(menuData) {
    const { foods, drinks } = menuData;
    const makanan = foods.map((food) => food.name).join('</li><li>');
    const minuman = drinks.map((drink) => drink.name).join('</li><li>');
    return `
      <div class="menu-item mbottom-3 mtop-2">
        <h2> <i class="bi bi-food"></i> Foods</h2>
        <ul>
          <li> ${makanan}</li>
        </ul>
      </div>

      <div class="menu-item">
        <h2> <i class="bi bi-drink"></i> Drinks</h2>
        <ul>
          <li> ${minuman}</li>
        </ul>
      </div>
    `;
  },
};

export default RestoDetailTpl;
