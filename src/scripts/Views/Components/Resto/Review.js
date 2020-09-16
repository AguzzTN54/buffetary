import '../../../../styles/Resto/ReviewForm.scss';
import './ConsumerReview';
import Data from '../../../Data/RestoAPI';
import ReviewTpl from '../../Templates/ReviewForm-Tpl';

class ReviewForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ReviewTpl.Form;
    if (!navigator.onLine) this._erorrToast('Tidak Ada Jaringan');
    this._onlinelistener();
    this._onlineEvent();
  }

  _onlinelistener() {
    window.addEventListener('online', () => {
      this._hideToast();
    });
    window.addEventListener('offline', () => this._erorrToast('Tidak Ada Jaringan'));
  }

  _onlineEvent() {
    const stars = this.querySelectorAll('input[type=radio]');
    stars.forEach((star) => this._starChecked(star));
    const form = this.querySelector('form');
    form.addEventListener('submit', (e) => this._formSubmit(form, e));
  }

  _starChecked(star) {
    star.addEventListener('change', () => {
      const reviewData = this.querySelector('.review-data');
      reviewData.classList.add('active');
      const inputName = this.querySelector('#reviewer-name');
      inputName.focus();
    });
  }

  _formSubmit(form, event) {
    event.preventDefault();
    this._buttonSubmit = this.querySelector('button[type=submit]');
    this._buttonSubmit.setAttribute('disabled', 'disabled');
    const id = this.getAttribute('id');
    const formData = new FormData(form);
    const name = formData.get('nama');
    const review = formData.get('review-message');
    this._sentReview({ id, name, review });
  }

  _sentReview(dataReview) {
    Data.SendReview(dataReview)
      .then((response) => this._sentSuccess(response))
      .catch(() => this._erorrToast('Terjadi Kesalahan'), 1);
  }

  _sentSuccess(response) {
    const { customerReviews, error } = response;
    const isError = error || !customerReviews;
    this._customerReviews = customerReviews;
    return isError
      ? this._erorrToast('Terjadi Kesalahan', 1)
      : this.renderSuccess();
  }

  renderSuccess() {
    const reviewListElement = document.querySelector('consumer-review');
    reviewListElement.data = this._customerReviews;
    this.innerHTML = `
      <div class="review-sent success">
        Ulasan Kamu telah Ditambahkan, Terimakasih telah memberikan ulasan.
      </div>
    `;
  }

  _erorrToast(message, autohide = false) {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('review-sent');
    errorMessage.classList.add('fail');
    errorMessage.innerHTML = message;
    this.appendChild(errorMessage);
    if (autohide) this._timerToast();
  }

  _timerToast() {
    const duration = 5000;
    const timerToast = setTimeout(() => {
      clearTimeout(timerToast);
      this._hideToast();
    }, duration);
  }

  _hideToast() {
    const button = this._buttonSubmit;
    if (button) button.removeAttribute('disabled');
    const toastElement = this.querySelector('.review-sent');
    toastElement.remove();
  }
}

customElements.define('review-form', ReviewForm);
