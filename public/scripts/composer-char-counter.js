$(document).ready(function() {
  // count chars input in new tweet
  $('textarea').keyup(function() {
    let characterCount = 140 - $(this).val().length;
    let count = $('output');
    count.text(characterCount);

    // if overeeds the text limit, it turns red
    if (characterCount < 0) {
      count.addClass('red');
    } else {
      count.removeClass('red');
    }
  });

});
