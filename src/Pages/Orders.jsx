import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import MyCard from '../components/Card';

const Orders = () => {
    const firebase = useFirebase();
    const [books,setBooks] = useState([]);
    useEffect(()=>{
        if(firebase.isLoggedIn)
        firebase.fetchMyBooks(firebase.user.uid).then((books) => setBooks(books.docs));
    },[firebase])

    if(!firebase.isLoggedIn)
        return <h1>please log in</h1>
        

  return (
    <div>
      {books.map((book) => (
        <MyCard link={`/book/orders/${book.id}`} key={book.id} id={book.id} {...book.data()} />
      ))}
    </div>
  )
}

export default Orders
