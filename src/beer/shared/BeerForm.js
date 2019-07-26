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

const BeerForm = ({ beer, handleChange, handleRatingChange, handleSubmit, cancelPath }) => (
  <div >
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper style={styles.paper}>
          <form onSubmit={handleSubmit}>
            <h3>Beer Name</h3>
            <TextField
              required
              type="text"
              name="name"
              value={beer.name}
              placeholder="Beer Name"
              onChange={handleChange}
              variant="outlined"
              style={{ width: '100%', marginBottom: '1rem' }}
            />
            <TextField
              required
              type="text"
              name="brewery"
              value={beer.brewery}
              placeholder="Brewery"
              onChange={handleChange}
              variant="outlined"
              style={{ width: '100%', marginBottom: '1rem' }}
            />
            <TextField
              required
              type="text"
              name="brewery_location"
              value={beer.brewery_location}
              placeholder="Brewery Location"
              onChange={handleChange}
              variant="outlined"
              style={{ width: '100%', marginBottom: '1rem' }}
            />
            <TextField
              required
              type="text"
              name="style"
              value={beer.style}
              placeholder="Beer Style"
              onChange={handleChange}
              variant="outlined"
              style={{ width: '100%', marginBottom: '1rem' }}
            />
            <TextField
              required
              type="text"
              name="abv"
              value={beer.abv}
              placeholder="ABV"
              onChange={handleChange}
              variant="outlined"
              style={{ width: '100%', marginBottom: '1rem' }}
            />
            <TextField
              required
              type="text"
              name="description"
              value={beer.description}
              placeholder="Beer Description"
              onChange={handleChange}
              variant="outlined"
              style={{ width: '100%', marginBottom: '1rem' }}
            />
            <TextField
              required
              type="text"
              name="review"
              value={beer.review}
              placeholder="Your Review"
              onChange={handleChange}
              variant="outlined"
              style={{ width: '100%', marginBottom: '1rem' }}
            />
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Rating:</Typography>
              <Rating
                name="rating"
                value={beer.rating}
                onChange={handleRatingChange}
              />
            </Box>
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

export default BeerForm
