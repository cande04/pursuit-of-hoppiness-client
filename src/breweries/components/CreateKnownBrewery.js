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

class CreateKnownBrewery extends Component {
  constructor () {
    super()

    this.state = {
      brewery: {
        name: '',
        location: '',
        image_url: '',
        rating: 0,
        review: ''
      },
      createdBreweryId: null
    }
  }

  componentDidMount () {
    console.log(this.props)
    axios({
      url: `${apiUrl}/get-brewery`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        breweryId: this.props.location.brewery
      }
    })
      .then(res => this.setState({
        brewery: {
          ...res.data,
          name: res.data.name,
          location: `${res.data.location.address1} ${res.data.location.city}, ${res.data.location.state} ${res.data.location.zip_code}`,
          image_url: res.data.image_url,
          rating: 0
        }
      })
      )
      .then(() => console.log(this.state))
      .catch(console.error)
  }

  handleChange = (event, newValue) => {
    this.setState({
      brewery: {
        ...this.state.brewery,
        [event.target.name]: event.target.value,
        rating: newValue
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { enqueueSnackbar } = this.props
    console.log(this.state.brewery)

    axios({
      url: `${apiUrl}/breweries`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { brewery: this.state.brewery }
    })
      .then(res => this.setState({ createdBreweryId: res.data.brewery.id }))
      .then(() => enqueueSnackbar('you created a new brewery!', { variant: 'success' }))
      .catch(console.error)
  }

  render () {
    const { brewery, createdBreweryId } = this.state
    console.log(brewery)

    if (createdBreweryId) {
      return (<Redirect to={`/breweries/${createdBreweryId}`} />)
    }

    return (
      <div >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={styles.paper}>
              <form onSubmit={this.handleSubmit}>
                <h3>Rate your Brewery</h3>
                <TextField
                  required
                  type="text"
                  name="name"
                  value={brewery.name}
                  placeholder="name"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <TextField InputLabelProps= {{ shrink: true }}
                  required
                  type="text"
                  name="location"
                  value={brewery.location}
                  placeholder="location"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <TextField InputLabelProps= {{ shrink: true }}
                  required
                  type="text"
                  name="review"
                  value={brewery.review}
                  placeholder="review"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Rating:</Typography>
                  <Rating
                    name="simple-controlled"
                    value={brewery.rating}
                    onChange={this.handleChange}
                  />
                </Box>
                <Button variant="contained" color="primary" type="submit">
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

export default withSnackbar(withRouter(CreateKnownBrewery))
