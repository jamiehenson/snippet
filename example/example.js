var style = ["pulldown", "reveal", "shutter-vertical", "shutter-horizontal", "inline", "inline-animated"];
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

  $( "#length" ).keyup(function() {
    $(".snippet-expander").attr("data-length", $(this).val());
    redoCodebox();
  });

  $( "#speed" ).keyup(function() {
    $(".snippet-expander").attr("data-speed", $(this).val());
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
        $('.snippet-expander').css("line-height", initialHeight);
      } else if (variant == "shutter-horizontal") {
        $('.snippet-expander').css("line-height", "initial");
      }

      if (variant == "reveal") {
        $('.snippet-expander').removeClass("initial");
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

      if (variant == "inline" || variant == "inline-animated") {
        $(".demo-wrapper-inline").show();
        $(".demo-wrapper").hide();
        $(".style-group").addClass("col-xs-12").removeClass("col-xs-6").removeClass("col-sm-4")
        $(".alignment-group").hide();
        $(".colour-group").hide();
        $(".size-group").hide();
        $(".tint-group").hide();
        $(".height-field").hide();
        $(".length-field").show();
        $(".speed-field").show();
      } else {
        $(".demo-wrapper").show();
        $(".demo-wrapper-inline").hide();
        $(".style-group").addClass("col-xs-6").addClass("col-sm-4").removeClass("col-xs-12")
        $(".alignment-group").show();
        $(".colour-group").show();
        $(".size-group").show();
        $(".tint-group").show();
        $(".height-field").show();
        $(".length-field").hide();
        $(".speed-field").hide();
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
    "\' data-length=\'" + $(".snippet-expander").attr("data-length") +
    "\' data-speed=\'" + $(".snippet-expander").attr("data-speed") +
    "\'></div>" +
    "\n</div>"
  );
}
