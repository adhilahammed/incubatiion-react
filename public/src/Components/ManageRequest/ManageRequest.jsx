import React from "react";
import { Container, Tab, Table, Tabs, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie'
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'


// import "./managerequest.css";

function ManageRequest() {
  const[cookies,setCookie,removeCookie]=useCookies([])
  const navigate = useNavigate();

//   useEffect(() => {
//     const auth = localStorage.getItem("token");
//     if (!auth) {
//       navigate("/adminlogin");
//     }
//   });

  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [data, setData] = useState([]);

  // const logOut = () => {
  //   localStorage.clear();
  //   navigate("/adminlogin");
  // };

  const manage = async () => {
    let approvedData = await axios.get("http://localhost:4000/admin/approved");
    let pendingData = await axios.get("http://localhost:4000/admin/processing");
    let allData=await axios.get("http://localhost:4000/admin/alldata")
    
    // console.log(pendingData+'aaaaa');
    console.log(allData);
    console.log(allData.data.data);
    // console.log("appdata", pendingData.data.processing);
    if (pendingData.data.status === false) {
      console.log("false");
    } else {
      console.log("11111");
      setPending(pendingData.data.processing);
    }
    if (approvedData.data.status === false) {
      console.log("false");
    } else {
      setApproved(approvedData.data.approved);
    }
    if(allData.data.status===false){
      console.log('false');
    }else{
      setData(allData.data.data)
      console.log('ccccc');
    }
  };

  useEffect(() => {

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

    manage();
  }, []);
  console.log(pending);

  const logOut=()=>{
    removeCookie('jwt')
    navigate('/adminlogin')
}

  return (
    <>
      <Navbar expand="lg" bg="secondary" variant="white">
        <Container fluid>
          <Navbar.Brand href="#">
            <Link style={{color:'Background',textDecorationLine:"none"}} to="/admin" className="panelHead">
              Admin panel
            </Link>
          </Navbar.Brand>
          <Navbar.Brand href="#">
            <Link style={{color:'Background',textDecorationLine:"none"}} to="/manageRequest" className="panelHeadSub">
              Manage request
            </Link>{" "}
          </Navbar.Brand>
          <Navbar.Brand href="#">
            <Link style={{color:'Background',textDecorationLine:"none"}} to="/slots" className="panelHeadSub">
              Slots
            </Link>{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Button onClick={logOut} style={{backgroundColor:'black',color:'Background',textDecorationLine:"none"}} variant="outline-dark">
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ marginTop: "2%" }}>
        <Container>
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Processing">
              <div className="col-md-12">
                {pending.length > 0 ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sl No</th>
                        <th>Application ID</th>
                        <th>Company Name</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {pending.map((obj, index) => {
                        return (
                          <tr key={obj._id}>
                            <td>{index + 1}</td>
                            <td>{obj._id}</td>
                            <td>{obj.companyName}</td>
                            <td style={{ color: "orange" }}>{obj.status}</td>
                            <td>
                              <p
                                className="view"
                                style={{
                                  color: "turquoise",
                                  textAlign: "center",
                                }}
                                onClick={() => {
                                  navigate("/viewApplication");
                                  localStorage.setItem(
                                    "appId",
                                    JSON.stringify([obj._id, obj.userId])
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
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <h3 style={{ color: "red" }}>
                      No Application Under Processing
                    </h3>
                  </div>
                )}
              </div>
            </Tab>
            <Tab eventKey="home1" title="alldata">
              <div className="col-md-12">
                {data.length > 0 ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sl No</th>
                        <th>Application ID</th>
                        <th>Company Name</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((obj, index) => {
                        return (
                          <tr key={obj._id}>
                            <td>{index + 1}</td>
                            <td>{obj._id}</td>
                            <td>{obj.companyName}</td>
                            <td style={{ color: "orange" }}>{obj.status}</td>
                            <td>
                              <p
                                className="view"
                                style={{
                                  color: "turquoise",
                                  textAlign: "center",
                                }}
                                onClick={() => {
                                  navigate("/viewApplication");
                                  localStorage.setItem(
                                    "appId",
                                    JSON.stringify([obj._id, obj.userId])
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
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <h3 style={{ color: "red" }}>
                      No Application Under Processing
                    </h3>
                  </div>
                )}
              </div>
            </Tab>
            <Tab eventKey="profile" title="Approved">
              <div className="col-md-12">
                {approved.length > 0 ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sl No</th>
                        <th>Application ID</th>
                        <th>Company Name</th>
                        <th>Slot Status</th>
                        {/* <th></th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {approved.map((obj, index) => {
                        return (
                          <tr key={obj._id}>
                            <td>{index + 1}</td>
                            <td>{obj._id}</td>
                            <td>{obj.companyName}</td>
                            <td>
                              {obj.bookingStatus ? (
                                <p style={{ color: "green" }}>Allocated</p>
                              ) : (
                                <p style={{ color: "green" }}>Not Allocated</p>
                              )}
                            </td>
                            {/* <td > */}
                            {/* {obj.bookingStat ? (
                          <p style={{ color: "green" }}>APPROVED</p>
                        ):(<p style={{ color: "orange" }}>PENDING</p>)} */}
                            {/* </td> */}
                            {/* <td>
                          {obj.bookingStat ? (
                            <p className="view"
                            style={{ color: "turquoise", textAlign: "center"}} onClick={() => {
                              navigate("/viewApplication");
                              localStorage.setItem(
                                "appId",
                                JSON.stringify([obj._id])
                              );
                            }}>View Application</p>
                            
                          ): (
                          <div>
                            <p
                            className="view"
                            style={{ color: "turquoise", textAlign: "center" }}
                            onClick={() => {
                              navigate("/slots");
                              localStorage.setItem(
                                "appId",
                                JSON.stringify([obj._id,obj.userId])
                              );
                            }}
                          >
                            Allot Slot
                          </p>
                          </div>)}
                        </td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <h3 style={{ color: "red" }}>No Approved Applications</h3>
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        </Container>
      </div>
    </>
  );
}

export default ManageRequest;
