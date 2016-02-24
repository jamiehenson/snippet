var colour = ["text", "default", "primary", "success", "warning", "danger"];
var size = ["xs", "sm", "md", "lg"];
var align = ["left", "center", "right", "full"];

$(document).ready(function() {
  redoCodebox();

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
    var excluded = $.map($(eval(type)).not([variant]), function(value, index) {
      return ["snippet-" + value];
    });

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
