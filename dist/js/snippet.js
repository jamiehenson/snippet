var appendCollapser, appendExpander, appendTag, feedWords, feedWordsReverse, initialiseSnippets, inlineCount, manipulateContent, removeCollapser, removeExpander, textContents, truncateContent;

textContents = [];

inlineCount = 0;

$(document).ready(function() {
  if ($(".snippet-box").length > 0) {
    initialiseSnippets();
    $(document).ajaxSuccess(function() {
      return initialiseSnippets();
    });
    return $('.snippet-expander').click(function() {
      var boxSize, element, openHeight;
      if ($(this).hasClass('open')) {
        $(this).removeClass('open').removeClass("open-fully").addClass('closed');
        $(this).siblings('.snippet-content').addClass('closed').removeClass('open');
        element = $(this);
        setTimeout((function() {
          return element.addClass("closed-fully");
        }), 500);
      } else {
        $(this).removeClass('closed').removeClass("closed-fully").addClass('open');
        $(this).siblings('.snippet-content').addClass('open').removeClass('closed');
        element = $(this);
        setTimeout((function() {
          return element.addClass("open-fully");
        }), 500);
      }
      openHeight = $(this).siblings('.snippet-content')[0].scrollHeight + 'px';
      boxSize = $(this).hasClass('open') ? openHeight : $(this).siblings('.snippet-content').css("max-height", "");
      $(this).siblings('.snippet-content').css('max-height', boxSize);
      if ($(this).hasClass("snippet-shutter-horizontal")) {
        return $(this).toggleClass("initial");
      }
    });
  }
});

initialiseSnippets = function() {
  $('.snippet-content:not(.processed)').each(function() {
    var expander, initialHeight, initialWidth;
    $(this).addClass("processed");
    expander = $(this).siblings('.snippet-expander');
    initialHeight = $(this).css("max-height");
    initialWidth = $(this).css("width");
    if (expander.hasClass('snippet-inline') || expander.hasClass('snippet-inline-animated')) {
      $(this).data("index", inlineCount);
      inlineCount++;
      $(this).css("max-height", "initial");
      textContents.push($(this).html());
      return manipulateContent(this);
    } else if (expander.hasClass("snippet-reveal")) {
      return expander.css("line-height", initialHeight);
    } else {
      if ($(this)[0].scrollHeight <= parseInt($(this).css('max-height')) + 10) {
        expander.hide();
      }
      $(this).siblings('.snippet-shutter-vertical').css("border-width", parseInt(initialHeight) / 2 + " 0 ");
      $(this).siblings('.snippet-shutter-horizontal').css("border-width", " 0 " + parseInt(initialWidth) / 2);
      $(this).siblings('.snippet-shutter-horizontal').css("padding-top", parseInt(initialHeight) / 2);
      return expander.addClass("closed-fully");
    }
  });
  $(document).on("click", ".snippet-inline-collapser", function() {
    if ($(this).parents(".snippet-content").siblings(".snippet-expander").hasClass('snippet-inline-animated')) {
      return manipulateContent($(this).parents(".snippet-content"), true);
    } else {
      return manipulateContent($(this).parents(".snippet-content"));
    }
  });
  return $(document).on("click", ".snippet-inline-expander", function() {
    if ($(this).parents(".snippet-content").siblings(".snippet-expander").hasClass('snippet-inline-animated')) {
      return manipulateContent($(this).parents(".snippet-content"), true, true);
    } else {
      return manipulateContent($(this).parents(".snippet-content"), false, true);
    }
  });
};

manipulateContent = function(element, animated, expand) {
  var content, index, lessText, moreText, speed, truncationLength;
  content = $(element).text();
  index = $(element).data("index");
  moreText = $(element).siblings('.snippet-expander').attr("data-expand") || "more";
  lessText = $(element).siblings(".snippet-expander").attr("data-collapse") || "less";
  truncationLength = parseInt($(element).siblings('.snippet-expander').attr("data-length")) || 50;
  speed = parseInt($(element).siblings('.snippet-expander').attr("data-speed")) || 20;
  if (content.split(" ").length <= truncationLength) {
    return;
  }
  if (animated && expand) {
    removeExpander(element);
    $(element).html("");
    return feedWords(element, 0, textContents[index].split(" "), lessText, speed);
  } else if (expand) {
    removeExpander(element);
    $(element).html(textContents[index]);
    return appendCollapser(element, lessText);
  } else if (animated) {
    removeCollapser(element);
    return feedWordsReverse(element, truncationLength, moreText, speed, index);
  } else {
    removeCollapser(element);
    return truncateContent(element, truncationLength, moreText, index);
  }
};

feedWords = function(element, offset, words, label, speed) {
  if (offset >= words.length - 1) {
    appendCollapser(element, label);
    return;
  }
  return setTimeout((function() {
    $(element).html($(element).html() + " " + words.slice(offset, +(offset + speed) + 1 || 9e9).join(" "));
    return feedWords(element, offset + speed, words, label, speed);
  }), 1);
};

feedWordsReverse = function(element, limit, label, speed, index) {
  var words;
  words = $(element).text().split(" ");
  if (words.length <= limit) {
    truncateContent(element, limit, label, index);
    return;
  }
  return setTimeout((function() {
    var reduced;
    reduced = words.slice(0, +(-speed) + 1 || 9e9).join(" ");
    $(element).text(reduced);
    return feedWordsReverse(element, limit, label, speed, index);
  }), 1);
};

truncateContent = function(element, truncationLength, label, index) {
  $(element).html(textContents[index].split(" ").slice(0, +truncationLength + 1 || 9e9).join(" "));
  return appendExpander(element, label);
};

appendExpander = function(element, label) {
  return appendTag(element, label, "<span class='snippet-inline-expander'>... <a>(" + label + ")</a></span>");
};

appendCollapser = function(element, label) {
  return appendTag(element, label, "<span class='snippet-inline-collapser'> <a>(" + label + ")</a></span>");
};

appendTag = function(element, label, tag) {
  var content, lastTag;
  content = $(element).html();
  lastTag = content.lastIndexOf("<");
  if (lastTag === -1) {
    return $(element).append(tag);
  } else {
    return $(element).html([content.slice(0, lastTag), tag, content.slice(lastTag)].join(''));
  }
};

removeExpander = function(element) {
  return $(element).find(".snippet-inline-expander").remove();
};

removeCollapser = function(element) {
  return $(element).find(".snippet-inline-collapser").remove();
};
