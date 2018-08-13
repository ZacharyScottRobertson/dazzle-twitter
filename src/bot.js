const Twit = require('twit')

const config = require('./config.js')

const Twitter = new Twit(config.twitterKeys)

var retweet = function() {
  var params = {
      q: '#cannabis, #cbd, #mmj, #medicalmarijuana',  // REQUIRED
      result_type: 'recent',
      lang: 'en'
  }
  // for more parameters, see: https://dev.twitter.com/rest/reference/get/search/tweets

  Twitter.get('search/tweets', params, function(err, data) {
    // if there no errors
      if (!err) {
        var retweetId;
        // grab ID of tweet to retweet
        for (var i = 0; i < data.statuses.length; i++)
        {
          retweetId = data.statuses[i].id_str;
          console.log(data.statuses[i].id_str);
          Twitter.post('statuses/retweet/:id', {
            id: retweetId
        }, function(err, response) {
            if (response) {
                console.log('Retweeted!!!', response);
            }
            // if there was an error while tweeting
            if (err) {
                console.log('Something went wrong while RETWEETING... Duplication maybe...');
            }
        });
        }
        console.log(data.statuses.length);
          // Tell TWITTER to retweet

      }
      // if unable to Search a tweet
      else {
        console.log('Something went wrong while SEARCHING...', err);
      }
  });
}
// grab & retweet as soon as program is running...
retweet();
// retweet in every 60 minutes
setInterval(retweet, 3600000);

var favoriteTweet = function(){
  var params = {
    q: '#cannabis, #cbd, #mmj, #medicalmarijuana',  // REQUIRED
    result_type: 'recent',
    lang: 'en'
}
  // for more parameters, see: https://dev.twitter.com/rest/reference

  // find the tweet
  Twitter.get('search/tweets', params, function(err,data){

    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);   // pick a random tweet
    // console.log("THIS IS THE USER ID:", randomTweet.user);
    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      // Tell TWITTER to 'favorite'
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // if there was an error while 'favorite'
        if(err){
          console.log('CANNOT BE FAVORITE... Error');
        }
        else{
          console.log('FAVORITED... Success!!!');
        }
      });
      Twitter.post('friendships/create', {user_id: randomTweet.user.id_str}, function(err, response) {
        if(err){
          console.log('CANNOT ADD FRIEND', err)
        }
        else {
          console.log('FRIENDSHIP ADDED', response)
        }
      })
    }
  });
}
// grab & 'favorite' as soon as program is running...
favoriteTweet();
// 'favorite' a tweet in every 60 minutes
setInterval(favoriteTweet, 3600000);

// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};
