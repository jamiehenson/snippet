$(document).ready(function() {
  var initialHeight;
  initialHeight = $('.snippet-content').css("max-height");
  $('.snippet-reveal').css("line-height", initialHeight);
  $('.snippet-content').each(function() {
    if ($(this)[0].scrollHeight <= parseInt($(this).css('max-height')) + 10) {
      return $(this).siblings('.snippet-expander').hide();
    }
  });
  return $('.snippet-expander').click(function() {
    var boxSize, element, openHeight;
    $(this).toggleClass('open');
    $(this).siblings('.snippet-content').toggleClass('open');
    openHeight = $(this).siblings('.snippet-content')[0].scrollHeight + 'px';
    boxSize = $(this).hasClass('open') ? openHeight : initialHeight;
    $(this).siblings('.snippet-content').css('max-height', boxSize);
    if ($(this).hasClass("snippet-reveal")) {
      $(this).toggleClass("initial");
      if ($(this).hasClass("open-delayed")) {
        return $(this).removeClass("open-delayed");
      } else {
        element = $(this);
        return setTimeout((function() {
          return element.addClass("open-delayed");
        }), 500);
      }
    }
  });
});
