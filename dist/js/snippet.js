var appendCollapser, appendExpander, feedWords, feedWordsReverse, manipulateContent, removeCollapser, removeExpander, textContents, truncateContent;

textContents = [];

$(document).ready(function() {
  var initialHeight, initialWidth, inlineCount;
  initialHeight = $('.snippet-content').css("max-height");
  initialWidth = $('.snippet-content').css("width");
  $('.snippet-reveal').css("line-height", initialHeight);
  inlineCount = 0;
  $('.snippet-content').each(function() {
    var expander;
    expander = $(this).siblings('.snippet-expander');
    if (expander.hasClass('snippet-inline') || expander.hasClass('snippet-inline-animated')) {
      $(this).data("index", inlineCount);
      inlineCount++;
      $(this).css("max-height", "initial");
      textContents.push($(this).text());
      return manipulateContent(this);
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
  $('.snippet-expander').click(function() {
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
    boxSize = $(this).hasClass('open') ? openHeight : initialHeight;
    $(this).siblings('.snippet-content').css('max-height', boxSize);
    if ($(this).hasClass("snippet-reveal") || $(this).hasClass("snippet-shutter-horizontal")) {
      return $(this).toggleClass("initial");
    }
  });
  $(document).on("click", ".snippet-inline-collapser", function() {
    if ($(this).parent().siblings(".snippet-expander").hasClass('snippet-inline-animated')) {
      return manipulateContent($(this).parent(), true);
    } else {
      return manipulateContent($(this).parent());
    }
  });
  return $(document).on("click", ".snippet-inline-expander", function() {
    if ($(this).parent().siblings(".snippet-expander").hasClass('snippet-inline-animated')) {
      return manipulateContent($(this).parent(), true, true);
    } else {
      return manipulateContent($(this).parent(), false, true);
    }
  });
});

manipulateContent = function(element, animated, expand) {
  var content, index, lessText, moreText, speed, truncationLength;
  content = $(element).text();
  index = $(element).data("index");
  moreText = $(element).siblings('.snippet-expander').data("expand") || "more";
  lessText = $(element).siblings(".snippet-expander").data("collapse") || "less";
  truncationLength = $(element).siblings('.snippet-expander').data("length") || 50;
  speed = $(element).siblings('.snippet-expander').data("speed") || 20;
  if (animated && expand) {
    removeExpander(element);
    return feedWords(element, truncationLength, textContents[index].split(" "), lessText, speed);
  } else if (expand) {
    removeExpander(element);
    $(element).text(textContents[index]);
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
    $(element).append(" " + words.slice(offset + 1, +(offset + speed) + 1 || 9e9).join(" "));
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
  $(element).text(textContents[index].split(" ").slice(0, +truncationLength + 1 || 9e9).join(" "));
  return appendExpander(element, label);
};

appendExpander = function(element, label) {
  return $(element).append("<span class='snippet-inline-expander'>... <a>(" + label + ")</a></span>");
};

appendCollapser = function(element, label) {
  return $(element).append("<span class='snippet-inline-collapser'> <a>(" + label + ")</a></span>");
};

removeExpander = function(element) {
  return $(element).find(".snippet-inline-expander").remove();
};

removeCollapser = function(element) {
  return $(element).find(".snippet-inline-collapser").remove();
};
