import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const BreweryForm = ({ brewery, handleChange, handleSubmit, cancelPath }) => (
  <div md="8" lg="6">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>brewery name</Form.Label>
        <Form.Control
          type="text"
          placeholder="brewery name"
          name="name"
          onChange={handleChange}
          value={brewery.name}
        />
      </Form.Group>
      <Form.Group controlId="location">
        <Form.Label>location</Form.Label>
        <Form.Control
          type="text"
          placeholder="location"
          name="location"
          onChange={handleChange}
          value={brewery.location}
        />
      </Form.Group>
      <Form.Group controlId="review">
        <Form.Label>review</Form.Label>
        <Form.Control
          type="text"
          placeholder="review"
          name="review"
          onChange={handleChange}
          value={brewery.review}
        />
      </Form.Group>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Controlled</Typography>
        <Rating
          name="simple-controlled"
          value={brewery.rating}
          onChange={handleChange}
        />
      </Box>
      <Button variant="outline-dark" type="submit">
        Submit
      </Button>
      <Link to={cancelPath}>
        <Button variant="outline-dark">
          cancel
        </Button>
      </Link>
    </Form>
  </div>
)

export default BreweryForm
