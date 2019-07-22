import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import axios from 'axios'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import apiUrl from '../../apiConfig'

const styles = {
  paper: {
    maxWidth: '600px',
    padding: '2rem',
    margin: '2rem auto'
  }
}

class CreateKnownBeer extends Component {
  constructor () {
    super()

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

  componentDidMount () {
    axios({
      url: `${apiUrl}/get-beer`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        beer_id: this.props.beer.id
      }
    })
      .then(res => this.setState({ beer: res.data.beer }))
      .catch(console.error)
  }

  handleChange = event => this.setState({
    beer: {
      ...this.state.beer,
      [event.target.name]: event.target.value
    }
  })

  render () {
    const { email, password } = this.state

    return (
      <div >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={styles.paper}>
              <form onSubmit={this.onSignIn}>
                <h3>Rate your Beer</h3>
                <TextField
                  required
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <TextField InputLabelProps= {{ shrink: true }}
                  required
                  type="password"
                  name="password"
                  value={password}
                  placeholder="password"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <TextField InputLabelProps= {{ shrink: true }}
                  required
                  type="password"
                  name="password"
                  value={password}
                  placeholder="password"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <TextField InputLabelProps= {{ shrink: true }}
                  required
                  type="password"
                  name="password"
                  value={password}
                  placeholder="password"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <TextField InputLabelProps= {{ shrink: true }}
                  required
                  type="password"
                  name="password"
                  value={password}
                  placeholder="password"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <TextField InputLabelProps= {{ shrink: true }}
                  required
                  type="password"
                  name="password"
                  value={password}
                  placeholder="password"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <Button variant="contained" color="primary" type="submit">
                  sign in
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withSnackbar(withRouter(CreateKnownBeer))
