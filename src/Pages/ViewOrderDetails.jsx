import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase';

const ViewOrderDetails = () => {
    const params = useParams();
    const firebase = useFirebase();
    const [orders,setOrders] = useState([]);
    // console.log(params)
    useEffect(()=>{
        firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs))
    },[])
  return (
    <div className='container mt-5'>
      <h1>Orders</h1>
      {
        orders.map((order) => {
            const data = order.data();
            return <div className='mt-5' key={order.id}
            style={{border: '1px solid' , padding : "10px"}}>
                <h5>Ordered By : {data.displayName}</h5>
                <h6>Qty : {data.qty} </h6>
                <h6>User Email : {data.userEmail} </h6>
            </div>
        })
      }
    </div>
  )
}

export default ViewOrderDetails ; 
