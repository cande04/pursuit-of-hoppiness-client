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

const BreweryList = props => {
  const [brewery, setBrewery] = useState({})
  const [deleted, setDeleted] = useState(false)

  const deleteBrewery = () => {
    const { enqueueSnackbar } = props

    axios({
      url: `${apiUrl}/breweries/${props.brewery}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => enqueueSnackbar('deleted successfully!', { variant: 'success' }))
      .catch(console.error)
  }

  useEffect(() => {
    axios({
      url: `${apiUrl}/breweries/${props.brewery}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setBrewery(res.data.brewery))
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
      <Button variant="light" className="btn-sm btn-outline-danger mr-2" onClick={deleteBrewery}>delete</Button>
      <Link to={`/breweries/${brewery.id}/update`}>
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
        title={brewery.name}
        subheader={brewery.location}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="h5">
          {brewery.rating}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {brewery.review}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          id={brewery.id}
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
          <p>something</p>
        </CardContent>
        <CardActions>
          {ownerButtons}
        </CardActions>
      </Collapse>
    </Card>
  )
}

export default withSnackbar(withRouter(BreweryList))
