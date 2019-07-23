import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import BeerList from './BeerList.js'

const Beers = props => {
  const [beers, setBeers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios({
      url: `${apiUrl}/beers`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setBeers(res.data.beers))
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
            {beers.map(beer => (
              <BeerList key={beer.id} user={props.user} beer={beer.id}/>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Beers
