import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { useFirebase } from './context/Firebase';

//pages 
import Login from './Pages/Login';
import List from './Pages/List';
import Home from './Pages/Home';
import Details from './Pages/Details';
import Orders from './Pages/Orders';
import ViewOrderDetails from './Pages/ViewOrderDetails';
// Components
import MyNavbar from './components/Navbar';
import Register from './Pages/Register';

// css
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {

    const firebase = useFirebase();

  return (
    <div>
      <MyNavbar/>
    <Routes>
        <Route path='/' element= { <Home/> } />
        <Route path='/register' element= { <Register/> } />
        <Route path='/login' element= { <Login/> } />
        <Route path='/book/list' element= { <List/> } />
        <Route path='/book/view/:bookId' element= { <Details/> } />
        <Route path='/book/orders' element= { <Orders/> } />
        <Route path='/book/orders/:bookId' element= { <ViewOrderDetails/> } />

    </Routes>
    </div>
  )
}

export default App
