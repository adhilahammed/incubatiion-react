import React,{useEffect,useContext} from 'react'
import {useNavigate,Link} from "react-router-dom";
import {useCookies} from 'react-cookie'
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify'
// import '../Components/Css/login.css'
import { tokenContext } from '../store/tokenContext';

export default function Home() {
    const{token}=useContext(tokenContext)
    // console.log("skfhshgfjk");
    // console.log(token);
    // console.log("skfhshgfjk");

    const navigate=useNavigate()
    const[cookies,setCookie,removeCookie]=useCookies([])

    useEffect(()=>{

        const verifyUser=async()=>{
         
            if(!cookies.jwt){
                navigate('/login')
            }else{
                const{data}=await axios.post
                ('http://localhost:4000',{},{
                    withCredentials:true
                })
                if(!data.status){
                    removeCookie('jwt')
                    navigate('/login')
                }else toast(`Hi ${data.user}`,{theme:'dark'})
               
            }
        }
        verifyUser()
    },[cookies,navigate,removeCookie])
    const logOut=()=>{
        removeCookie('jwt')
        navigate('/register')
    }
  return (
    <>
    <div className='private'>
        <h1>Home</h1>
        <Link to='/home'> <button>Book slot</button></Link>
        <button onClick={logOut}>Log Out</button>
    </div>
    <ToastContainer/>
    </>
  )
}
