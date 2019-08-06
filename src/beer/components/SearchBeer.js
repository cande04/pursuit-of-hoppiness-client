import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'

import BeerSearchForm from '../shared/BeerSearchForm.js'
import apiUrl from '../../apiConfig'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const SearchBeer = props => {
  const [searchBeer, setSearchBeer] = useState('')
  const [beerResults, setBeerResults] = useState([])
  const [noBeer, setNoBeer] = useState(null)

  const clearState = () => {
    setSearchBeer('')
    setBeerResults([])
    setNoBeer(null)
  }

  const handleChange = event => {
    event.persist()
    setSearchBeer(beer => ({ [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/search-beer`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { searchBeer }
    })
      .then(res => {
        if (res.data.totalResults !== 0) {
          setBeerResults(res.data.data)
          setNoBeer(false)
        } else {
          setNoBeer(true)
        }
      })
      .catch(console.error)
  }

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
    card: {
      maxWidth: 800,
      margin: 3
    }
  }))

  const classes = useStyles()

  if (noBeer === true) {
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <h3 style={{ fontFamily: 'Roboto' }}>{'Don\'t think we\'ve tried that one yet...'}</h3>
          <h3 style={{ fontFamily: 'Roboto' }}>Add it yourself!</h3>
          <Button variant="outlined" color="default" component={Link} to='/beers-create'>Add Beer</Button>
          <Button variant="outlined" colot="default" onClick={clearState}>back to search</Button>
        </Paper>
      </div>
    )
  }

  if (noBeer === false) {
    beerResults.map(beer => {
      if (beer.labels === undefined) {
        beer.image = require('../../breweries/beer_stock.jpg')
      } else {
        beer.image = beer.labels.large
      }
    })
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <h3>Dont see your beer? Try adding it yourself!</h3>
          <Button variant="outlined" color="default" component={Link} to='/beers-create'>add beer</Button>
          <Button variant="outlined" colot="default" onClick={clearState}>back to search</Button>
        </Paper>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}>
          <Grid item xs={12}>
            <Paper>
              {beerResults.map((beer, index) =>
                <div key={beer.id}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="beer label"
                        height="240"
                        image={beer.image}
                        title="beer label"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {beer.name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h4">
                          {beer.breweries[0].name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {beer.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button variant="outlined" color="default" component={Link} to={{
                        pathname: '/beers-known-create',
                        beer: beer.id
                      }}>
                        Rate this Beer
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }

  return (
    <BeerSearchForm
      beer={searchBeer}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      cancelPath="/beers"
    />
  )
}

export default withRouter(SearchBeer)
