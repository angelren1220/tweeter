/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // function to escape unsafe characters
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  // click to hide the new tweet text area
  $('.write-toggle').click(function() {
    $('.new-tweet').toggle('slow');
  });

  $('.write-new-tweet').submit(function(event) {
    event.preventDefault();
    let button = $('button');
    button.addClass('highlight');

    const newTweet = $(this).serialize();
    // const safeText = `<p>${escape(newTweet)}</p>`;
    // console.log(safeText);

    // do not let user submit empty string
    if (!newTweet.slice(5)) {
      return $('.validation1').slideDown().delay(1000).slideUp();
    }

    // do not let user submit string overlimit
    if (newTweet.slice(5).length > 140) {
      return $('.validation2').slideDown().delay(1000).slideUp();
    }

    $.post("/tweets", newTweet, loadTweets());

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
    const formattedTime = timeago.format(data.created_at);
    const $tweet = $(`<article class="tweet">
    <script src="./scripts/hover.js"></script>
    <header class="tweet-header">
    <img class="tweet-header" src=${data.user.avatars}>
    <h4>${data.user.name}</h4><p class="handle">${data.user.handle}</p>
    </header>
    <p class="posted-tweet">${data.content.text}</p>
    <footer class="posted-tweet">
    ${formattedTime}
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
        renderTweets(data);
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  loadTweets();

});