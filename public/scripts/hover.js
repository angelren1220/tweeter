$(document).ready(function() {
  // hover for new tweet
  $('article').mouseover(function() {
    const article = $(this);
    article.css('box-shadow', '12px 12px 2px 1px #d8d8f0');
  });
  $('article').mouseout(function() {
    const article = $(this);
    article.css('box-shadow', 'none');
  });

  // hover of tweet reaction icons
  $('i').mouseover(function() {
    const icon = $(this);
    icon.css('color', '#d6a05e');
  });
  $('i').mouseout(function() {
    const icon = $(this);
    icon.css('color', '');
  });

});