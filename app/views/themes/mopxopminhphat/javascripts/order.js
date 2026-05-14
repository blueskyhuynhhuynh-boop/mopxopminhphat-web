$(function() {
  $('form.order-form').each((index, form) => {
    $(form).validate({
      onfocusout: false,
      onkeyup: false,
      onclick: false,
      rules: {
        customer_name: {
          required: true,
        },
        customer_phone: {
          required: true,
          phoneNumber: true,
        },
        customer_email: {
          required: true,
          email: true
        },
        'shipping_address[address]': {
          required: true
        },
        'shipping_address[province]': {
          required: true
        },
        'shipping_address[district]': {
          required: true
        },
        'shipping_address[ward]': {
          required: true
        },
        'invoice_data[company_name]': {
          required: true
        },
        'invoice_data[tax_number]': {
          required: true
        },
        'invoice_data[address]': {
          required: true
        },
      },
      messages: {
      }
    });
  });

  $('form.order-form .submit-order').click(() => {
    $('form.order-form').submit();
  });

  // From service khach-san-cho-meo
  $('.submit-direct-order.ksch').click((event) => {
    const selected = $('form.product-form').find('.typePet.active');
    const roomType = selected.attr('typeroom');
    const petType = selected.text();
    const price = selected.attr('priceroom');

    const form = $('form.product-form');
    form.find('input[name="variants[room_type]"]').val(roomType);
    form.find('input[name="variants[pet_type]"]').val(petType);
    form.find('input[name="price"]').val(price);

    form.submit();
  });

  // From service spa-cho-meo
  $('.submit-direct-order.spa-cho-meo').click((event) => {
    const form = $('form.product-form');

    const roomType = form.find('.serviceTab.active').text();
    const selected = form.find('.serviceBlock.active').find('.typePet.active');
    const petType = selected.text();
    const price = selected.attr('priceroom');

    form.find('input[name="variants[room_type]"]').val(roomType);
    form.find('input[name="variants[pet_type]"]').val(petType);
    form.find('input[name="price"]').val(price);

    form.submit();
  });

  // Form on product detail
  $('.submit-direct-order.product').click((event) => {
    const form = $('form.product-form');
    form.submit();
  });

  $('form.order-form').on('onValid', function() {
    $(this).parent().find('.buttonload_booking').css("display","block");
    $(this).parent().find('.submit-order').css("display","none");
  });

  $('form.order-form').on('onSuccess', function() {
    $(this).parent().find('.buttonload_booking').css("display","none");
    $(this).parent().find('.submit-order').css("display","block");
   
  });
  
  $('form.order-form').on('onError', function() {
    $(this).parent().find('.buttonload_booking').css("display","none");
    $(this).parent().find('.submit-order').css("display","block");
  });
});
