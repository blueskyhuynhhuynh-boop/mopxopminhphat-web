$(function () {
  // On lien-he page and on home page
  // Định nghĩa rule "phoneNumber2"
  
  $("form.lien-he").each((index, form) => {
    $(form).validate({
      onfocusout: false,
      onkeyup: false,
      onclick: false,
      rules: {
        name: {
          required: true,
        },
        phone: {
          required: true,
          phoneNumber: true
        },
        email: {
          required: true,
          email: true,
        },
        address: {
          required: true,
        },
        note: {
          required: true,
        },
      },
      messages: {
        name: "Vui lòng nhập tên",
        phone: {
          required: "Vui lòng nhập số điện thoại",
          phoneNumber: "Vui lòng nhập đúng số điện thoại",
        },
        email: {
          required: "Vui lòng nhập email",
          email: "Vui lòng nhập đúng định dạng email",
        },
      },
    });
  });
  // $('form.lien-he.home-page .btn-submit1').click(() => {
  //   $('form.lien-he.home-page').submit();
  // });

  // // On home page
  // $('form.uu-dai').validate({

  //   onfocusout: false,
  //   onkeyup: false,
  //   onclick: false,
  //   rules: {
  //     email: {
  //       required: true,
  //       email: true
  //     },
  //   },
  //   messages: {
  //     email: {
  //       required: "Vui lòng nhập email",
  //       email: "Vui lòng nhập đúng định dạng email"
  //     }
  //   }
  // });

  // $('.submit-block .btn-submit6').click(() => {
  //   $('form.uu-dai').submit();
  // })

  // On post page
  $("form.dang-ky").each((index, form) => {
    $(form).validate({
      onfocusout: false,
      onkeyup: false,
      onclick: false,
      rules: {
        name: {
          required: true,
        },
        phone: {
          required: true,
          phoneNumber: true
        },
        email: {
          required: true,
          email: true,
        },
        nameproduct: {
          required: true,
        },
        note: {
          required: true,
        },
      },
      messages: {
        name: {
          required: "Vui lòng nhập tên",
        },
        nameproduct: {
          required: "Vui lòng nhập tên",
        },
        phone: {
          required: "Vui lòng nhập số điện thoại",
          phoneNumber: "Vui lòng nhập đúng số điện thoại",
        },
        note: {
          required: "Vui lòng nhập nội dung cần tư vấn",
        },
        email: {
          required: "Vui lòng nhập email",
          email: "Vui lòng nhập đúng định dạng email",
        },
      },
    });
  });
  $("form.dang-ky-tu-van").each((index, form) => {
    $(form).validate({
      onfocusout: false,
      onkeyup: false,
      onclick: false,
      rules: {
        name: {
          required: true,
        },
        phone: {
          required: true,
          // phoneNumber: true
        },
        email: {
          required: true,
          email: true,
        },
        note: {
          required: true,
        },
        "extra[cong-ty]": {
          required: true,
        },
      },
      messages: {
        name: {
          required: "Vui lòng nhập tên",
        },
        phone: {
          required: "Vui lòng nhập số điện thoại",
          phoneNumber: "Vui lòng nhập đúng số điện thoại",
        },
        note: {
          required: "Vui lòng nhập nội dung cần tư vấn",
        },
        email: {
          required: "Vui lòng nhập email",
          email: "Vui lòng nhập đúng định dạng email",
        },
        "extra[cong-ty]": {
          required: "Vui lòng nhập tên công ty",
        },
      },
    });
  });
  $("form.dang-ky-tu-van-1").each((index, form) => {
    $(form).validate({
      onfocusout: false,
      onkeyup: false,
      onclick: false,
      rules: {
        name: {
          required: true,
        },
        phone: {
          required: true,
          phoneNumber: true,
        },
        email: {
          required: true,
          email: true,
        },
        note: {
          required: true,
        },
      },
      messages: {
        name: {
          required: "Vui lòng nhập tên",
        },
        phone: {
          required: "Vui lòng nhập số điện thoại",
          phoneNumber: "Vui lòng nhập đúng số điện thoại",
        },
        note: {
          required: "Vui lòng nhập nội dung cần tư vấn",
        },
        email: {
          required: "Vui lòng nhập email",
          email: "Vui lòng nhập đúng định dạng email",
        },
      },
    });
  });
  $("form.dang-ky-tu-van-2").each((index, form) => {
    $(form).validate({
      onfocusout: false,
      onkeyup: false,
      onclick: false,
      rules: {
        name: {
          required: true,
        },
        phone: {
          required: true,
          phoneNumber: true,
        },
        email: {
          required: true,
          email: true,
        },
        note: {
          required: true,
        },
      },
      messages: {
        name: {
          required: "Vui lòng nhập tên",
        },
        phone: {
          required: "Vui lòng nhập số điện thoại",
          phoneNumber: "Vui lòng nhập đúng số điện thoại",
        },
        note: {
          required: "Vui lòng nhập nội dung cần tư vấn",
        },
        email: {
          required: "Vui lòng nhập email",
          email: "Vui lòng nhập đúng định dạng email",
        },
      },
    });
  });
  
});
