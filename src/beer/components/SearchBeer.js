import React, { Component } from 'react'

import BeerSearchForm from '../shared/BeerSearchForm.js'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class SearchBeer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchBeer: '',
      beerResults: []
    }
  }

  handleChange = event => {
    const updatedField =
    { [event.target.name]: event.target.value }

    const newSearch = Object.assign(this.state, updatedField)

    this.setState({ searchBeer: newSearch })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/search-beer`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { searchBeer: this.state.searchBeer }
    })
      .then(res => {
        console.log(res.data.data)
        this.setState({ beerResults: res.data.data })
      })
      .then(() => this.props.alert('you created a new beer!', 'success'))
      .catch(console.error)
  }

  render () {
    const { searchBeer, beerResults } = this.state

    const beerResultsList = beerResults.map((beer, index) => {
      return (
        <li key={index}>
          {beer.name}
          {beer.description}
        </li>
      )
    })

    if (beerResults.length !== 0) {
      return (
        <div>
          <ul>
            {beerResultsList}
          </ul>
        </div>
      )
    }

    return (
      <BeerSearchForm
        beer={searchBeer}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        cancelPath="/beers"
      />
    )
  }
}

export default SearchBeer
