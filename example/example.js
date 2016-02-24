$(document).ready(function() {
  var colour = ["default", "primary", "success", "warning", "danger"]
  var size = ["xs", "sm", "md", "lg"]

  $('.demo').click(function() {
    var classes = $(this).attr('class').split(' ')
    var variant = classes.pop();
    var type = classes.pop();
    var excluded = $.map($(eval(type)).not([variant]), function(value, index) {
      return ["snippet-" + value];
    });

    $(".snippet-expander").removeClass(excluded.join(" ")).addClass("snippet-" + variant)
    $(".codebox").text("<div class=\'" + $(".snippet-expander").attr('class') + "\'></div>");
  });
});
