$('article').mouseover(function() {
  const article = $(this);
  article.css('box-shadow', '12px 12px 2px 1px #d8d8f0');
});
$('article').mouseout(function() {
  const article = $(this);
  article.css('box-shadow', 'none');
});
