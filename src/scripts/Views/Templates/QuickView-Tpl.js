import APP_CONFIG from '../../Globals/Config';

const QuickViewTpl = (restoData, jadwal) => {
  const {
    email,
    city,
    description,
    id,
    isFavorite,
    name,
    phone,
    pictureBlob,
    pictureId,
    rating,
    reviewCount,
    website,
  } = restoData;
  const { hariIni, semuaJadwal } = jadwal;
  const { SERVER_API } = APP_CONFIG;
  const picture = isFavorite
    ? pictureBlob
    : `${SERVER_API}/images/medium/${pictureId}`;

  return `
    <div class="preview-dialog">
      <button class="times close" aria-label="tutup preview" tabindex="3" title="Press ESC to close">
          <span></span>
      </button>

      <div class="preview-content">
        <figure>
          <img src="${picture}" alt="${name}" class="load-placeholder" />
        </figure>

        <figcaption>
          <div class="top">
            <h2><a href="#/restaurant/${id}${isFavorite ? '/saved' : ''}"> ${name}</a></h2>
            <star-rating data-rating="${rating}"  class="mleft-1 mright-1"></star-rating> ${rating} (${reviewCount} Ulasan)
          </div>

          <div class="description" tabindex="1">
            <div class="info-desc">
              <ul class="info">
                <li>
                  <i class="bi bi-places"></i> ${city}
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
  `;
};

export default QuickViewTpl;
