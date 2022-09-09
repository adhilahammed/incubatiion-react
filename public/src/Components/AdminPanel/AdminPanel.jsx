import React from 'react'
import { Container, ProgressBar, Table, Button} from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import {useEffect,useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import {ToastContainer,toast} from 'react-toastify'

export default function AdminPanel() {
  const Navigate = useNavigate()
  const[cookies,setCookie,removeCookie]=useCookies([])
  // useEffect(()=>{
  //     const auth=localStorage.getItem("token")
  //     if(!auth){
  //      Navigate("/adminlogin")
  //     }
  //   })

  // const logOut = ()=>{
  //     localStorage.clear()
  //     Navigate('/adminlogin')
  // }
const info = JSON.parse(localStorage.getItem("userInfo"));
const [data, setData] = useState([])
const navigate = useNavigate()
const config = {
  headers : {
    "Content-Type" : "application/json"
  }
}

const appData = async() => {
  let appData = await axios.get(`http://localhost:4000/admin/adminpanel`)
  console.log('appdata',appData.data);

      if(appData.data.status==false){

      }else{
        setData(appData.data)
      }
}



useEffect(()=>{

  const verifyUser=async()=>{
    if(!cookies.jwt){
      navigate('/adminlogin')
      console.log('bbbbbbbbbb');
    }else{
      const {data} =await axios.post('http://localhost:4000/admin',{},
      {withCredentials:true})
      console.log(data);
      if(!data.status){
        console.log('aaaa');
        removeCookie('jwt')
        navigate('/adminlogin')
      }else 
      console.log('aaaaaaaaaaaa');  
     
      
    }
  }

  verifyUser()
  appData()
  
}, [])


  const logOut=()=>{
    removeCookie('jwt')
    navigate('/adminlogin')
}


console.log('lenghtttt',data.length);

 

  return (
    <>
     <Navbar  expand="lg" bg="secondary"  variant="dark">
      <Container fluid>
        <Navbar.Brand  href="#" className='panelHead' >Admin panel</Navbar.Brand>
        <Navbar.Brand  href="#"><Link to='/manageRequest' style={{color:'Background',textDecorationLine:"none"}} className='panelHeadSub' >Manage request</Link> </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           
          </Nav>
          <Button onClick={logOut}  style={{backgroundColor:'black',color:'Background'}}
                variant="outline-dark">Logout</Button>
          
        
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  
    <h1>New Applications</h1>
     {data.length<1 ? (
    <div>
      <h3 style={{color:"red"}}>Currently no new applications</h3>
    </div>): (
    <Table striped="columns">
      <thead>
        <tr>
          <th>#</th>
          <th>Application Id</th>
          <th>Company Name</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>
      {data.map((obj,index) => {
              return (
                <tr>
                  <td>{index+1}</td>
                  <td>{obj._id}</td>
                  <td>{obj.companyName}</td>
                  <td style={{ color: "green" }}>{obj.status}</td>
                  <td>
                    <p
                      className="view"
                      style={{ color: "black", textAlign: "center" }}
                      onClick={() => {
                        navigate("/viewApplication");
                        localStorage.setItem(
                          "appId",
                          JSON.stringify([obj._id])
                        );
                      }}
                    >
                      View Application
                    </p>
                  </td>
                </tr>
              );
            })}
      </tbody>
    </Table>
     )}
    
    </>
  )
    }
