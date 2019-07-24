import React, { useState, useEffect } from 'react'

import axios from 'axios'
import apiUrl from '../../apiConfig'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import BreweryList from './BreweryList.js'

const BreweriesByRating = props => {
  const [breweries, setBreweries] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios({
      url: `${apiUrl}/breweries`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setBreweries(res.data.breweries))
      .catch(err => setError(err.message))
  }, [])

  if (error) {
    return <p>error: {error}</p>
  }

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
  }))

  const classes = useStyles()

  const sortedBreweries = breweries.sort((a, b) =>
    a.rating - b.rating).reverse()
  // console.log(sortedBreweries.reverse())

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
            {sortedBreweries.map(brewery => (
              <BreweryList key={brewery.id} user={props.user} brewery={brewery.id}/>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default BreweriesByRating
