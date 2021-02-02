import APP_CONFIG from '../../Globals/Config';

const RestoListItemTpl = (RestoData) => {
  const {
    city,
    shortDescription,
    id,
    isFavorite,
    name,
    pictureId,
    rating,
    reviewCount,
    statusBuka,
  } = RestoData;
  const { SERVER_API } = APP_CONFIG;
  const picture = `${SERVER_API}/images/small/${pictureId}`;

  return `
  <figure>
    <img src="./images/thumbnail.svg" data-src="${picture}" alt="Thumbnail ${name}" class="load-placeholder lazyload" />
    <div class="lokasi">
      <i class="bi bi-places"></i> ${city}
    </div>
  </figure>
  <figcaption class="resto-content-item">
    <h3>
      <a href="#/restaurant/${id}${isFavorite ? '/saved' : ''}" class="resto-title" title="View More About ${name}">${name || 'No Name'}</a>
    </h3>

    <star-rating data-rating="${rating}"></star-rating>
    <span style="margin-left:0; padding-left:10px;">${rating} (${reviewCount}) ${statusBuka}</span>

    <p class="description">
      <span>${shortDescription}</span>
      <button id="${id}" class="more">Read More</button>
    </p>
  </figcaption>
  `;
};

export default RestoListItemTpl;
