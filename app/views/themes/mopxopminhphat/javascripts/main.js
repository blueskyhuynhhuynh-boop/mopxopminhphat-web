$(document).ready(function () {
  $(".menuItem_1 .linkLevel_1 ").each(function () {
    let path = window.location.href;
    if (this.href === path) {
      $(this).parent().addClass("lightActive");
    }
  });
  const overWirtebutton = () => {
    $(".owl-carousel").each(function () {
      $(this)
        .find(".owl-nav button")
        .attr("aria-label", "button")
        .attr("role", "button");
      $(this).find(".owl-dots button").attr("aria-label", "button");
    });
  };
  overWirtebutton();

  const statsNumbers = document.querySelectorAll("#numberCount .infor .number");

  // Animate numbers when they come into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetNum = entry.target.innerText
            .replace("+", "")
            .replace(/,/g, "");

          // Kiểm tra nếu phần tử đã được animate trước đó
          if (!entry.target.dataset.animated && !isNaN(targetNum)) {
            animateValue(entry.target, 0, parseInt(targetNum), 2000);
            entry.target.dataset.animated = "true"; // Đánh dấu đã animate
            observer.unobserve(entry.target); // Ngừng quan sát để tránh chạy lại
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  // count number
  statsNumbers.forEach((number) => observer.observe(number));

  // Function to animate counting
  function animateValue(obj, start, end, duration) {
    const hasPlus = obj.innerText.includes("+");
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);

      // Format number with comma
      const formattedValue = value.toLocaleString("en-US");
      obj.innerText = hasPlus ? "+" + formattedValue : formattedValue;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }

  // menuDesktop

  // Lắng nghe sự kiện chuyển slide
  $(".owlwhyBlock").on("changed.owl.carousel", function (event) {
    var currentItem = $(this).find(".owl-item").eq(event.item.index);
    var hash = currentItem.find(".itemBlock").data("hash");
    if (hash) {
      $(".secStrength .leftBlock .smallBlock").removeClass("active");
      $('.secStrength .leftBlock .smallBlock[href="#' + hash + '"]').addClass(
        "active"
      );
    }
  });

  // Xử lý click vào .smallBlock
  $(".secStrength .leftBlock .smallBlock").click(function () {
    if (!$(this).hasClass("active")) {
      $(this).parent().find(".smallBlock").removeClass("active");
      $(this).addClass("active");
    }
  });
  //
  $(".PageLink .link").click(function (e) {
    // e.preventDefault(); // nếu muốn ngăn cuộn mặc định
    $(".PageLink .link").removeClass("active");
    $(this).addClass("active");
  });

  // scroll to section
  $("a.scroll-to").click(function (event) {
    event.preventDefault();
    var target = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      1000
    );
  });

  // Click bars menu hiện danh mục cấp 1
  $(".barsArea .barsPart").click(function () {
    if (!$(this).hasClass("active")) {
      $(this).addClass("active");
      $("#blockCateMobile").addClass("active");
      $(".blockMobile").addClass("active");
    } else {
      $(this).removeClass("active");
      $("#blockCateMobile").removeClass("active");
      $(".blockMobile").removeClass("active");
    }
  });
  // Click sổ ra danh mục cấp 2
  $("#blockCateMobile .blockCateLevel_1 .menuItem_1 .btnToggle_1").click(
    function () {
      var menuItem_1 = $(this).parent();
      var blockCateLevel_1 = $(this).parent().parent();
      if (menuItem_1.hasClass("active")) {
        menuItem_1.removeClass("active");
      } else {
        blockCateLevel_1.find(".menuItem_1").removeClass("active");
        menuItem_1.addClass("active");
      }
    }
  );
  // theo dõi sự kiện cuộn lên của header
  let lastScrollTop = document.documentElement.scrollTop;
  const header = document.querySelector("#menu_desktop");

  function handleScroll() {
    let currentScrollTop = document.documentElement.scrollTop;

    if (currentScrollTop < lastScrollTop) {
      // Đang cuộn lên
      // console.log("Đang cuộn lên đầu trang");
      if (header) {
        header.classList.add("tranY-0");
        header.classList.remove("tranY-100");
        header.classList.add("header-not-top");
      }
    } else {
      // Đang cuộn xuống
      // console.log("Đang cuộn xuống");
      if (header) header.classList.add("tranY-100");
    }

    // Kiểm tra nếu cuộn lên top (scrollTop = 0)
    if (document.documentElement.scrollTop === 0) {
      // console.log("Đang tren top");
      if (header) header.classList.remove("header-not-top");
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
  }

  if (header) {
    window.addEventListener("scroll", handleScroll);
  } else {
    console.log("khong tim thay class header");
  }

  const parents = document.querySelectorAll("#parent");

  parents.forEach((parent) => {
    parent.addEventListener("click", function () {
      const child = this.querySelector("#child");
      const icon = this.querySelector(".iconfont i");
      const isExpanded = child.style.height && child.style.height !== "0px";

      // Đóng tất cả child và reset icon của các phần tử khác
      parents.forEach((otherParent) => {
        const otherChild = otherParent.querySelector("#child");
        const otherIcon = otherParent.querySelector(".iconfont i");
        if (otherChild && otherChild !== child) {
          otherChild.style.height = "0px";
        }
        if (otherIcon && otherIcon !== icon) {
          otherIcon.classList.remove("fa-circle-minus");
          otherIcon.classList.add("fa-circle-plus");
        }
      });

      // Toggle submenu hiện tại
      if (!isExpanded) {
        child.style.height = child.scrollHeight + "px";
        if (icon) {
          icon.classList.remove("fa-circle-plus");
          icon.classList.add("fa-circle-minus");
        }
      } else {
        child.style.height = "0px";
        if (icon) {
          icon.classList.remove("fa-circle-minus");
          icon.classList.add("fa-circle-plus");
        }
      }
    });
  });

  // Click sổ ra danh mục cấp 3
  $("#blockCateMobile .blockCateLevel_2 .menuItem_2 .btnToggle_2").click(
    function () {
      var connectCate2And3 = $(this).parent().attr("connectCate2And3");
      $("#blockCateMobile .blockCateLevel_3").addClass("active");
      $("#blockCateMobile .blockCateLevel_3")
        .find(".wrapBlockCate_3")
        .removeClass("active");
      $("#blockCateMobile .blockCateLevel_3")
        .find('.wrapBlockCate_3[connectCate2And3="' + connectCate2And3 + '"]')
        .addClass("active");
    }
  );

  $("#blockCateMobile .blockCateLevel_3 .btnBackToBlockCate_2").click(
    function () {
      $("#blockCateMobile .blockCateLevel_3").removeClass("active");
    }
  );
  // Click sổ ra danh mục cấp 4
  $("#blockCateMobile .blockCateLevel_3 .menuItem_3 .btnToggle_3").click(
    function () {
      var menuItem_3 = $(this).parent();
      var wrapBlockCate_3 = $(this).parent().parent();
      if (menuItem_3.hasClass("active")) {
        menuItem_3.removeClass("active");
        menuItem_3.find(".blockCateLevel_4").removeClass("active");
      } else {
        wrapBlockCate_3.find(".menuItem_3").removeClass("active");
        menuItem_3.addClass("active");
        menuItem_3.find(".blockCateLevel_4").addClass("active");
      }
    }
  );

  // specialVideoBlock_1
  $(".specialVideoBlock_1").click(function () {
    var dataSrcVideo = $(this).attr("dataSrcVideo");
    $(this)
      .find(".wrapVideo")
      .append(
        '<img class="imgLoad" src="/tassets/images/img_loading_1.gif" alt="loading"><iframe width="560" height="315" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      );
    $(this).find(".wrapVideo iframe").attr("src", dataSrcVideo);
    $(this).find(".wrapIconPlay").fadeOut(0);
  });
  // specialVideoBlock
  // click anh video thi ra video
  $(".specialVideoBlock .imgPart").click(ClickImgOpenVideo);
  function ClickImgOpenVideo() {
    var srcIframe = $(this).find("img").attr("datalinkvideo");
    var block = $(this).parent();
    var block_2 = block.find(".videoFloatBlock");
    var block_3 = block_2.clone();
    block_3.find(".videoPart iframe").attr("src", srcIframe);
    block_3.css("display", "block");

    $("body").prepend(block_3);
    $(".videoFloatBlock").click(function () {
      block_3.remove();
    });
    $(".videoFloatBlock .btnHideVideo .fa-times").click(function () {
      block_3.remove();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".page-link");

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        const page = this.getAttribute("data-page");

        const url = new URL(window.location.href);
        url.searchParams.set("page", page);

        // Chuyển trang + reload
        window.location.href = url.toString();
      });
    });
  });

  // xu_ly_footer_mobile
  var widthOfWin = $(window).width();
  xu_ly_footer_mobile();
  function xu_ly_footer_mobile() {
    // footer
    addMarginBotForFooterMobile();
    function addMarginBotForFooterMobile() {
      var heightOfMenuEndPage = $("#menuEndPage").innerHeight();
      if (widthOfWin <= 767) {
        $("#footerAGS").css("margin-bottom", heightOfMenuEndPage);
      } else {
        $("#footerAGS").css("margin-bottom", "0");
      }
    }
  }
  // pageUpBlock
  // Ẩn hiện upDown item
  $(window).scroll(function (event) {
    var pos_body = $("html,body").scrollTop();
    if (pos_body > 100) {
      $("#pageUpBlock .pageUp").removeClass("hidePageUp");
    } else {
      $("#pageUpBlock .pageUp").addClass("hidePageUp");
    }
  });

  // Click UP ve dau trang
  $("#pageUpBlock .pageUp").click(function () {
    $("html,body").animate({ scrollTop: 0 }, 600);
  });

  // Chọn tất cả các phần tử có class là data_contents
  const containers = document.querySelectorAll(".data_contents");

  // Duyệt qua từng phần tử và tìm các thẻ img bên trong
  containers.forEach((container) => {
    const images = container.querySelectorAll("img");
    images.forEach((img) => {
      img.setAttribute("loading", "lazy");
    });
  });

  // specialBlock21
  $(".specialBlock_21").each(function () {
    var bigImgBlock = $(this).find(".bigImgBlock");
    var smallImgBlock = $(this).find(".smallImgBlock");
    var slidesPerPage = 4; //globaly define number of elements per page
    var syncedSecondary = true;

    bigImgBlock
      .owlCarousel({
        slideSpeed: 2000,
        nav: false,
        autoplay: false,
        smartSpeed: 600,
        dots: false,
        loop: true,
        margin: 13,
        animateOut: "fadeOut",
        responsiveRefreshRate: 200,
        responsive: {
          0: {
            items: 1,
          },
          767: {
            items: 1,
          },
          991: {
            items: 1,
          },
        },
      })
      .on("changed.owl.carousel", syncPosition);

    smallImgBlock
      .on("initialized.owl.carousel", function () {
        smallImgBlock.find(".owl-item").eq(0).addClass("current");
      })
      .owlCarousel({
        dots: false,
        nav: false,
        smartSpeed: 600,
        slideSpeed: 600,
        margin: 10,
        mouseDrag: false,
        slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
        responsiveRefreshRate: 200,
        responsive: {
          0: {
            items: 3,
          },
          575: {
            items: slidesPerPage,
          },
        },
      })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if you set loop to false, you have to restore this next line
      //var current = el.item.index;

      //if you disable loop you have to comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }

      //end block

      smallImgBlock
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = smallImgBlock.find(".owl-item.active").length - 1;
      var start = smallImgBlock.find(".owl-item.active").first().index();
      var end = smallImgBlock.find(".owl-item.active").last().index();

      if (current > end) {
        smallImgBlock.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        smallImgBlock.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        bigImgBlock.data("owl.carousel").to(number, 100, true);
      }
    }

    smallImgBlock.on("click", ".owl-item", function (e) {
      e.preventDefault();
      var number = $(this).index();
      bigImgBlock.data("owl.carousel").to(number, 300, true);
    });
  });

  // contactCallPopUp
  $(".contactCallPopUp").click(function () {
    var dataHref = $(this).attr("dataHref");
    var contactText = $(this).attr("contactText");
    var idGoogleGet = $(this).attr("idGoogleGet");

    var btnContact = $(".popupAskContact .modal-footer .btnContact");
    btnContact.attr("href", dataHref);
    btnContact.attr("id", idGoogleGet);
    btnContact.text(contactText);
  });

  //
  AOS.init();
});
