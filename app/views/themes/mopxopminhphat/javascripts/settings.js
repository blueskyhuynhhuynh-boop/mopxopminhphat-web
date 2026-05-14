function setCustomValidationMessages() {
  jQuery.extend(jQuery.validator.messages, {
    required: "Vui lòng nhập thông tin bắt buộc",
  });
}

$(function() {
  setCustomValidationMessages();
});

