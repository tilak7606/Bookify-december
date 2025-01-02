import React, { useState ,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
// import { useNavigate } from 'react-router-dom';

const List = () => {
    
    const firebase = useFirebase();

    const [isbnNumber,setIsbnNumber] = useState("");
    const [price,setPrice] = useState("")
    const [name,setName]= useState("")


    const handelSubmit = async (e) => {
        e.preventDefault()
        await firebase.handelCreateNewListing(name,isbnNumber,price)
        alert('successfull')
    }

  return (
    <div className='container mt-5'>
    <Form onSubmit={handelSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Name</Form.Label>
      <Form.Control 
          onChange={(e) => setName(e.target.value)}
          value={name}
      type="text" placeholder="Enter email" />
     
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>ISBN Number</Form.Label>
      <Form.Control
          onChange={(e) => setIsbnNumber(e.target.value)}
          value={isbnNumber}
       type="text" placeholder="Enter ISBN Number" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Price</Form.Label>
      <Form.Control
          onChange={(e) => setPrice(e.target.value)}
          value={price}
       type="text" placeholder="Enter Price" />
    </Form.Group>
   
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>

  

  </div>

  )
}

export default List
