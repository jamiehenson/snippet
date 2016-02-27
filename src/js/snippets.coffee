$(document).ready ->
  $('.snippet-content').each ->
    if $(this)[0].scrollHeight <= parseInt($(this).css('max-height')) + 10
      $(this).siblings('.snippet-expander').hide()

  $('.snippet-expander').click ->
    if $('.snippet-expander').hasClass("snippet-reveal")
      if $('.snippet-expander').hasClass("open-delayed")
        $('.snippet-expander').removeClass("open-delayed")
      else
        setTimeout (->
          $('.snippet-expander').addClass("open-delayed")
        ), 500

    $(this).toggleClass 'open'
    $(this).siblings('.snippet-content').toggleClass 'open'

    openHeight = $(this).siblings('.snippet-content')[0].scrollHeight + 'px'
    boxSize = if $(this).hasClass('open') then openHeight else '100px'
    $(this).siblings('.snippet-content').css 'max-height', boxSize
