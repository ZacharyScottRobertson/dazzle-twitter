const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')
const isReply = require('../helpers/isReply')

const param = config.twitterConfig
//const queryString = unique(param.queryString.split(','))

const bot = new Twit(config.twitterKeys)

const retweet = () => {
  const query = '#MedicalMarijuana, #Cannabis, #LegalizedCannabis, #CannabisNews, #Cannabiz, #Cannabizness, #Marijuana, #MMJ, #CBD, #CannabisLaw, #Hemp, #CannabisBusiness, #Dispensary'

  bot.get(
    'search/tweets',
    {
      q: query,
      result_type: 'popular',
      lang: param.language,
      filter: 'safe',
      count: param.searchCount
    },
    (err, data, response) => {
      if (err) {
        console.lol('ERRORDERP: Cannot Search Tweet!, Description here: ', err)
      } else {
        // grab random tweet ID to retweet - desired range for random number is [0..data.statuses.length-1]
        const rando = Math.floor(Math.random() * data.statuses.length)
        let retweetId

        if (!isReply(data.statuses[rando])) {
          retweetId = data.statuses[rando].id_str
        }

        bot.post(
          'statuses/retweet/:id',
          {
            id: retweetId
          },
          (err, response) => {
            if (err) {
              console.lol('ERRORDERP: Retweet!')
            }
            console.lol(
              'SUCCESS: RT: ',
              data.statuses[rando].text,
              'RANDO ID: ',
              rando
            )
          }
        )
      }
    }
  )
}

module.exports = retweet
