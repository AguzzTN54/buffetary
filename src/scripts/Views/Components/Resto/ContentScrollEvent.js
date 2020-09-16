const ContentOnScroll = {
  event(content) {
    const contentElementChild = content.querySelector('.info-desc');
    content.addEventListener('scroll', () => {
      this.topHighlight(content);
      this.bottomHighlight(content, contentElementChild);
    });
  },

  topHighlight(contentContainer) {
    const isOnTop = contentContainer.scrollTop > 0;
    return isOnTop
      ? contentContainer.classList.add('tp')
      : contentContainer.classList.remove('tp');
  },

  bottomHighlight(contentContainer, contentElementChild) {
    const bottomOffset = contentContainer.scrollTop
    + contentContainer.offsetHeight;
    const isOnBottom = bottomOffset >= contentElementChild.offsetHeight;
    return isOnBottom
      ? contentContainer.classList.remove('bt')
      : contentContainer.classList.add('bt');
  },
};

export default ContentOnScroll;
