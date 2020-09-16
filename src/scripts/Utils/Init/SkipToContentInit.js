const SkipToContent = {
  init() {
    const skipButton = document.querySelector('#skip-button');
    skipButton.addEventListener('click', (e) => this.clickEvent(e));
  },

  clickEvent(event) {
    event.preventDefault();
    const contentTarget = document.querySelector('#content');
    const offsetTarget = contentTarget.offsetTop - 70;
    const firstAnchor = contentTarget.querySelector('a');
    window.scrollTo(0, offsetTarget);
    if (firstAnchor) firstAnchor.focus();
  },
};

export default SkipToContent;
