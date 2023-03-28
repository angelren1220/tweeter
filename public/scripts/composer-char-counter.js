$(document).ready(function() {
  console.log("ready");
});

$('textarea').keyup(function() {
  let characterCount = 140 - $(this).val().length;
  let count = $('#count');
  count.text(characterCount);
  if (characterCount < 0) {
    count.css('color', '#9c0607');
  }
});
