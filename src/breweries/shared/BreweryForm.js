import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
      <Form.Group controlId="rating">
        <Form.Label>rating</Form.Label>
        <Form.Control
          type="number"
          placeholder="rating"
          name="rating"
          onChange={handleChange}
          value={brewery.rating}
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
