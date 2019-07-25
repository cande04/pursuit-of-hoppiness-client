import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import axios from 'axios'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import apiUrl from '../../apiConfig'

const styles = {
  paper: {
    maxWidth: '600px',
    padding: '2rem',
    margin: '2rem auto'
  }
}

class CreateKnownBeer extends Component {
  constructor () {
    super()

    this.state = {
      beer: {
        name: '',
        style: '',
        brewery: '',
        brewery_location: '',
        abv: '',
        description: '',
        rating: 0,
        review: ''
      },
      createdBeerId: null
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/get-beer`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        beer_id: this.props.location.beer
      }
    })
      .then(res => this.setState({
        beer: {
          ...res.data.data,
          brewery: res.data.data.breweries[0].name,
          brewery_location: res.data.data.breweries[0].locations[0].locality,
          style: res.data.data.style.name } }))
      .catch(console.error)
  }

  handleChange = (event) => this.setState({
    beer: {
      ...this.state.beer,
      [event.target.name]: event.target.value
    }
  })

  handleRatingChange = (event, newValue) => {
    this.setState({
      beer: {
        ...this.state.beer,
        [event.target.name]: event.target.value,
        rating: newValue
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { enqueueSnackbar } = this.props

    axios({
      url: `${apiUrl}/beers`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { beer: this.state.beer }
    })
      .then(res => this.setState({ createdBeerId: res.data.beer.id }))
      .then(() => enqueueSnackbar('you created a new beer!', { variant: 'success' }))
      .catch(console.error)
  }

  render () {
    const { beer, createdBeerId } = this.state

    if (createdBeerId) {
      return (<Redirect to={`/beers/${createdBeerId}`} />)
    }

    return (
      <div >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={styles.paper}>
              <form onSubmit={this.handleSubmit}>
                <h3>Rate your Beer</h3>
                <TextField
                  required
                  type="text"
                  name="name"
                  value={beer.name}
                  placeholder="name"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <TextField InputLabelProps= {{ shrink: true }}
                  required
                  type="text"
                  name="brewery"
                  value={beer.brewery}
                  placeholder="brewery"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <TextField InputLabelProps= {{ shrink: true }}
                  required
                  type="text"
                  name="brewery_location"
                  value={beer.brewery_location}
                  placeholder="brewery_location"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <TextField InputLabelProps= {{ shrink: true }}
                  required
                  type="text"
                  name="abv"
                  value={beer.abv}
                  placeholder="abv"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <TextField InputLabelProps= {{ shrink: true }}
                  required
                  type="text"
                  name="style"
                  value={beer.style}
                  placeholder="style"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <TextField InputLabelProps= {{ shrink: true }}
                  required
                  type="text"
                  name="review"
                  value={beer.review}
                  placeholder="review"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Rating:</Typography>
                  <Rating
                    name="rating"
                    value={beer.rating}
                    onChange={this.handleRatingChange}
                  />
                </Box>
                <Button variant="outlined" color="default" type="submit">
                  submit
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withSnackbar(withRouter(CreateKnownBeer))
