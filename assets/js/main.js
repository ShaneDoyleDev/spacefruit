// page sections
const heroSection = document.querySelector("#hero-section");

// navbar
const navbar = document.querySelector(".navbar");
const navbarMenu = document.querySelector(".navbar-menu");
const navbarHamburger = document.querySelector(".navbar-hamburger");
const navbarCloseBtn = document.querySelector(".navbar-menu-close-btn");
const navbarMenuItems = document.querySelectorAll(".navbar-menu-item");
const navbarMenuLinks = document.querySelectorAll(".navbar-menu-link");

// testimonials
const testimonials = document.querySelectorAll(".testimonial");
const paginationDots = document.querySelectorAll(".pagination-dot");
const paginationRightArrow = document.querySelector(".pagination-right-arrow");
const paginationLeftArrow = document.querySelector(".pagination-left-arrow");

// modal
const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const modalContent = document.querySelector(".modal-content");
const modalForm = document.querySelector(".modal-form");
const modalFormMessage = document.querySelector(".form-message");

// buttons
const contactBtn = document.querySelector(".contact-btn");
const ctaBtn = document.querySelector(".btn-cta");
const modalCloseBtn = document.querySelector(".modal-close-btn");

// global variables
/**
 * Timer to manage the duration of the window resize event.
 * @type {number}
 */
let resizeTimer;

/**
 * Index representing the currently displayed testimonial.
 * @type {number}
 */
let currentTestimonial = 1;

/**
 * Add smooth scrolling behavior to sections when their corresponding nav link is clicked.
 */
navbarMenuLinks.forEach((menuLink) => {
  menuLink.addEventListener("click", (event) => {
    event.preventDefault();
    const targetSection = document.querySelector(menuLink.getAttribute("href"));
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// toggle sticky nav when hero section is out of view
const heroSectionObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) navbar.classList.remove("sticky-nav");
  else navbar.classList.add("sticky-nav");
});

heroSectionObserver.observe(heroSection);

/**
 * Show a message form.
 */
function showFormMessage() {
  modalForm.classList.add("hide-modal-element");
  modalFormMessage.classList.remove("hide-modal-element");
}

/**
 * Clear the displayed message form.
 */
function clearFormMessage() {
  modalForm.classList.remove("hide-modal-element");
  modalFormMessage.classList.add("hide-modal-element");
}

/**
 * Handle showing the mobile navigation.
 */
function handleShowMobileNav() {
  navbarMenu.classList.remove("navbar-menu-hidden");
}

/**
 * Handle closing the mobile navigation.
 */
function handleCloseMobileNav() {
  navbarMenu.classList.add("navbar-menu-hidden");
}

/**
 * Handle the logic for displaying modals.
 */
function handleShowModal() {
  backdrop.classList.remove("backdrop-hidden");
  modal.classList.remove("modal-hidden");
}

/**
 * Handle closing the modal.
 */
function handleCloseModal() {
  backdrop.classList.add("backdrop-hidden");
  modal.classList.add("modal-hidden");
  clearFormMessage();
}

/**
 * Handle the form submission within a modal.
 * @param {Event} event - The form submission event.
 */
function handleModalFormSubmit(event) {
  event.preventDefault();
  modalForm.reset();
  showFormMessage();
}

/**
 * Handle switching between testimonials.
 * @param {Event} event - The event that triggered the switch.
 */
function handleSwitchTestimonial(event) {
  // if outside range of testimonials, do not change
  if (event.currentTarget.classList.contains("pagination-right-arrow")) {
    currentTestimonial < testimonials.length && (currentTestimonial += 1);
  }

  if (event.currentTarget.classList.contains("pagination-left-arrow")) {
    currentTestimonial > 1 && (currentTestimonial -= 1);
  }

  if (event.currentTarget.classList.contains("pagination-dot")) {
    currentTestimonial = event.currentTarget.dataset.testimonial;
  }

  // show current active testimonial
  document
    .querySelector(".reveal-testimonial")
    .classList.remove("reveal-testimonial");
  document.querySelector(".active-dot").classList.remove("active-dot");

  document
    .querySelector(`.testimonial[data-testimonial="${currentTestimonial}"]`)
    .classList.add("reveal-testimonial");
  document
    .querySelector(`.pagination-dot[data-testimonial="${currentTestimonial}"]`)
    .classList.add("active-dot");
}

/**
 * Temporarily disable transition animations during window resize to avoid jankiness.
 */
function handleTransitionDisable() {
  document.body.classList.add("disable-transitions");

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("disable-transitions");
  }, 400);
}

// window events
window.addEventListener("resize", handleTransitionDisable);

// navbar events
navbarHamburger.addEventListener("click", handleShowMobileNav);
navbarMenuItems.forEach((navMenuItem) =>
  navMenuItem.addEventListener("click", handleCloseMobileNav)
);
navbarCloseBtn.addEventListener("click", handleCloseMobileNav);
window.addEventListener("resize", () => {
  if (innerWidth > 800) handleCloseMobileNav();
});

// testimonial events
paginationRightArrow.addEventListener("click", handleSwitchTestimonial);
paginationLeftArrow.addEventListener("click", handleSwitchTestimonial);
paginationDots.forEach((dot) =>
  dot.addEventListener("click", handleSwitchTestimonial)
);
