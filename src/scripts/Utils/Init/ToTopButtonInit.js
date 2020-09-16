const ToTopButton = {
  init() {
    window.addEventListener('scroll', () => {
      this.scrollToTop();
    });
  },

  scrollToTop() {
    const button = document.querySelector('.totop');
    button.addEventListener('click', (e) => this.handleClick(e));
    const isButtonShow = (window.pageYOffset > 0);
    return isButtonShow
      ? this.showButton(button)
      : this.hideButton(button);
  },

  handleClick(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
  },

  showButton(toTopButton) {
    const button = toTopButton.style;
    button.pointerEvents = 'unset';
    button.opacity = 1;
  },

  hideButton(toTopButton) {
    const button = toTopButton.style;
    button.pointerEvents = 'none';
    button.opacity = 0;
  },
};

export default ToTopButton;
