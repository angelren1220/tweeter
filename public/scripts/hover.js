$(document).ready(function() {
  // hover for new tweet
  $('article').mouseover(function() {
    const article = $(this);
    article.addClass('article-hover');
  });
  $('article').mouseout(function() {
    const article = $(this);
    article.removeClass('article-hover');
  });

  // hover of tweet reaction icons
  $('i').mouseover(function() {
    const icon = $(this);
    icon.addClass('icon-hover');
  });
  $('i').mouseout(function() {
    const icon = $(this);
    icon.removeClass('icon-hover');
  });

});