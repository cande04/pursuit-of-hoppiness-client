import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import BreweryList from './BreweryList.js'

const Breweries = props => {
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

  const alphabeticalBreweries = breweries.sort(function (a, b) {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }

    return 0
  })

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <h4>View Breweries by Rating</h4>
        <Button variant="contained" color="primary" component={Link} to='/breweries-by-rating'>sort by rating</Button>
      </Paper>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}>
        <Grid item xs={12}>
          <Paper>
            {alphabeticalBreweries.map(brewery => (
              <BreweryList key={brewery.id} user={props.user} brewery={brewery.id}/>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Breweries
