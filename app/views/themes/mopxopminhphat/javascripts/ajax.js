$(document).ready(function(){
  // ------------------------------------------------------
  // click read more to load more product in product category page
  if($("#cateProduct .secCate #btnreadmore").attr("data-total-page") == 1){
    $("#cateProduct .secCate #btnreadmore").css("display","none")
  }
  $('#cateProduct .secCate #btnreadmore').click(function(e) {
    e.preventDefault();
    let pageNum = $(this).attr("data-current-page")
    pageNum = parseInt(pageNum) + 1
    $(this).attr("data-current-page",pageNum)
    const category_slug = $(this).attr("data-category");
    const totalPage = $(this).attr("data-total-page");

    params_product = {
      page:pageNum,
      category_slug: category_slug
    }
    var href = window.location.href;
    params = href.split('?')[1]
    if (params == '' || params == null) {

    } else {
      data_params = params.split('&');

      data_params.forEach((value) => {
        convert_params = value.split('=');
        key = convert_params[0];
        values = convert_params[1];
        params_product[key] = values
      });
    }

    $.get(
      "/api/get_products",
      params_product,
      function(data){
        $("#cateProduct .secCate .row ").append(function(){
          return `
            ${data}
          `
        })
      }
    );
    if(totalPage > 1 && totalPage == pageNum){
      $(this).addClass('d-none')
    }
  });
})

