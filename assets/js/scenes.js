$(document).ready(function() {
  $('.fire-scene').click(function(e) {
    var $context, duration, scene;
    $context = $(this);
    e.preventDefault();
    scene = $context.data('scene-id');
    duration = parseInt($context.data('duration'));
    $.ajax({
      url: "/scene/" + scene,
      success: function() {
        $('.fire-scene').addClass('disabled');
        setTimeout(function() {
          $('.fire-scene').removeClass('disabled');
        }, duration);
      },
      dataType: 'json'
    });
  });
});
