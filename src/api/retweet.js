const Twit = require('twit')

const config = require('../config')


const param = config.twitterConfig
//const queryString = unique(param.queryString.split(','))

const Twitter = new Twit(config.twitterKeys)

var retweet = function() {
  var params = {
      q: '#MMJ, #CBD',  // REQUIRED
      result_type: 'recent',
      lang: 'en'
  }
  // for more parametes, see: https://dev.twitter.com/rest/reference/get/search/tweets

  Twitter.get('search/tweets', params, function(err, data) {
    // if there no errors
      if (!err) {
        // grab ID of tweet to retweet
          var retweetId = data.statuses[0].id_str;
          // Tell TWITTER to retweet
          Twitter.post('statuses/retweet/:id', {
              id: retweetId
          }, function(err, response) {
              if (response) {
                  console.log('Retweeted!!!');
              }
              // if there was an error while tweeting
              if (err) {
                  console.log('Something went wrong while RETWEETING... Duplication maybe...');
              }
          });
      }
      // if unable to Search a tweet
      else {
        console.log('Something went wrong while SEARCHING...', err);
      }
});
}

module.exports = retweet
