/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // click to hide the new tweet text area
  $('.write-toggle').click(function() {
    $('.new-tweet').toggle('slow');
    $('textarea').focus();
  });

  // click to scroll down to the bottom of the page
  $('.down').click(function() {
    $(window).scrollTop($(window).height());
  });

  // click to scroll up to the top of the page
  $('.up').click(function() {
    $(window).scrollTop(0);
  });

  // write a new tweet and post
  $('.write-new-tweet').submit(function(event) {
    event.preventDefault();

    // highlight the button
    let button = $('.tweet-button');
    button.addClass('highlight');


    let characterCount = $('textarea').val().length;
    // do not let user submit empty string
    if (!characterCount) {
      return $('.validation1').slideDown().delay(1000).slideUp();
    }

    // do not let user submit string overlimit
    if (characterCount > 140) {
      return $('.validation2').slideDown().delay(1000).slideUp();
    }
    // serialize the form
    const newTweet = $(this).serialize();

    // post the new tweet
    $.post("/tweets", newTweet, function() {
      // clear the text area
      $('textarea').val('');
      // reset the count
      $('output').text("140");
      // disable the button highlight
      button.removeClass('highlight');
      // reload the tweets
      loadTweets();
    });

    // clear textarea after post
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

  // escape unsafe input
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // create a new tweet element
  const createTweetElement = function(data) {
    const formattedTime = timeago.format(data.created_at);
    const $tweet = $(`<article class="tweet">
    <header class="tweet-header">
    <script type="text/javascript" src="/scripts/hover.js"></script>
    <div class="user-info">
    <img class="tweet-header" src=${data.user.avatars}>
    <h4>${data.user.name}</h4>
    </div>
    <div class="handle">${data.user.handle}</div>
    </header>
    <p class="posted-tweet">${escape(data.content.text)}</p>
    <footer class="posted-tweet">
    ${formattedTime}
    <div class="tweet-reactions">
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
    </div>
    </footer>
    </article>`);
    return $tweet;
  };

  // render all tweet elements
  const renderTweets = function(tweets) {
    // clear the previous container
    $('#tweet-container').empty();
    // loops through tweets
    tweets.forEach(tweet => {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and prepends it to the tweets container
      $('#tweet-container').prepend($tweet);
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