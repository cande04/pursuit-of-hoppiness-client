import React, { useEffect, useState } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { withSnackbar } from 'notistack'

import apiUrl from '../../apiConfig'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'

const BeerList = props => {
  const [beer, setBeer] = useState({})
  const [deleted, setDeleted] = useState(false)

  const deleteBeer = () => {
    const { enqueueSnackbar } = props

    axios({
      url: `${apiUrl}/beers/${props.beer}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => enqueueSnackbar('deleted successfully!', 'success'))
      .catch(console.error)
  }

  useEffect(() => {
    axios({
      url: `${apiUrl}/beers/${props.beer}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setBeer(res.data.beer))
      .catch(console.error)
  }, [])

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

  const [expanded, setExpanded] = React.useState(false)
  const classes = useStyles()

  function handleExpandClick (event) {
    setExpanded(!expanded)
  }

  const ownerButtons = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Button variant="light" className="btn-sm btn-outline-danger mr-2" onClick={deleteBeer}>delete</Button>
      <Link to={`/beers/${beer.id}/update`}>
        <Button variant="light" className="btn-sm btn-outline-dark">edit</Button>
      </Link>
    </div>
  )

  if (deleted) {
    return (<Redirect to="/" />)
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        title={beer.name}
        subheader={beer.brewery}
      />
      <CardContent>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Rating:</Typography>
          <Rating value={beer.rating} readOnly />
        </Box>
        <Typography variant="body2" color="textSecondary" component="p">
          {beer.review}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Add to favorites">
          {beer.abv}
        </IconButton>
        <IconButton
          id={beer.id}
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="view more details"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Style:</Typography>
          <Typography paragraph>
            {beer.style}
          </Typography>
          <Typography paragraph>
            {beer.description}
          </Typography>
        </CardContent>
        <CardActions>
          {ownerButtons}
        </CardActions>
      </Collapse>
    </Card>
  )
}

export default withSnackbar(withRouter(BeerList))
