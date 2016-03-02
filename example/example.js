var style = ["pulldown", "reveal", "shutter-vertical", "shutter-horizontal"];
var colour = ["text", "default", "primary", "success", "warning", "danger"];
var size = ["xs", "sm", "md", "lg"];
var align = ["left", "center", "right", "full"];
var tint = ["tint-dark", "tint-light", "tint-solid"];

$(document).ready(function() {
  redoCodebox();

  var initialHeight = $('.snippet-content').css("max-height");
  var initialWidth = $('.snippet-content').css("width");

  $.each($(".snippet-expander").attr("class").split(" "), function (index, variant) {
    $(".demo." + variant.split("snippet-")[1]).addClass("active");
  });

  $( "#exampletext" ).keyup(function() {
    $(".snippet-content").text($(this).val());
    redoCodebox();
  });

  $( "#expand" ).keyup(function() {
    $(".snippet-expander").attr("data-expand", $(this).val());
    redoCodebox();
  });

  $( "#collapse" ).keyup(function() {
    $(".snippet-expander").attr("data-collapse", $(this).val());
    redoCodebox();
  });

  $( "#box-height" ).keyup(function() {
    $(".snippet-content").css("max-height", $(this).val());
    $('.snippet-reveal').css("line-height", Math.min($(this).val(), (".snippet-content")[0].scrollHeight));
    redoCodebox();
  });

  $('.snippet-content').each(function() {
    if ($(this)[0].scrollHeight <= parseInt($(this).css('max-height')) + 10) {
      $(this).siblings('.snippet-expander').hide();
    }
    $(this).siblings('.snippet-shutter-vertical').css("border-width", parseInt(initialHeight) / 2 + " 0 ");
    $(this).siblings('.snippet-shutter-horizontal').css("border-width", " 0 " + parseInt(initialWidth) / 2);
  });

  $('.demo').click(function() {
    var classes = $(this).attr('class').split(' ')
    var variant = classes.pop();
    var type = classes.pop();
    $(this).addClass("active")
    var excluded = $.map($(eval(type)).not([variant]), function(value, index) {
      $(".demo." + type + "." + value).removeClass("active")
      return ["snippet-" + value];
    });

    if (type == "style") {
      if (variant == "reveal") {
        $('.snippet-expander').removeClass("initial");
        $('.snippet-expander').css("line-height", initialHeight);
      } else {
        $('.snippet-expander').addClass("initial")
      }

      if (variant == "shutter-vertical") {
        $('.snippet-expander').css("border-width", parseInt(initialHeight) / 2 + " 0 ");
      } else {
        $('.snippet-expander').css("border-width", " 0 " + parseInt(initialWidth) / 2);
      }

      if (variant == "shutter-horizontal") {
        $('.snippet-expander').css("padding-top", parseInt(initialHeight) / 2);
      } else {
        $('.snippet-expander').css("padding-top", "0px");
      }
    }

    $(".snippet-expander").removeClass(excluded.join(" ")).addClass("snippet-" + variant)
    redoCodebox();
  });
});

function redoCodebox() {
  $(".codebox").text(
    "<div class='snippet-box'>" +
    "\n\t<div class='snippet-content' style='max-height: " + $(".snippet-content").css("max-height") + ";'>...</div>" +
    "\n\t<div class=\'" + $(".snippet-expander").attr('class') +
    "\' data-expand=\'" + $(".snippet-expander").attr("data-expand") +
    "\' data-collapse=\'" + $(".snippet-expander").attr("data-collapse") +
    "\'></div>" +
    "\n</div>"
  );
}
