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
    <img src="${picture}" alt="Thumbnail ${name}" class="load-placeholder" />
    <div class="lokasi">
      <i class="bi bi-places"></i> ${city}
    </div>
  </figure>
  <figcaption>
    <h3>
      <a href="#/restaurant/${id}${isFavorite ? '/saved' : ''}" title="View More About ${name}">${name}</a>
    </h3>

    <star-rating data-rating="${rating}"></star-rating>
    <span style="margin-left:0; padding-left:10px;">${rating} (${reviewCount}) ${statusBuka}</span>

    <p class="description">
    ${shortDescription} <button id="${id}" class="more">Read More</button>
    </p>
  </figcaption>
  `;
};

export default RestoListItemTpl;
