$(document).ready ->
  initialHeight = $('.snippet-content').css("max-height")
  initialWidth = $('.snippet-content').css("width")
  $('.snippet-reveal').css("line-height", initialHeight)

  textContents = []

  $('.snippet-content').each (index, element) ->
    $(element).data("index", index)
    expander = $(this).siblings('.snippet-expander')
    if $(element)[0].scrollHeight <= parseInt($(element).css('max-height')) + 10
      expander.hide()
    $(element).siblings('.snippet-shutter-vertical').css("border-width", parseInt(initialHeight) / 2 + " 0 ");
    $(element).siblings('.snippet-shutter-horizontal').css("border-width", " 0 " + parseInt(initialWidth) / 2);
    $(element).siblings('.snippet-shutter-horizontal').css("padding-top", parseInt(initialHeight) / 2);
    expander.addClass "closed-fully"

    if expander.hasClass('snippet-inline')
      $(this).css("max-height", "initial")
      textContents.push $(this).text()
      truncateContent(this)

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

  $(document).on "click", ".snippet-inline-collapser", ->
    truncateContent($(this).parent())

  $(document).on "click", ".snippet-inline-expander", ->
    content = $(this).parent().text()
    index = $(this).parent().data("index")
    lessText = $(this).parent().siblings(".snippet-expander").data("collapse")
    $(this).parent().text(textContents[index]).append("<span class='snippet-inline-collapser'> <a>(" + lessText + ")</a></span>")
    $(this).remove()

truncateContent = (element) ->
  content = $(element).text()
  truncationLength = $(element).siblings('.snippet-expander').data("length") || 20
  moreText = $(element).siblings('.snippet-expander').data("expand")
  redacted = content.split(" ")[0..truncationLength].join(" ")
  $(element).text(redacted).append("<span class='snippet-inline-expander'>... <a>(" + moreText + ")</a></span>")
