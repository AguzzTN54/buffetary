const Thumbnail = (targetElement) => {
  const thumbnailElement = targetElement;
  thumbnailElement.addEventListener('error', () => {
    thumbnailElement.src = './images/thumbnail.svg';
  });
};

export default Thumbnail;
