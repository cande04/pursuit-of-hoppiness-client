import React, { Component } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'
import axios from 'axios'

class Beer extends Component {
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
      deleted: false
    }
  }

  deleteBeer = () => {
    axios({
      url: `${apiUrl}/beers/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .then(() => this.props.alert('deleted successfully!', 'success'))
      .catch(console.error)
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

  render () {
    const { beer, deleted } = this.state
    const { user } = this.props

    if (deleted) {
      return (<Redirect to="/beers" />)
    }

    const ownerButtons = (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button variant="light" className="btn-sm btn-outline-danger mr-2" onClick={this.deleteBeer}>delete</Button>
        <Link to={`/beers/${this.props.match.params.id}/update`}>
          <Button variant="light" className="btn-sm btn-outline-dark">edit</Button>
        </Link>
      </div>
    )

    return (
      <div xs="12" sm="12" md="8" lg="6">
        <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>{beer.name}</h3>
        <h4 style={{ fontWeight: 'bold', textAlign: 'center' }}>style:</h4>
        <h5 style={{ textAlign: 'center' }}>{beer.style}</h5>
        <h4 style={{ fontWeight: 'bold', textAlign: 'center' }}>brewery:</h4>
        <h5 style={{ textAlign: 'center' }}>{beer.brewery}</h5>
        <h5 style={{ textAlign: 'center' }}>{beer.brewery_location}</h5>
        <h4 style={{ fontWeight: 'bold', textAlign: 'center' }}>abv:</h4>
        <h5 style={{ textAlign: 'center' }}>{beer.abv}</h5>
        <h4 style={{ fontWeight: 'bold', textAlign: 'center' }}>description:</h4>
        <h5 style={{ textAlign: 'center' }}>{beer.description}</h5>
        <h4 style={{ fontWeight: 'bold', textAlign: 'center' }}>rating:</h4>
        <h5 style={{ textAlign: 'center' }}>{beer.rating}</h5>
        <h4 style={{ fontWeight: 'bold', textAlign: 'center' }}>review:</h4>
        <h5 style={{ textAlign: 'center' }}>{beer.review}</h5>
        {user && user._id === beer.owner ? ownerButtons : <p style={{ textAlign: 'center' }}>{user ? 'not your beer to edit!' : 'sign in to edit your beers!'}</p> }
        <Link to="/beers" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button variant="light" className="btn-sm btn-outline-dark">back to beer</Button>
        </Link>
      </div>
    )
  }
}

export default withRouter(Beer)
