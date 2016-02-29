$(document).ready ->
  initialHeight = $('.snippet-content').css("max-height")
  $('.snippet-reveal').not(".open").css("line-height", initialHeight)

  $('.snippet-content').each ->
    if $(this)[0].scrollHeight <= parseInt($(this).css('max-height')) + 10
      $(this).siblings('.snippet-expander').hide()

  $('.snippet-expander').click ->
    $(this).toggleClass 'open'
    $(this).siblings('.snippet-content').toggleClass 'open'

    openHeight = $(this).siblings('.snippet-content')[0].scrollHeight + 'px'
    boxSize = if $(this).hasClass('open') then openHeight else initialHeight
    $(this).siblings('.snippet-content').css 'max-height', boxSize

    if $(this).hasClass("snippet-reveal")
      $(this).toggleClass "initial"
      if $(this).hasClass("open-delayed")
        $(this).removeClass("open-delayed")
      else
        element = $(this)
        setTimeout (-> element.addClass("open-delayed")), 500
