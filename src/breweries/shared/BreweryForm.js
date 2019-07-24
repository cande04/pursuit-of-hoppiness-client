import React from 'react'
import { Link } from 'react-router-dom'

import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
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

const BreweryForm = ({ brewery, handleChange, handleSubmit, cancelPath }) => (
  <div >
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper style={styles.paper}>
          <form onSubmit={handleSubmit}>
            <h3>Brewery Name</h3>
            <TextField
              required
              type="text"
              name="name"
              value={brewery.name}
              placeholder="Brewery Name"
              onChange={this.handleChange}
              variant="outlined"
              style={{ width: '100%', marginBottom: '1rem' }}
            />
            <TextField
              required
              type="text"
              name="location"
              value={brewery.location}
              placeholder="Brewery Location"
              onChange={this.handleChange}
              variant="outlined"
              style={{ width: '100%', marginBottom: '1rem' }}
            />
            <TextField
              required
              type="text"
              name="review"
              value={brewery.review}
              placeholder="Your Review"
              onChange={this.handleChange}
              variant="outlined"
              style={{ width: '100%', marginBottom: '1rem' }}
            />
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Rating:</Typography>
              <Rating
                name="simple-controlled"
                value={brewery.rating}
                onChange={handleChange}
              />
            </Box>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button variant="contained" color="primary" component={Link} to={cancelPath}>
              cancel
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  </div>
)

export default BreweryForm
