import React, { useEffect, useState } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { withSnackbar } from 'notistack'

// import BeerRating from '../shared/BeerRating.js'
import apiUrl from '../../apiConfig'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
// import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
// import Collapse from '@material-ui/core/Collapse'
// import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const Beer = props => {
  const [beer, setBeer] = useState({})
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/beers/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setBeer(res.data.beer))
      .catch(console.error)
  }, [])

  const deleteBeer = () => {
    const { enqueueSnackbar } = props

    axios({
      url: `${apiUrl}/beers/${props.match.params.id}`,
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
      <Button variant="outlined" color="default" onClick={deleteBeer}>delete</Button>
      <Button variant="outlined" color="default" component={Link} to={`/beers/${props.match.params.id}/update`}>edit</Button>
    </div>
  )

  if (deleted) {
    return (<Redirect to="/" />)
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
                title={beer.name}
                subheader={beer.brewery}
              />
              <Divider />
              <CardContent>
                <Typography variant="h6" className={classes.pos}>Style:</Typography>
                <Typography paragraph className={classes.pos}>
                  {beer.style}
                </Typography>
                <Typography variant="h6">
                  Beer Description:
                </Typography>
                <Typography paragraph className={classes.pos}>
                  {beer.description}
                </Typography>
                <Typography variant="h6">
                  ABV:
                </Typography>
                <Typography paragraph className={classes.pos} >
                  {beer.abv}
                </Typography>
                <Typography variant="h6">
                  Your Review:
                </Typography>
                <Typography paragraph className={classes.pos} >
                  {beer.review}
                </Typography>
                <Box borderColor="transparent" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="h6">Your Rating:</Typography>
                  <Rating value={beer.rating} readOnly />
                </Box>
              </CardContent>
              <CardActions style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {ownerButtons}
              </CardActions>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withSnackbar(withRouter(Beer))
