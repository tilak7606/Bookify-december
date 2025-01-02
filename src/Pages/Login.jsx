import React, { useState ,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const firebase = useFirebase();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handelSubmit = async (e) => {
        e.preventDefault();
        
        console.log('signinnnnn......')
        const result = await firebase.signInUserWithEmailAndPass(email,password);

        console.log("sucessfull",result);
    }
    
    // ye kisi particular page prr navigate karne ke kam mai aata hai :
    const navigate = useNavigate();

    useEffect(()=>{
        if(firebase.isLoggedIn){
            // home page pr navigate karna hai :
            navigate('/');
        }
    },[firebase,navigate]);


  return (
    <div className='container mt-5'>
    <Form onSubmit={handelSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
      type="email" placeholder="Enter email" />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control
          onChange={(e) => setPassword(e.target.value)}
          value={password}
       type="password" placeholder="Password" />
    </Form.Group>
   
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>

  <h1 className='mt-4'>OR </h1>
  <br />
  <h6>Register with Google</h6>

  <Button  onClick={firebase.signInWithGoogle}
  className='mt-3' variant='danger'>SignIn with Google</Button>

  </div>


  )
}

export default Login
