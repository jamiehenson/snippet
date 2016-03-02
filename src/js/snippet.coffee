$(document).ready ->
  initialHeight = $('.snippet-content').css("max-height")
  initialWidth = $('.snippet-content').css("width")
  $('.snippet-reveal').css("line-height", initialHeight)

  $('.snippet-content').each ->
    if $(this)[0].scrollHeight <= parseInt($(this).css('max-height')) + 10
      $(this).siblings('.snippet-expander').hide()
    $(this).siblings('.snippet-shutter-vertical').css("border-width", parseInt(initialHeight) / 2 + " 0 ");
    $(this).siblings('.snippet-shutter-horizontal').css("border-width", " 0 " + parseInt(initialWidth) / 2);
    $(this).siblings('.snippet-shutter-horizontal').css("padding-top", parseInt(initialHeight) / 2);

  $('.snippet-expander').click ->
    $(this).toggleClass 'open'
    $(this).siblings('.snippet-content').toggleClass 'open'

    openHeight = $(this).siblings('.snippet-content')[0].scrollHeight + 'px'
    boxSize = if $(this).hasClass('open') then openHeight else initialHeight
    $(this).siblings('.snippet-content').css 'max-height', boxSize

    if $(this).hasClass("snippet-reveal") || $(this).hasClass("snippet-shutter-horizontal")
      $(this).toggleClass "initial"
      if $(this).hasClass("open-delayed")
        $(this).removeClass("open-delayed")
      else
        element = $(this)
        setTimeout (-> element.addClass("open-delayed")), 500
