$(document).ready(function(){

	$('.option').click(function(e){
    data_variant = ""
    variant = {}

    $(".variant_options").each(function(index, ele) {
      data_variant += "[" + $(ele).find('.variant_name').attr('key') + "='" + $(ele).find('.option.active').text() + "']"
      variant[$(ele).find('.variant_name').attr('key')] = $(ele).find('.option.active').text();
      $('input[name="variants[' + $(ele).find('.variant_name').attr('key') + ']"]').attr("value", $(ele).find('.option.active').text())
    });

    var data = $(".variants p" + data_variant);
    var variant_id = data.attr('variant_id');
    var price = data.attr('price');
		var gioi_tinh = data.attr('gioi_tinh');
		var nam_sinh = data.attr('nam_sinh');
		var giong = data.attr('giong');
		// var kich_thuoc = data.attr('kich_thuoc');
		var nguon_goc = data.attr('nguon_goc');
    var image_url = data.attr('image_url');
    console.log(image_url)
    if (price != null) {
      $('input#price').attr("value", price)
      $('.price_change').text(price) ;
    } else {
      value = $(".price_change").attr('price');
      $('input#price').attr("value", value);
      $('.price_change').text(value) ;
    }
		//1
		if (gioi_tinh != null) {
      $('input#gioi_tinh').attr("value", gioi_tinh)
      $('.gioi_tinh_change').text(gioi_tinh) ;
    } else {
      value = $(".gioi_tinh_change").attr('gioi_tinh');
      $('input#gioi_tinh').attr("value", value);
      $('.gioi_tinh_change').text(value) ;
    }
		//2
		if (nam_sinh != null) {
      $('input#nam_sinh').attr("value", nam_sinh)
      $('.nam_sinh_change').text(nam_sinh) ;
    } else {
      value = $(".nam_sinh_change").attr('nam_sinh');
      $('input#nam_sinh').attr("value", value);
      $('.nam_sinh_change').text(value) ;
    }
		//3
		if (giong != null) {
      $('input#giong').attr("value", giong)
      $('.giong_change').text(giong) ;
    } else {
      value = $(".giong_change").attr('giong');
      $('input#giong').attr("value", value);
      $('.giong_change').text(value) ;
    }
		//4
		if (nguon_goc != null) {
      $('input#nguon_goc').attr("value", nguon_goc)
      $('.nguon_goc_change').text(nguon_goc) ;
    } else {
      value = $(".nguon_goc_change").attr('nguon_goc');
      $('input#nguon_goc').attr("value", value);
      $('.nguon_goc_change').text(value) ;
    }
		//5
		// if (kich_thuoc != null) {
    //   $('input#kich_thuoc').attr("value", kich_thuoc)
    //   $('.kich_thuoc_change').text(kich_thuoc) ;
    // } else {
    //   value = $(".kich_thuoc_change").attr('kich_thuoc');
    //   $('input#kich_thuoc').attr("value", value);
    //   $('.kich_thuoc_change').text(value) ;
    // }


    if (variant_id != null) {
      $('input#variant_id').attr("value", variant_id)
      $('.add-to-cart').attr("data-variant-id", variant_id)
    } else {
      $('.add-to-cart').removeAttr("data-variant-id");
      $('input#variant_id').removeAttr("value");
    }

    if (image_url != null) {
      $('.bigImgBlock.owl-carousel .active img').attr("src", image_url)
    } else {
			value = $("#image_url").attr('value');
      $('.bigImgBlock.owl-carousel .active img').attr("src", value)
    }
  })
// enterNumb
		// Tru so luong o o dien so luong san pham muon mua
    $('.enterNumb .fa-minus-square').click(function(){
      var numbProduct=parseInt($(this).parent().find('input').val());
      var newNumbProduct=numbProduct;
      if(numbProduct>0){newNumbProduct=numbProduct - 1;}
      if (isNaN(newNumbProduct)) {
        newNumbProduct= 1;
      }
      $(this).parent().find('.fa-minus-square ~ input').val(newNumbProduct).trigger('change');
    })

  // Cong so luong o o dien so luong san pham muon mua
    $('.enterNumb .fa-plus-square').click(function(){
      var numbProduct=parseInt($(this).parent().find('input').val());
      var newNumbProduct=numbProduct + 1;
      if (isNaN(newNumbProduct)) {
        newNumbProduct= 1;
      }
      $(this).parent().find('.fa-plus-square ~ input').val(newNumbProduct).trigger('change');
    })
// cart Dong Khanh
	// desktopBlock
		// tick chon tat cac thi cac o nho duoc tick
		$('.payBlock #selectAllDesk').click(function(){
			if( $(this).is(':checked')) {
				$('.cartTable .line2 .form-check-input').prop('checked', true);
				$(this).prop('checked', true);
			}
			else {
				$('.cartTable .line2 .form-check-input').prop('checked', false);
				$(this).prop('checked', false);
			}
		})
		// tick bo khong chon o nho thi o tat ca cung bo tick
		$('.cartTable .line2 .form-check-input').click(function(){
			if(!$(this).is(':checked')){
				$('.payBlock #selectAllDesk').prop('checked', false);
			}
		})

	// mobileBlock
		// tick chon tat cac thi cac o nho duoc tick
		$('.payBlock #selectAllMobile').click(function(){
			if( $(this).is(':checked')) {
				$('.cartPayMobile .specialBlock_30 .form-check-input').prop('checked', true);
				$(this).prop('checked', true);
			}
			else {
				$('.cartPayMobile .specialBlock_30 .form-check-input').prop('checked', false);
				$(this).prop('checked', false);
			}
		})
		// tick bo khong chon o nho thi o tat ca cung bo tick
		$('.cartPayMobile .specialBlock_30 .form-check-input').click(function(){
			if(!$(this).is(':checked')){
				$('.payBlock #selectAllMobile').prop('checked', false);
			}
		})
// orderAcQuy
		// deliveryInforBlock
			// An hien cac thong tin dien khi chon xuat hoa don
			$(".deliveryInforBlock .wrapForm-check #invoice").click( function(){
				if( $(this).is(':checked') ) {
					$('.deliveryInforBlock .TTXuatHD').fadeIn(600);
					$('.deliveryInforBlock .price_vat').fadeIn(600);
					$('.deliveryInforBlock .price_novat').fadeOut(600);
				} else {
					$('.deliveryInforBlock .TTXuatHD').fadeOut(600);
					$('.deliveryInforBlock .price_vat').fadeOut(600);
					$('.deliveryInforBlock .price_novat').fadeIn(600);
				}
			});
			$("#method_order").click( function(){
				if( $('#method_order').find('option:selected').attr('data') == "true") {
					$('.deliveryInforBlock .form_address').fadeOut(600);
				} else {
					$('.deliveryInforBlock .form_address').fadeIn(600);
				}
			});
			$(".bank_type").click( function(){
				$('.display').fadeOut(1);
				var type = $('.bank_type').find('option:selected').attr('data');
				if( type == "bank_personal") {
					$('.bank_personal').fadeIn(600);
					$('.bank_company').fadeOut(1);
				} else if( type == "bank_company") {
					$('.bank_personal').fadeOut(1);
					$('.bank_company').fadeIn(600);
				} else {
					$('.bank_personal').fadeOut(600);
					$('.bank_company').fadeOut(600);
				}
			});
			$(".deliveryInforBlock .wrapForm-check #noInvoice").click( function(){
				if( $(this).is(':checked') ) {
						$('.deliveryInforBlock .TTXuatHD').fadeOut(600);
						$('.deliveryInforBlock .price_vat').fadeOut(600);
						$('.deliveryInforBlock .price_novat').fadeIn(600);
				}
			});
	// paymentMethodBlock
		// An hien cac thong tin dien khi chon chuyen khoan ngan hang, thanh toan khi giao hang
			$(".paymentMethodBlock .detailPay .form-checkFix #thanhToanCKQNH").click( function(){
				if( $(this).is(':checked') ) {
						$('.paymentMethodBlock .detailPay .wrapChooseAcount').fadeIn(600);
						$('.paymentMethodBlock .detailPay .wrapDepositInfo').fadeOut(0);
				}
			});

			$(".paymentMethodBlock .detailPay .form-checkFix #thanhToanKGH").click( function(){
				if( $(this).is(':checked') ) {
						$('.paymentMethodBlock .detailPay .wrapChooseAcount').fadeOut(0);
						$('.paymentMethodBlock .detailPay .wrapDepositInfo').fadeIn(600);
				}
			});
});