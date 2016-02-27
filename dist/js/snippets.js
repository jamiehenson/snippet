$(document).ready(function() {
  $('.snippet-content').each(function() {
    if ($(this)[0].scrollHeight <= parseInt($(this).css('max-height')) + 10) {
      return $(this).siblings('.snippet-expander').hide();
    }
  });
  return $('.snippet-expander').click(function() {
    var boxSize, openHeight;
    if ($('.snippet-expander').hasClass("snippet-reveal")) {
      if ($('.snippet-expander').hasClass("open-delayed")) {
        $('.snippet-expander').removeClass("open-delayed");
      } else {
        setTimeout((function() {
          return $('.snippet-expander').addClass("open-delayed");
        }), 500);
      }
    }
    $(this).toggleClass('open');
    $(this).siblings('.snippet-content').toggleClass('open');
    openHeight = $(this).siblings('.snippet-content')[0].scrollHeight + 'px';
    boxSize = $(this).hasClass('open') ? openHeight : '100px';
    return $(this).siblings('.snippet-content').css('max-height', boxSize);
  });
});
