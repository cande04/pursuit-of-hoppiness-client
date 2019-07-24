import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'

import BrewerySearchForm from '../shared/BrewerySearchForm.js'
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

const SearchBreweries = props => {
  const [searchBreweries, setSearchBreweries] = useState('')
  const [breweriesResults, setBreweriesResults] = useState([])
  const [noBreweries, setNoBreweries] = useState(null)

  const handleChange = event => {
    event.persist()
    setSearchBreweries(brewery => ({ [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(searchBreweries)
    axios({
      url: `${apiUrl}/search-breweries`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { searchBreweries }
    })
      .then(res => {
        console.log(res.data.businesses)
        if (res.data.businesses !== 0) {
          setBreweriesResults(res.data.businesses)
          setNoBreweries(false)
        } else {
          setNoBreweries(true)
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

  if (noBreweries === true) {
    return (
      <p>doesnt exist in databse</p>
    )
  }

  if (noBreweries === false) {
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
              {breweriesResults.map(brewery =>
                <div key={brewery.id}>
                  <h2>{brewery.name}</h2>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="brewery label"
                        height="140"
                        image={brewery.image_url}
                        title="brewery label"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {brewery.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {brewery.location.address1} {brewery.location.city}, {brewery.location.state} {brewery.location.zip_code}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Link size="small" color="primary" component={Button} to={{
                        pathname: '/breweries-known-create',
                        brewery: brewery.id
                      }}>
                        Rate this Brewery
                      </Link>
                      <Typography gutterBottom component="h5">
                        {brewery.display_phone}
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
    <BrewerySearchForm
      brewery={searchBreweries}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      cancelPath="/breweries"
    />
  )
}

export default withRouter(SearchBreweries)
