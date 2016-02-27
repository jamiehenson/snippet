$(document).ready(function() {
  $('.snippet-content').each(function() {
    if ($(this)[0].scrollHeight <= parseInt($(this).css('max-height')) + 10) {
      return $(this).siblings('.snippet-expander').hide();
    }
  });
  return $('.snippet-expander').click(function() {
    var boxSize, openHeight;
    $(this).toggleClass('open');
    $(this).siblings('.snippet-content').toggleClass('open');
    openHeight = $(this).siblings('.snippet-content')[0].scrollHeight + 'px';
    boxSize = $(this).hasClass('open') ? openHeight : '100px';
    $(this).siblings('.snippet-content').css('max-height', boxSize);
    if ($('.snippet-expander').hasClass("snippet-reveal")) {
      if ($('.snippet-expander').hasClass("open-delayed")) {
        return $('.snippet-expander').removeClass("open-delayed");
      } else {
        return setTimeout((function() {
          return $('.snippet-expander').addClass("open-delayed");
        }), 500);
      }
    }
  });
});
