import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import BeerForm from '../shared/BeerForm.js'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class CreateBeer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      beer: {
        name: '',
        style: '',
        brewery: '',
        brewery_location: '',
        abv: '',
        description: '',
        rating: '',
        review: ''
      },
      createdBeerId: null
    }
  }

  handleChange = event => {
    const updatedField =
    { [event.target.name]: event.target.value }

    const newBeer = Object.assign(this.state.beer, updatedField)

    this.setState({ beer: newBeer })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/beers`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { beer: this.state.beer }
    })
      .then(res => this.setState({ createdBeerId: res.data.beer.id }))
      .then(() => this.props.alert('you created a new beer!', 'success'))
      .catch(console.error)
  }

  render () {
    const { beer, createdBeerId } = this.state

    if (createdBeerId) {
      return (<Redirect to={`/beers/${createdBeerId}`} />)
    }

    return (
      <BeerForm
        beer={beer}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        cancelPath="/beers"
      />
    )
  }
}

export default CreateBeer
