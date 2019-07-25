import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withSnackbar } from 'notistack'

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
        rating: 0,
        review: ''
      },
      createdBeerId: null
    }
  }

  // componentDidMount () {
  //   axios({
  //     url: `${apiUrl}/get-beer`,
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Token token=${this.props.user.token}`
  //     },
  //     data: {
  //       beer_id: this.props.state.beer.id
  //     }
  //   })
  //     .then(res => console.log(res))
  // }

  // handleChange = event => {
  //   const updatedField =
  //   { [event.target.name]: event.target.value }
  //
  //   const newBeer = Object.assign(this.state.beer, updatedField)
  //
  //   this.setState({ beer: newBeer })
  // }

  handleChange = (event, newValue) => {
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
      <BeerForm
        beer={beer}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        cancelPath="/beers"
      />
    )
  }
}

export default withSnackbar(CreateBeer)
