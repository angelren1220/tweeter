/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('.write-new-tweet').on('submit', function(event) {
    event.preventDefault();
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

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  renderTweets(data);

});