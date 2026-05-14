$(document).ready(function () {
  // owl-carousel

  //home page----------------------------------------------------------------------------

  var owl1 = $(".owl-ags");
  owl1.owlCarousel({
    loop: true,
    margin: 0,
    animateOut: "fadeOut",
    nav: true,
    dots: true,
    smartSpeed: 1000,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
  // thay owl-nav1 vao slie
  $(".owl-ags .owl-nav").attr("id", "owl-nav1");
  // thay owl-nav1 vao slie
  $(".owl-ags .owl-dots").attr("id", "owl-dot1");

  // slide category
  $(".Home3").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1.3,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });
  $(".Home3 .owl-nav").attr("id", "owl-nav1");

  // slide video
  $(".slideVideo").owlCarousel({
    loop: true,
    center: true,
    margin: 120,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1.5,
        margin: 40,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 1.9,
      },
    },
  });
  $(".slideVideo .owl-dots").attr("id", "owl-dot1");

  // slide customer
  $(".slideCustomer").owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: true,
    autoplay: true,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });
  $(".slideCustomer .owl-nav").attr("id", "owl-nav1");

  // slide du an
  $(".slideDuan").owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    items: 1,
    animateOut: "my-fade-out",
    animateIn: "my-fade-in",
    autoplay: true,
    smartSpeed: 3000, // thời gian hiệu ứng fade: 1000ms = 1s
    autoplayTimeout: 5000, // thời gian chờ giữa các lần chuyển slide
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
  $(".slideDuan .owl-nav").attr("id", "owl-nav1");

  // thay owl-nav1 vao slie
  $(".secBlock1 .Home3 .owl-nav").attr("id", "owl-nav1");

  // page gioi thieu ----------------------------------------------------------------------------------

  // alide slideIntro8
  $(".slideIntro8").owlCarousel({
    loop: false,
    margin: 30,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });
  $(".slideIntro8 .owl-dots").attr("id", "owl-dot1");

  // owlwhyBlock
  $(".owlwhyBlock").owlCarousel({
    items: 1,
    loop: true, // Set to true if you want continuous autoplay
    center: true,
    mouseDrag: true,
    margin: 0,
    URLhashListener: true,
    startPosition: "URLHash",
    animateOut: "fadeOut",
    smartSpeed: 800,
    autoplay: true, // Enable autoplay
    autoplayTimeout: 4000, // Time in milliseconds before next slide (e.g., 5 seconds)
    autoplayHoverPause: true, // Pause autoplay on hover
    responsive: {
      0: {
        nav: true,
      },
      575: {
        nav: false,
      },
    },
  });
  $(".owlwhyBlock .owl-nav").attr("id", "owl-nav1");

  // page chinh sach phuc loi --------------------------------------------------------------------------------------

  $(".slideVideoCS").owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: true,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  });
  $(".slideVideoCS .owl-nav").attr("id", "owl-nav1");
});
