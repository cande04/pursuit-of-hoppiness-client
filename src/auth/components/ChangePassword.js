import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import { changePassword } from '../api'
import messages from '../messages'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = {
  paper: {
    maxWidth: '600px',
    padding: '2rem',
    margin: '2rem auto'
  }
}

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { enqueueSnackbar, history, user } = this.props

    changePassword(this.state, user)
      .then(() => enqueueSnackbar(messages.changePasswordSuccess, { variant: 'success' }))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ oldPassword: '', newPassword: '' })
        enqueueSnackbar(messages.changePasswordFailure, { variant: 'danger' })
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <div >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={styles.paper}>
              <form onSubmit={this.onChangePassword}>
                <h3>Change Password</h3>
                <TextField
                  required
                  type="password"
                  name="oldPassword"
                  value={oldPassword}
                  placeholder="Old Password"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <TextField InputLabelProps= {{ shrink: true }}
                  required
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  placeholder="New Password"
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <Button variant="outlined" color="default" type="submit">
                  Change Password
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withSnackbar(withRouter(ChangePassword))
