/* Shared behavior used by the current site: loader, navigation, galleries,
   back-to-top, WhatsApp shortcut and entrance animations. */

(function ($) {
  "use strict";

  var windowOn = $(window);
  ////////////////////////////////////////////////////
  // Page loader
  function hidePageLoader() {
    $("#loading").stop(true, true).fadeOut(250);
  }

  $(function () {
    hidePageLoader();
    wowAnimation();
  });

  windowOn.on("load", hidePageLoader);

  ////////////////////////////////////////////////////
  // Mobile menu
  var currentPage = window.location.pathname.split("/").filter(Boolean).pop() || "index";
  currentPage = currentPage.replace(/\.html?$/i, "");

  var infoPages = [
    "about", "airport", "faqs", "terms", "best-time-to-visit-zanzibar",
    "things-to-know-about-zanzibar", "travel-tour-guides-tips", "tours-safari-packages"
  ];
  var currentSection = currentPage === "index" ? "Home" :
    currentPage === "contact" ? "Contact" :
    infoPages.indexOf(currentPage) !== -1 ? "Pages" :
    currentPage.indexOf("tanzania-") === 0 || /-safari$/.test(currentPage) ?
      "Tanzania Safaris" : "Zanzibar Tours";

  var primaryMenu = $(".tp-mobile-menu-active > ul");
  primaryMenu.find(".active").removeClass("active");
  primaryMenu.children("li").each(function () {
    var link = $(this).children("a").first();
    if ($.trim(link.text()) === currentSection) {
      $(this).addClass("current-menu-item");
    }
  });
  primaryMenu.find("a[href]").each(function () {
    var href = $(this).attr("href");
    if (!href || href === "#") return;
    var linkedPage = href.split("?")[0].split("/").filter(Boolean).pop() || "index";
    if (linkedPage.replace(/\.html?$/i, "") === currentPage) {
      $(this).attr("aria-current", "page").parent().addClass("current-menu-item");
    }
  });

  let tpMenuHTML = $(".tp-mobile-menu-active > ul").clone();
  let tpOffcanvasMenu = $(".tp-offcanvas-menu > nav");

  tpOffcanvasMenu.append(tpMenuHTML);

  if ($(tpOffcanvasMenu).find(".sub-menu").length != 0) {
    $(tpOffcanvasMenu)
      .find(".sub-menu")
      .parent()
      .append(
        '<button class="tp-sidemenu-close" aria-label="Open submenu"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M3 2.5L6.5 5L3 7.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
      );
  }

  let tpSideMenuToggle = $("button.tp-sidemenu-close");

  $(tpSideMenuToggle).on("click", function () {
    $(this).siblings(".sub-menu").stop(true, true).slideToggle();
    $(this).parent().toggleClass("active");
  });

  $(tpOffcanvasMenu).on("click", "li.has-dropdown > a", function (event) {
    event.preventDefault();
    $(this).siblings(".sub-menu").stop(true, true).slideToggle();
    $(this).parent().toggleClass("active");
  });

  ///////////////////////////////////////////////////
  // Sticky header
  windowOn.on("scroll", function () {
    var scroll = windowOn.scrollTop();
    if (scroll < 400) {
      $("#header-sticky").removeClass("header-sticky");
    } else {
      $("#header-sticky").addClass("header-sticky");
    }
  });
  if ($(".tp-header-height").length > 0) {
    $(".tp-header-height").each(function () {
      $(this).css({
        height: $(this).height(),
      });
    });
  }

  ////////////////////////////////////////////////////
  // Offcanvas navigation

  $(".tp-header-toogle").on("click", function () {
    $(".tp-offcanvas").addClass("tp-offcanvas-open");
    $(".tp-offcanvas-overlay").addClass("tp-offcanvas-overlay-open");
  });

  $(".tp-offcanvas-close-button,.tp-offcanvas-overlay").on(
    "click",
    function () {
      $(".tp-offcanvas").removeClass("tp-offcanvas-open");
      $(".tp-offcanvas-overlay").removeClass("tp-offcanvas-overlay-open");
    },
  );

  ////////////////////////////////////////////////////
  // Data-driven presentation helpers
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url( " + $(this).attr("data-background") + "  )",
    );
  });

  $("[data-width]").each(function () {
    $(this).css("width", $(this).attr("data-width"));
  });

  $("[data-bg-color]").each(function () {
    $(this).css("background-color", $(this).attr("data-bg-color"));
  });

  ////////////////////////////////////////////////////
  // Back to top
  function back_to_top() {
    var btn = $("#back_to_top");
    var btn_wrapper = $(".back-to-top-wrapper");

    windowOn.scroll(function () {
      if (windowOn.scrollTop() > 300) {
        btn_wrapper.addClass("back-to-top-btn-show");
      } else {
        btn_wrapper.removeClass("back-to-top-btn-show");
      }
    });

    btn.on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "300");
    });
  }
  back_to_top();

  // A consistent contact shortcut on every page, without duplicating page markup.
  $(function () {
    if (document.getElementById("floating-whatsapp")) return;

    var whatsapp = document.createElement("a");
    whatsapp.id = "floating-whatsapp";
    whatsapp.href = "https://wa.me/255695368917?text=Hello%20Fahad%20Travel%20Zanzibar%2C%20I%20would%20like%20help%20planning%20my%20trip.";
    whatsapp.target = "_blank";
    whatsapp.rel = "noopener noreferrer";
    whatsapp.setAttribute("aria-label", "Chat with Fahad Travel Zanzibar on WhatsApp");
    whatsapp.innerHTML = '<svg viewBox="0 0 32 32" width="23" height="23" fill="currentColor" aria-hidden="true" focusable="false"><path d="M16.04 2.5A13.38 13.38 0 0 0 4.45 22.56L2.5 29.5l7.13-1.87A13.5 13.5 0 1 0 16.04 2.5Zm0 24.53c-2.2 0-4.36-.59-6.24-1.7l-.45-.26-4.23 1.11 1.13-4.12-.29-.47a11.03 11.03 0 1 1 10.08 5.44Zm6.06-8.26c-.33-.17-1.96-.97-2.27-1.08-.3-.11-.52-.16-.74.17-.22.33-.85 1.08-1.04 1.3-.19.22-.38.25-.71.08-.33-.17-1.39-.51-2.65-1.63-.98-.87-1.64-1.94-1.83-2.27-.19-.33-.02-.51.14-.68.15-.15.33-.39.5-.58.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.58-.08-.17-.74-1.78-1.02-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.58.08-.88.41-.3.33-1.15 1.12-1.15 2.73s1.18 3.17 1.34 3.39c.17.22 2.32 3.55 5.62 4.98.79.34 1.41.55 1.89.7.79.25 1.51.21 2.08.13.63-.09 1.96-.8 2.24-1.57.28-.77.28-1.43.19-1.57-.08-.14-.3-.22-.63-.39Z"/></svg><span>Chat on WhatsApp</span>';
    document.body.appendChild(whatsapp);
  });

  ////////////////////////////////////////////////////
  // Image galleries
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: "hidden",
  });

  let tourDetailGallery = $(".tp-tour-detail-image");
  tourDetailGallery.magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: "hidden",
    callbacks: {
      open: function () {
        document.body.classList.add("tour-gallery-open");
        if (window.matchMedia("(max-width: 900px)").matches &&
            this.arrowLeft && this.arrowRight) {
          this.contentContainer.append(this.arrowLeft, this.arrowRight);
        }
      },
      close: function () {
        document.body.classList.remove("tour-gallery-open");
      },
    },
  });

  $(".tp-tour-gallery-view-all").on("click", function (event) {
    event.preventDefault();
    tourDetailGallery.first().trigger("click");
  });

  ////////////////////////////////////////////////////
  // Animate elements as they enter the viewport.

  function wowAnimation() {
    var wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: false,
      live: true,
    });
    wow.init();
  }

})(jQuery);
