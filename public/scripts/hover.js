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

  // hover for tweet reaction icons
  $('i').mouseover(function() {
    const icon = $(this);
    icon.addClass('icon-hover');
  });
  $('i').mouseout(function() {
    const icon = $(this);
    icon.removeClass('icon-hover');
  });

  // hover for write toggle
  $('.write-toggle').mouseover(function() {
    const icon = $(this);
    icon.addClass('button-hover');
  });
  $('.write-toggle').mouseout(function() {
    const icon = $(this);
    icon.removeClass('button-hover');
  });

});