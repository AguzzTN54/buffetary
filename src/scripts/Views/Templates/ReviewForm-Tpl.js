const ConsumerReview = (reviewItem) => {
  const { date, name, review } = reviewItem;
  const color = ['e67e22', '34495e', '1abc9c', 'e74c3c', 'f1c40f', '2890b9', '8e44ad'];
  const randomNumber = Math.floor(Math.random() * color.length);

  return `
    <div class="review-item">
      <div class="consumer-pic">
        <div style="background-color:#${color[randomNumber]};">
          ${name.substring(0, 1)}
        </div>
      </div>

      <div class="review-content">
        <div class="review-head">
          <star-rating data-rating="3" style="font-size:small"></star-rating> &nbsp; .
          <time> ${date} </time>
          <h3> ${name} </h3>
        </div>

        <div class="review-body">
          "${review}"
        </div>
      </div>
    </div>
  `;
};

const Form = `
<h4>Berikan Rating dan Ulasan</h4>
<p> Bagikan pengalamanmu untuk membantu orang lain! </p>
<form class="review-form-star">
  <div class="input-star">
    <input type="radio" name="star" id="star5" value="5">
    <label for="star5" title=""Berkikan bintang 5" aria-label="Bintang 5">
      <i class="bi bi-star"></i>
    </label>
    <input type="radio" name="star" id="star4" value="4">
    <label for="star4" title=""Berkikan bintang 4" aria-label="Bintang 4">
      <i class="bi bi-star"></i>
    </label>
    <input type="radio" name="star" id="star3" value="3">
    <label for="star3" title=""Berkikan bintang 3" aria-label="Bintang 3">
      <i class="bi bi-star"></i>
    </label>
    <input type="radio" name="star" id="star2" value="2">
    <label for="star2" title=""Berkikan bintang 2" aria-label="Bintang 2">
      <i class="bi bi-star"></i>
    </label>
    <input type="radio" name="star" id="star1" value="1">
    <label for="star1" title=""Berkikan bintang 1" aria-label="Bintang 1">
      <i class="bi bi-star"></i>
    </label>
  </div>

  <div class="review-data">
    <div class="form-group mtop-2">
      <label for="reviewer-name"> Nama Kamu :</label>
      <input type="text" name="nama" id="reviewer-name" placeholder="Jonny" autocomplete="off" required>
    </div>
    <div class="form-group">
      <label for="review-message">Text Review</label>
      <textarea id="review-message" name="review-message"></textarea>
    </div>
    <button type="submit"> Kirim Review</button>
  </div>
</form>
`;

const ReviewTpl = {
  Form,
  ConsumerReview,
};

export default ReviewTpl;
