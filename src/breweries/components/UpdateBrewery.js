import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import apiUrl from '../../apiConfig'
import BreweryForm from '../shared/BreweryForm'
import axios from 'axios'

class UpdateBrewery extends Component {
  constructor (props) {
    super(props)

    this.state = {
      brewery: {
        name: '',
        location: '',
        rating: 0,
        review: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/breweries/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => this.setState({ brewery: res.data.brewery }))
      .catch(console.error)
  }

  handleChange = (event) => {
    this.setState({
      brewery: {
        ...this.state.brewery,
        [event.target.name]: event.target.value
      }
    })
  }

  handleRatingChange = (event, newValue) => {
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

    axios({
      url: `${apiUrl}/breweries/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        brewery: this.state.brewery
      }
    })
      // .then(() => this.props.history.push(`/beers/${this.state.beer.id}`))
      .then(res => this.setState({ updated: true }))
      .then(() => enqueueSnackbar('updated successfully!', { variant: 'success' }))
      .catch(console.error)
  }

  render () {
    const { brewery, updated } = this.state

    if (updated) {
      return (<Redirect to={
        {
          pathname: `/breweries/${this.props.match.params.id}`
        }
      } />)
    }

    return (
      <BreweryForm
        brewery={brewery}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        cancelPath={`/breweries/${this.props.match.params.id}`}
        handleRatingChange={this.handleRatingChange}
      />
    )
  }
}

export default withSnackbar(withRouter(UpdateBrewery))
