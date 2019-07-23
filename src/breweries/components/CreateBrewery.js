import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import BreweryForm from '../shared/BreweryForm.js'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class CreateBrewery extends Component {
  constructor (props) {
    super(props)

    this.state = {
      brewery: {
        name: '',
        location: '',
        rating: '',
        review: ''
      },
      createdBreweryId: null
    }
  }

  handleChange = event => {
    this.setState({
      brewery: {
        ...this.state.brewery,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { enqueueSnackbar } = this.props

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

    if (createdBreweryId) {
      return (<Redirect to={`/breweries/${createdBreweryId}`} />)
    }

    return (
      <BreweryForm
        brewery={brewery}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        cancelPath="/breweries"
      />
    )
  }
}

export default withSnackbar(CreateBrewery)
