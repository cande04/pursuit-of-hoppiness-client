import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import apiUrl from '../../apiConfig'
import BeerForm from '../shared/BeerForm'
import axios from 'axios'

class UpdateBeer extends Component {
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
      updated: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/beers/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => this.setState({ beer: res.data.beer }))
      .catch(console.error)
  }

  handleChange = event => {
    this.setState({
      beer: {
        ...this.state.beer,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/beers/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        beer: this.state.beer
      }
    })
      // .then(() => this.props.history.push(`/beers/${this.state.beer.id}`))
      .then(res => this.setState({ updated: true }))
      .then(() => this.props.alert('updated successfully!', 'success'))
      .catch(console.error)
  }

  render () {
    const { beer, updated } = this.state

    if (updated) {
      return (<Redirect to={
        {
          pathname: `/beers/${this.props.match.params.id}`
        }
      } />)
    }

    return (
      <BeerForm
        beer={beer}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        cancelPath={`/beers/${this.props.match.params.id}`}
      />
    )
  }
}

export default withRouter(UpdateBeer)
