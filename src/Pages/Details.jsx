import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase';
import { Button } from 'react-bootstrap';
import  Form  from 'react-bootstrap/Form';

const Details = () => {
    const firebase = useFirebase();
    const [qty,setQty] = useState(1);
    
    const [data,setData] = useState(null);
     
    const params = useParams();
    console.log(params)
    useEffect(()=>{
        firebase.getBookById(params.bookId).then((value) => setData(value.data()))
    },[])

    const placeOrder = async() => {
      const result = await firebase.placeOrder(params.bookId,qty)
      console.log("order Placed", result)
      alert('Successfull place order')
    }

    if(data == null) return <h1>Loading....</h1>
  return (
    <div className='container'>
      <h1>Book Details..</h1>
      <br />
      <h3>Name - {data.name} </h3>
      <h3>ISBN - {data.isbnNumber} </h3>
      <h3>Price - {data.price} </h3>
      <br />
      <h1>Owner Details..</h1>
      <h3>Name - {data.displayName} </h3>
      <h3>Email - {data.userEmail} </h3>
      <h3>userId - {data.userID} </h3>

      <br />
      <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Price</Form.Label>
      <Form.Control
          onChange={(e) => setQty(e.target.value)}
          value={qty}
       type="number" placeholder="Enter Qty" />
    </Form.Group>
      <Button onClick={placeOrder} variant='success'>Place Order</Button>


      <br /><br />
      <h5>ThankYou....</h5>

    </div>
  )
}

export default Details
