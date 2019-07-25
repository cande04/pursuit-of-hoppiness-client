import React from 'react'
import { Link } from 'react-router-dom'

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

const BeerSearchForm = ({ searchBeer, handleChange, handleSubmit, cancelPath }) => (
  <div >
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper style={styles.paper}>
          <form onSubmit={handleSubmit}>
            <h3>Search Beer</h3>
            <TextField
              required
              type="text"
              name="searchBeer"
              value={searchBeer}
              placeholder="Beer Name"
              onChange={handleChange}
              variant="outlined"
              style={{ width: '100%', marginBottom: '1rem' }}
            />
            <Button variant="outlined" color="default" type="submit">
              Submit
            </Button>
            <Button variant="outlined" color="default" component={Link} to={cancelPath}>
              cancel
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  </div>
)

export default BeerSearchForm
