import ReviewTpl from '../../Templates/ReviewForm-Tpl';

class ConsumerReviews extends HTMLElement {
  set data(consumerReviews) {
    this.innerHTML = '';
    consumerReviews.reverse().forEach((revieItem) => {
      this.innerHTML += ReviewTpl.ConsumerReview(revieItem);
    });
  }
}

customElements.define('consumer-review', ConsumerReviews);
