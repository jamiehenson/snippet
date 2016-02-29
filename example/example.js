var style = ["pulldown", "reveal"];
var colour = ["text", "default", "primary", "success", "warning", "danger"];
var size = ["xs", "sm", "md", "lg"];
var align = ["left", "center", "right", "full"];
var tint = ["tint-dark", "tint-light"];

$(document).ready(function() {
  redoCodebox();
  initialHeight = $('.snippet-content').css("max-height");

  $( "#exampletext" ).keyup(function() {
    $(".snippet-content").text($("#exampletext").val());
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

  $('.demo').click(function() {
    var classes = $(this).attr('class').split(' ')
    var variant = classes.pop();
    var type = classes.pop();
    $(this).addClass("active")
    var excluded = $.map($(eval(type)).not([variant]), function(value, index) {
      $(".demo." + type + "." + value).removeClass("active")
      return ["snippet-" + value];
    });

    if (type == "tint") {
      if (variant == "tint-dark") {
        $(".well").css("background-color", "#333");
        $(".snippet-box").css("color", "white");
      } else {
        $(".well").css("background-color", "#f5f5f5");
        $(".snippet-box").css("color", "#333");
      }
    }

    if (variant == "reveal") {
      $('.snippet-expander').removeClass("initial");
    } else {
      $('.snippet-expander').addClass("initial")
    }

    $(".snippet-expander").removeClass(excluded.join(" ")).addClass("snippet-" + variant)
    redoCodebox();
  });
});

function redoCodebox() {
  $(".codebox").text("<div class=\'" + $(".snippet-expander").attr('class') +
    "\' data-expand=\'" + $(".snippet-expander").attr("data-expand") +
    "\' data-collapse=\'" + $(".snippet-expander").attr("data-collapse") +
    "\'></div>");
}
