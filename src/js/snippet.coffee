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
    $(this).siblings('.snippet-expander').addClass "closed-fully"

  $('.snippet-expander').click ->
    if $(this).hasClass 'open'
      $(this).removeClass('open').removeClass("open-fully").addClass('closed')
      $(this).siblings('.snippet-content').addClass('closed').removeClass('open')
      element = $(this)
      setTimeout (-> element.addClass("closed-fully")), 500
    else
      $(this).removeClass('closed').removeClass("closed-fully").addClass('open')
      $(this).siblings('.snippet-content').addClass('open').removeClass('closed')
      element = $(this)
      setTimeout (-> element.addClass("open-fully")), 500

    openHeight = $(this).siblings('.snippet-content')[0].scrollHeight + 'px'
    boxSize = if $(this).hasClass('open') then openHeight else initialHeight
    $(this).siblings('.snippet-content').css 'max-height', boxSize

    if $(this).hasClass("snippet-reveal") || $(this).hasClass("snippet-shutter-horizontal")
      $(this).toggleClass "initial"
