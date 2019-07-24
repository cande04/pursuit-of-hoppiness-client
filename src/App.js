import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import Beers from './beer/components/Beers.js'
import CreateBeer from './beer/components/CreateBeer.js'
import Beer from './beer/components/Beer.js'
import UpdateBeer from './beer/components/UpdateBeer.js'
import SearchBeer from './beer/components/SearchBeer.js'
import CreateKnownBeer from './beer/components/CreateKnownBeer.js'

import Breweries from './breweries/components/Breweries.js'
import CreateBrewery from './breweries/components/CreateBrewery.js'
import Brewery from './breweries/components/Brewery.js'
import UpdateBrewery from './breweries/components/UpdateBrewery.js'
import SearchBreweries from './breweries/components/SearchBreweries.js'
import CreateKnownBrewery from './breweries/components/CreateKnownBrewery.js'
import BreweriesByRating from './breweries/components/BreweriesByRating.js'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  render () {
    const { user } = this.state

    return (
      <SnackbarProvider maxSnack={3}>
        <Header user={user} />

        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/beers' render={() => (
            <Beers alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/beers/:id' render={() => (
            <Beer alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/beers-create' render={() => (
            <CreateBeer alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/beers/:id/update' render={() => (
            <UpdateBeer alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/search-beer' render={() => (
            <SearchBeer alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/beers-known-create' render={() => (
            <CreateKnownBeer alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/breweries' render={() => (
            <Breweries alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/breweries/:id' render={() => (
            <Brewery alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/brewery-create' render={() => (
            <CreateBrewery alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/breweries/:id/update' render={() => (
            <UpdateBrewery alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/search-breweries' render={() => (
            <SearchBreweries alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/breweries-known-create' render={() => (
            <CreateKnownBrewery alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/breweries-by-rating' render={() => (
            <BreweriesByRating alert={this.alert} user={user} />
          )} />

        </main>
      </SnackbarProvider>
    )
  }
}

export default App
