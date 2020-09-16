const DrawerEvent = {
  drawerEffect(element, event) {
    event.preventDefault();
    event.stopPropagation();
    element.querySelector('.nav-link').classList.toggle('active');
    document.body.classList.toggle('open');
  },

  onClick(element, event) {
    const containerClass = event.target.classList;
    const isAffectToDrawer = (containerClass.contains('drawer-toggle')
      || containerClass.contains('d-close')
      || containerClass.contains('mask'));

    return isAffectToDrawer
      ? this.drawerEffect(element, event)
      : null;
  },
};

export default DrawerEvent;
