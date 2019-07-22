import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

import axios from 'axios'
import apiUrl from '../../apiConfig'

class Beers extends Component {
  constructor (props) {
    super(props)

    this.state = {
      beers: [],
      error: null,
      loaded: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/beers`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => this.setState({ beers: res.data.beers, loaded: true }))
      .catch(err => this.setState({ error: err.message }))
  }

  render () {
    const { beers, loaded, error } = this.state
    const { user } = this.props

    if (!loaded) {
      return <p>...loading...</p>
    }

    if (error) {
      return <p>error: {error}</p>
    }

    const beerList = beers.map(beer => (
      <ListGroup.Item
        key={beer.id}
        action
        as={Link}
        to={`/beers/${beer.id}`}
      >
        {beer.name}
      </ListGroup.Item>
    ))

    return (
      <div md="8" lg="6">
        <h2 className="d-flex justify-content-between" style={{ fontWeight: 'bold' }}>beers {user && <Button variant="light" className="btn-sm btn-outline-dark" href="#beers-create">add a beer</Button>}</h2>
        <ListGroup style={{ textAlign: 'center' }}>{beerList}</ListGroup>
      </div>
    )
  }
}

export default Beers
