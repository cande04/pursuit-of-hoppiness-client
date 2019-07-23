import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BeerForm = ({ beer, handleChange, handleSubmit, cancelPath }) => (
  <div md="8" lg="6">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>beer name</Form.Label>
        <Form.Control
          type="text"
          placeholder="name"
          name="name"
          onChange={handleChange}
          value={beer.name}
        />
      </Form.Group>
      <Form.Group controlId="style">
        <Form.Label>style</Form.Label>
        <Form.Control
          type="text"
          placeholder="style"
          name="style"
          onChange={handleChange}
          value={beer.style}
        />
      </Form.Group>
      <Form.Group controlId="brewery">
        <Form.Label>brewery</Form.Label>
        <Form.Control
          type="text"
          placeholder="brewery"
          name="brewery"
          onChange={handleChange}
          value={beer.brewery}
        />
      </Form.Group>
      <Form.Group controlId="brewery_location">
        <Form.Label>brewery location</Form.Label>
        <Form.Control
          type="text"
          placeholder="brewery location"
          name="brewery_location"
          onChange={handleChange}
          value={beer.brewery_location}
        />
      </Form.Group>
      <Form.Group controlId="abv">
        <Form.Label>abv</Form.Label>
        <Form.Control
          type="text"
          placeholder="abv"
          name="abv"
          onChange={handleChange}
          value={beer.abv}
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>beer description</Form.Label>
        <Form.Control
          type="text"
          placeholder="description"
          name="description"
          onChange={handleChange}
          value={beer.description}
        />
      </Form.Group>
      <Form.Group controlId="rating">
        <Form.Label>rating</Form.Label>
        <Form.Control
          type="number"
          placeholder="rating"
          name="rating"
          onChange={handleChange}
          value={beer.rating}
        />
      </Form.Group>
      <Form.Group controlId="review">
        <Form.Label>review</Form.Label>
        <Form.Control
          type="text"
          placeholder="review"
          name="review"
          onChange={handleChange}
          value={beer.review}
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

export default BeerForm
