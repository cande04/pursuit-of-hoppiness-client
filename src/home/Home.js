import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = {
  paper: {
    maxWidth: '600px',
    padding: '2rem',
    margin: '30vh auto'
  }
}

const beerQuotes = [
  {
    quote: 'Milk is for babies. When you grow up you have to drink beer.',
    speaker: '– Arnold Schwarzenegger'
  },
  {
    quote: 'Some people wanted champagne and caviar when they should have had beer and hot dogs.',
    speaker: '– Dwight D. Eisenhower'
  },
  {
    quote: 'Not all chemicals are bad. Without chemicals such as hydrogen and oxygen, for example, there would be no way to make water, a vital ingredient in beer.',
    speaker: '– Dave Barry'
  },
  {
    quote: 'Beer, it’s the best drink in the world.',
    speaker: '– Jack Nicholson'
  },
  {
    quote: 'Beer makes you feel the way you ought to feel without beer.',
    speaker: '– Henry Lawson'
  },
  {
    quote: 'Give a man a beer, waste an hour. Teach a man to brew, and waste a lifetime!',
    speaker: '– Bill Owen'
  },
  {
    quote: 'Whiskey’s to tough, Champagne costs too much, Vodka puts my mouth in gear. I hope this refrain, Will help me explain, As a matter of fact, I like beer.',
    speaker: '– Tom T. Hall'
  },
  {
    quote: 'There is no such thing as a bad beer. It’s that some taste better than others.',
    speaker: '– Billy Carter'
  },
  {
    quote: 'I’m gaining weight the right way: I’m drinking beer.',
    speaker: '– Johnny Damon'
  },
  {
    quote: 'They who drink beer will think beer.',
    speaker: '– Washington Irving'
  },
  {
    quote: 'Beer is the Danish national drink, and the Danish national weakness is another beer.',
    speaker: '– Clementine Paddleford'
  },
  {
    quote: 'He was a wise man who invented beer.',
    speaker: '– Plato'
  },
  {
    quote: 'I have respect for beer.',
    speaker: '– Russell Crowe'
  },
  {
    quote: 'For a quart of Ale is a meal for a King.',
    speaker: '- William Shakespeare'
  },
  {
    quote: 'You can\'t be a real country unless you have a beer and an airline - it helps if you have some kind of a football team, or some nuclear weapons, but at the very least you need a beer.',
    speaker: '- Frank Zappa'
  },
  {
    quote: 'Without question, the greatest invention in the history of mankind is beer. Oh, I grant you that the wheel was also a fine invention, but the wheel does not go nearly as well with pizza.',
    speaker: '- Dave Barry'
  },
  {
    quote: '24 hours in a day, 24 beers in a case. Coincidence?',
    speaker: '- Stephen Wright'
  }
]

const Home = () => {
  const randomQuote = beerQuotes[Math.floor(Math.random() * beerQuotes.length)]
  return (
    <div>
      <Paper style={styles.paper}>
        <Typography variant="h5" component="h3">
          {randomQuote.quote}
        </Typography>
        <Typography component="p">
          {randomQuote.speaker}
        </Typography>
      </Paper>
    </div>
  )
}

export default Home
