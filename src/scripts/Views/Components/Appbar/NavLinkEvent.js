const NavLinkEvents = {
  toggleDropDownLinkActive(containerClass, event) {
    event.preventDefault();
    return containerClass.toggle('active');
  },

  markLinkWhenClicked(element, containerClass) {
    const activeLink = element.querySelector('.link.active');
    activeLink.classList.remove('active');
    containerClass.add('active');
    element.querySelector('.nav-link').classList.remove('active');
    document.body.classList.remove('open');
  },

  markNavLink({
    element, isProfileLink, containerClass, event,
  }) {
    event.stopPropagation();
    return isProfileLink
      ? this.toggleDropDownLinkActive(containerClass, event)
      : this.markLinkWhenClicked(element, containerClass);
  },

  onClick(element, event) {
    const containerClass = event.target.classList;
    const isNavLink = containerClass.contains('link');
    const isProfileLink = containerClass.contains('profile');

    return isNavLink
      ? this.markNavLink({
        element,
        isProfileLink,
        containerClass,
        event,
      })
      : null;
  },
};

export default NavLinkEvents;
