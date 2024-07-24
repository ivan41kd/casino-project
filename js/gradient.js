$(document).ready(function () {
  $(window).scroll(function () {
    $('.main__gradient').css('opacity', 0 + $(window).scrollTop() / 2500);
  });
});
