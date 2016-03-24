textContents = []

$(document).ready ->
  initialHeight = $('.snippet-content').css("max-height")
  initialWidth = $('.snippet-content').css("width")
  $('.snippet-reveal').css("line-height", initialHeight)

  $('.snippet-content').each (index, element) ->
    $(element).data("index", index)
    expander = $(this).siblings('.snippet-expander')
    if $(element)[0].scrollHeight <= parseInt($(element).css('max-height')) + 10
      expander.hide()
    $(element).siblings('.snippet-shutter-vertical').css("border-width", parseInt(initialHeight) / 2 + " 0 ");
    $(element).siblings('.snippet-shutter-horizontal').css("border-width", " 0 " + parseInt(initialWidth) / 2);
    $(element).siblings('.snippet-shutter-horizontal').css("padding-top", parseInt(initialHeight) / 2);
    expander.addClass "closed-fully"

    if expander.hasClass('snippet-inline') || expander.hasClass('snippet-inline-animated')
      $(this).css("max-height", "initial")
      textContents.push $(this).text()
      manipulateContent(this)

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
    if $(this).parent().siblings(".snippet-expander").hasClass 'snippet-inline-animated'
      manipulateContent($(this).parent(), true)
    else
      manipulateContent($(this).parent())

  $(document).on "click", ".snippet-inline-expander", ->
    if $(this).parent().siblings(".snippet-expander").hasClass 'snippet-inline-animated'
      manipulateContent($(this).parent(), true, true)
    else
      manipulateContent($(this).parent(), false, true)

manipulateContent = (element, animated, expand) ->
  content = $(element).text()
  index = $(element).data("index")
  moreText = $(element).siblings('.snippet-expander').data("expand") || "asdas"
  lessText = $(element).siblings(".snippet-expander").data("collapse") || "less"
  truncationLength = $(element).siblings('.snippet-expander').data("length") || 50
  speed = $(element).siblings('.snippet-expander').data("speed") || 20

  if animated and expand
    removeExpander(element)
    feedWords(element, truncationLength, textContents[index].split(" "), lessText, speed)
  else if expand
    removeExpander(element)
    $(element).text(textContents[index])
    appendCollapser(element, lessText)
  else if animated
    removeCollapser(element)
    feedWordsReverse(element, truncationLength, moreText, speed, index)
  else
    removeCollapser(element)
    truncateContent(element, truncationLength, moreText, index)

feedWords = (element, offset, words, label, speed) ->
  if offset >= words.length - 1
    appendCollapser(element, label)
    return
  setTimeout (->
    $(element).append(" " + words[offset + 1..(offset + speed)].join(" "))
    feedWords(element, offset + speed, words, label, speed)
  ), 1

feedWordsReverse = (element, limit, label, speed, index) ->
  words = $(element).text().split(" ")
  if words.length <= limit
    truncateContent(element, limit, label, index)
    return
  setTimeout (->
    reduced = words[0..-speed].join(" ")
    $(element).text(reduced)
    feedWordsReverse(element, limit, label, speed, index)
  ), 1

truncateContent = (element, truncationLength, label, index) ->
  content = $(element).text()
  $(element).text(textContents[index].split(" ")[0..truncationLength].join(" "))
  appendExpander(element, label)

appendExpander = (element, label) ->
  $(element).append("<span class='snippet-inline-expander'>... <a>(" + label + ")</a></span>")

appendCollapser = (element, label) ->
  $(element).append("<span class='snippet-inline-collapser'> <a>(" + label + ")</a></span>")

removeExpander = (element) ->
  $(element).find(".snippet-inline-expander").remove()

removeCollapser = (element) ->
  $(element).find(".snippet-inline-collapser").remove()
