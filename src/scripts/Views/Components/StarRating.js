import '../../../styles/Star-Rating.scss';

class StarRating extends HTMLElement {
  connectedCallback() {
    const rating = this.getAttribute('data-rating');
    const persenRate = (rating / 5) * 100;
    this.innerHTML = `<span class="star">
      <i class="bi bi-star"></i>
      <i class="bi bi-star"></i>
      <i class="bi bi-star"></i>
      <i class="bi bi-star"></i>
      <i class="bi bi-star"></i>
    </span>
    <div class="blend">
      <div class="gray"></div>
      <div class="yellow" style="width:${persenRate}%"></div>
    </div>`;
  }
}

customElements.define('star-rating', StarRating);
