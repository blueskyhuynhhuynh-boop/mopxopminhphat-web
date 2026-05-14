$(document).ready(function(){

	buildTableOfContent();
	toggleTableOfContent();
	
	function removeAccents(str) {
		var AccentsMap = [
			"aàảãáạăằẳẵắặâầẩẫấậ",
			"AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
			"dđ", "DĐ",
			"eèẻẽéẹêềểễếệ",
			"EÈẺẼÉẸÊỀỂỄẾỆ",
			"iìỉĩíị",
			"IÌỈĨÍỊ",
			"oòỏõóọôồổỗốộơờởỡớợ",
			"OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
			"uùủũúụưừửữứự",
			"UÙỦŨÚỤƯỪỬỮỨỰ",
			"yỳỷỹýỵ",
			"YỲỶỸÝỴ",
			"';,.?/"
		];
		for (var i=0; i<AccentsMap.length; i++) {
			var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
			var char = AccentsMap[i][0];
			str = str.replace(re, char);
			str = str.replace(/[\*\^\'\!]/g, '').split(" ").join('-')
			str = str.replace(/\xA0/g,' ');
			str = str.replace(" ","-")
			str = str.replace(":","-")
			str = str.replace(".","-")
			str = str.replace("_","-")
			str = str.replace(/--/, "-")
		}
		return str.toLowerCase();
	}
	// Tạo table content từ nội dung bài viết
		function buildTableOfContent() {
			var data = "<ul>";
			var newLine, el, title, link;
			$(".getTableOfContentBlock h3, .getTableOfContentBlock h2 ").each(function(index, ele) {
				el = $(this);
				title = el.text().trim();
				var id = removeAccents(title);
				el.attr('id',id);
				if (ele.tagName == "H3") {
					newLine =
					"<li class='sub_data'>" +
						"<a href='" + location.origin + location.pathname + '#' + id + "'>" +
							title +
						"</a>" +
					"</li>";
		
				} else if (ele.tagName == "H2"){
					newLine =
					"<li  class='data'>" +
						"<a href='" + location.origin + location.pathname + '#' + id + "'>" +
							title +
						"</a>" +
					"</li>";
				}
		
				data += newLine;
			});
		
			if (newLine == null) {
				data = ""
			}else {
				data +=
				"</ul>";
			}
					
			$("#bookmark-list").prepend(data);
		}
	
	// Xử lý click toggle toggleTableOfContent
		function toggleTableOfContent() {
			$('.tableOfContent .clickToggle').click(function(){
				var tableOfContent = $(this).parent().parent();
				if(tableOfContent.hasClass('appearContent')) {
					tableOfContent.removeClass('appearContent');
				} else tableOfContent.addClass('appearContent');
			})
		}
	// click view more to show all content
		$(".wrap-btn .btn_view_more").click(function (e) {
			$(this).parent().parent().find(".content-block").toggleClass("active");
			$(this).parent().parent().find(".content-block").toggleClass("no-after");
			if ($(this).text() == "Xem Thêm") {
				$(this).text("Thu gọn");
			} else {
				$(this).text("Xem Thêm");
			}
		});
	});