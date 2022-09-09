import React,{useState,useEffect,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios'
import {tokenContext} from '../../store/tokenContext'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function Login() {
    const {setToken}=useContext(tokenContext)
    
    const [cookies,setCookie,removeCookie]=useCookies([])
    const navigate=useNavigate()
    const [values,setValues]=useState({
        email:'',
        password:''
    })

    const generateError=(err)=>toast.error(err,{
        position:'bottom-right'
    })

    useEffect(()=>{
        const verifyUser=()=>{
            if(cookies.jwt){
              navigate('/')
            }
          
    }
    verifyUser()
},[])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const{data}=await axios.post('http://localhost:4000/login',{
                ...values
            },{
                withCredentials:true
            })
            console.log(data);
          console.log(data.user);

            if(data){
                
                localStorage.setItem("userInfo", JSON.stringify(data.user));
                setToken(data.user)
                if(data.errors){
                const {email,password}=data.errors
                if(email) generateError(email)
                else if(password) generateError(password)
                }else{
                  navigate('/')
                }
            }
        } catch (err) {
            console.log(err);
        }

    }
  return (
    <div className='body'>
    <div className='containers'>
        <h2>Login Account</h2> 
        <form class='form' onSubmit={(e)=>handleSubmit(e)} >
       
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" 
                 name='email'
                 placeholder='Email'
                 onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password"
                 name='password'
                 placeholder='Password'
                 onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
            </div>
           
            <button type='submit'>Submit</button>
            <span>
                Already have an account? <Link to='/register' >Register</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
    </div>
  )
}
