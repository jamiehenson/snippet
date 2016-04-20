textContents = []

$(document).ready ->
  initialHeight = $('.snippet-content').css("max-height")
  initialWidth = $('.snippet-content').css("width")
  $('.snippet-reveal').css("line-height", initialHeight)
  inlineCount = 0

  $('.snippet-content').each ->
    expander = $(this).siblings('.snippet-expander')
    if expander.hasClass('snippet-inline') || expander.hasClass('snippet-inline-animated')
      $(this).data("index", inlineCount)
      inlineCount++
      $(this).css("max-height", "initial")
      textContents.push $(this).html()
      manipulateContent(this)
    else
      expander.hide() if $(this)[0].scrollHeight <= parseInt($(this).css('max-height')) + 10
      $(this).siblings('.snippet-shutter-vertical').css("border-width", parseInt(initialHeight) / 2 + " 0 ");
      $(this).siblings('.snippet-shutter-horizontal').css("border-width", " 0 " + parseInt(initialWidth) / 2);
      $(this).siblings('.snippet-shutter-horizontal').css("padding-top", parseInt(initialHeight) / 2);
      expander.addClass "closed-fully"

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

    if $(this).hasClass("snippet-shutter-horizontal")
      $(this).toggleClass "initial"

  $(document).on "click", ".snippet-inline-collapser", ->
    if $(this).parents(".snippet-content").siblings(".snippet-expander").hasClass 'snippet-inline-animated'
      manipulateContent($(this).parents(".snippet-content"), true)
    else
      manipulateContent($(this).parents(".snippet-content"))

  $(document).on "click", ".snippet-inline-expander", ->
    if $(this).parents(".snippet-content").siblings(".snippet-expander").hasClass 'snippet-inline-animated'
      manipulateContent($(this).parents(".snippet-content"), true, true)
    else
      manipulateContent($(this).parents(".snippet-content"), false, true)

manipulateContent = (element, animated, expand) ->
  content = $(element).text()
  index = $(element).data("index")
  moreText = $(element).siblings('.snippet-expander').attr("data-expand") || "more"
  lessText = $(element).siblings(".snippet-expander").attr("data-collapse") || "less"
  truncationLength = parseInt($(element).siblings('.snippet-expander').attr("data-length")) || 50
  speed = parseInt($(element).siblings('.snippet-expander').attr("data-speed")) || 20
  return if content.split(" ").length <= truncationLength

  if animated and expand
    removeExpander(element)
    $(element).html("")
    feedWords(element, 0, textContents[index].split(" "), lessText, speed)
  else if expand
    removeExpander(element)
    $(element).html(textContents[index])
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
    $(element).html($(element).html() + " " + words[offset..(offset + speed)].join(" "))
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
  $(element).html(textContents[index].split(" ")[0..truncationLength].join(" "))
  appendExpander(element, label)

appendExpander = (element, label) ->
  appendTag element, label, "<span class='snippet-inline-expander'>... <a>(" + label + ")</a></span>"

appendCollapser = (element, label) ->
  appendTag element, label, "<span class='snippet-inline-collapser'> <a>(" + label + ")</a></span>"

appendTag = (element, label, tag) ->
  content = $(element).html()
  lastTag = content.lastIndexOf("<")
  if lastTag == -1 then $(element).append tag else $(element).html [content.slice(0, lastTag), tag, content.slice(lastTag)].join('')

removeExpander = (element) ->
  $(element).find(".snippet-inline-expander").remove()

removeCollapser = (element) ->
  $(element).find(".snippet-inline-collapser").remove()
