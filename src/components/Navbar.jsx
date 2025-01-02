import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFirebase } from '../context/Firebase';



const MyNavbar = () => {
  const firebase = useFirebase();

  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/list">Add Listing </Nav.Link>
            <Nav.Link href="/book/orders">Orders </Nav.Link>
            <Nav.Link href="/login">Login </Nav.Link>
            <Nav.Link href="/register">Register </Nav.Link>
           
          </Nav>
        </Container>
        <button className='mx-5' onClick={firebase.handleSignOut}>sign Out</button>
      </Navbar>
    </div>
  )
}

export default MyNavbar
