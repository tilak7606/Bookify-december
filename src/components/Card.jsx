import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


const MyCard = (props) => {
    const navigate = useNavigate();
    // console.log(props);
  return (
    <Card style={{ width: '18rem',  margin: '15px'}}>
    
    <Card.Body>
      <Card.Title>{props.name} </Card.Title>
      <Card.Text>
      This book is sold by {props.displayName} at the price of {props.price} having isbn number {props.isbnNumber}
      </Card.Text>
      <Button onClick={e => navigate(props.link) } variant="primary">view</Button>
    </Card.Body>
  </Card>
  )
}

export default MyCard
