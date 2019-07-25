import React, { useEffect, useState } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { withSnackbar } from 'notistack'

import apiUrl from '../../apiConfig'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
// import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
// import Collapse from '@material-ui/core/Collapse'
// import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const Brewery = props => {
  const [brewery, setBrewery] = useState({})
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/breweries/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setBrewery(res.data.brewery))
      .catch(console.error)
  }, [])

  const deleteBrewery = () => {
    const { enqueueSnackbar } = props

    axios({
      url: `${apiUrl}/breweries/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => enqueueSnackbar('deleted successfully!', { variant: 'success' }))
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
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    },
    avatar: {
      backgroundColor: red[500]
    }
  }))

  // const [expanded, setExpanded] = React.useState(false)
  const classes = useStyles()

  // function handleExpandClick (event) {
  //   setExpanded(!expanded)
  // }

  const ownerButtons = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Button variant="outlined" color="default" onClick={deleteBrewery}>delete</Button>
      <Button variant="outlined" color="default" component={Link} to={`/breweries/${props.match.params.id}/update`}>edit</Button>
    </div>
  )

  if (deleted) {
    return (<Redirect to="/" />)
  }

  let image
  if (!brewery.image_url) {
    image = require('../beer_stock.jpg')
  } else {
    image = brewery.image_url
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Card className={classes.card}>
              <CardHeader
                title={brewery.name}
                subheader={brewery.location}
              />
              <CardMedia
                component="img"
                alt="brewery label"
                height="240"
                image={image}
                title="brewery label"
              />
              <CardContent>
                <Box borderColor="transparent" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="h6">Your Rating:</Typography>
                  <Rating value={brewery.rating} readOnly />
                </Box>
                <Typography variant="h5">
                  Your Review:
                </Typography>
                <Typography paragraph className={classes.pos}>
                  {brewery.review}
                </Typography>
                <CardActions style={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
                  {ownerButtons}
                </CardActions>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withSnackbar(withRouter(Brewery))
