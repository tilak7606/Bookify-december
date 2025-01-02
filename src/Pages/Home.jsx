import React , {useEffect,useState} from 'react'
import { useFirebase } from '../context/Firebase'
import MyCard from '../components/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Login from './Login';
const Home = () => {
    const firebase = useFirebase();
    const [books,setBooks] = useState([]);

    useEffect(()=>{
        firebase.listAllBooks().then((books) => setBooks(books.docs))
    },[])

    if(!firebase.isLoggedIn) return <div>
      {<Login/> }
    </div>

  return (
      <div className='container mt-5'>
        <CardGroup>
        {books.map((book) => (    
            <MyCard link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()} />    
                        
        ))}
    </CardGroup>
    </div>
  )
}

export default Home
