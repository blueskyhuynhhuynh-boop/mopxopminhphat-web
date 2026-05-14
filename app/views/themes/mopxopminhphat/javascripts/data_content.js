function fixDataContents(){
  $(".data_contents p span").css("font-size","unset"); ////xoa fontsize the span cua cac bai viet crawl ve
  $(".data_contents div span").css("font-size","unset"); //xoa fontsize the span cua cac bai viet crawl ve
  //$(".data_contents a").attr("target","_blank"); //click link ra newtab cac trang post item
  $(".data_contents ul li").css("list-style","unset"); // them listItem truoc the li trong content
  $(".data_contents span").css("font-family","unset");
  $(".data_contents iframe").wrap('<div class="wrapIframeVideo"><div class="wrapWidthVideo"></div></div>');
  $(".data_contents video").wrap('<div class="wrapVideoTagProcess"></div>');
  $(".data_contents table").wrap('<div class="scrollMobiForTable"></div>');
  $('.data_contents img').wrap('<p style="text-align:center;"></p>');
  $('.data_contents img').removeAttr("style");
  $(".data_contents table").wrap('<div class="wrap_table_long"></div>');
  $('.data_contents table').removeAttr("style"); /*xoa style trong the table*/
}

$(document).ready(function(){
  if($('.data_contents').length) {
    fixDataContents();
  }
})
