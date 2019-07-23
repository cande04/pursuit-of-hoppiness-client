import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'

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

  const handleChange = event => {
    event.persist()
    setSearchBeer(beer => ({ [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    console.log(searchBeer)

    axios({
      url: `${apiUrl}/search-beer`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { searchBeer }
    })
      .then(res => {
        console.log(res.data.data)
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
      maxWidth: 800
    }
  }))

  const classes = useStyles()

  if (noBeer === true) {
    return (
      <p>doesnt exist in databse</p>
    )
  }

  if (noBeer === false) {
    return (
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}>
          <Grid item xs={12}>
            <Paper>
              {beerResults.map(beer =>
                <div key={beer.id}>
                  <h2>{beer.name}</h2>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="beer label"
                        height="140"
                        image={beer.name}
                        title="beer label"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {beer.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {beer.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Link size="small" color="primary" component={Button} to={{
                        pathname: '/beers-known-create',
                        beer: beer.id
                      }}>
                        Rate this Beer
                      </Link>
                      <Typography gutterBottom component="h5">
                        {beer.breweries[0].name}
                      </Typography>
                      <Button size="small" color="primary">
                        Learn More
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
