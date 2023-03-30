/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('.write-new-tweet').submit(function(event) {
    event.preventDefault();
    const newTweet = $(this).serialize();
    console.log(newTweet);
    $.post("/tweets/", newTweet);
  });

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

  const createTweetElement = function(data) {
    const $tweet = $(`<article class="tweet">
    <script src="./scripts/hover.js"></script>
    <header class="tweet-header">
    <img class="tweet-header" src=${data.user.avatars}>
    <h4>${data.user.name}</h4><p class="handle">${data.user.handle}</p>
    </header>
    <p class="posted-tweet">${data.content.text}</p>
    <footer class="posted-tweet">
    ${data.created_at}
    <div class="tweet-reactions">
    <i class="fa-solid fa-flag"></i>
    <script src="./scripts/hover.js"></script>
    <i class="fa-solid fa-retweet"></i>
    <script src="./scripts/hover.js"></script>
    <i class="fa-solid fa-heart"></i>
    <script src="./scripts/hover.js"></script>
    </div>
    </footer>
    </article>`);
    return $tweet;
  };

  const renderTweets = function(tweets) {
    // loops through tweets
    tweets.forEach(tweet => {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweet-container').append($tweet);
    });
  };

  // render tweets inside loading tweets
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(data) {
        renderTweets(data);;
      });
  };

  loadTweets();

});