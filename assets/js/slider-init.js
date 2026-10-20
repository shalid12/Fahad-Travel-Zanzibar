/* The current site uses a single Swiper carousel for homepage guest reviews. */
(function () {
  "use strict";

  if (!document.querySelector(".tp-testimonial-slide") || typeof Swiper === "undefined") return;

  new Swiper(".tp-testimonial-slide", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    breakpoints: {
      991: { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
    },
    pagination: {
      el: ".tp-testimonial-pagination",
      clickable: true,
    },
  });
})();
