import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BrewerySearchForm = ({ searchBreweries, handleChange, handleSubmit, cancelPath }) => (
  <div md="8" lg="6">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="search">
        <Form.Label>brewery location</Form.Label>
        <Form.Control
          type="text"
          placeholder="name"
          name="searchBreweries"
          onChange={handleChange}
          value={searchBreweries}
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

export default BrewerySearchForm
