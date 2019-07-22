import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BeerSearchForm = ({ searchBeer, handleChange, handleSubmit, cancelPath }) => (
  <div md="8" lg="6">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="search">
        <Form.Label>beer name</Form.Label>
        <Form.Control
          type="text"
          placeholder="name"
          name="searchBeer"
          onChange={handleChange}
          value={searchBeer}
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

export default BeerSearchForm
