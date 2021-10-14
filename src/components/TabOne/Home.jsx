import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import './Home.css'
import auth from '../auth'
import {useHistory} from 'react-router-dom'
const Home = () => {

    const [userData,setuserData] = useState({
        username:'',
        mobile:'',
        email:'',
        address:'',
    })
    const history =useHistory()
    const [error,seterror] = useState(null)
    const [success,setsuccess] = useState(null)
       const errorDiv = error 
        ? <div className="error-tabone">
            <p>{error}</p> 
          </div> 
        : '';

    const successDiv = success
        ? <div className="success">
            <p>{success}</p> 
          </div> 
        : '';    

       
    const handleSubmit=(e)=>{
        e.preventDefault();
        const token = localStorage.getItem("auth-token");
        axios.post('https://mysterious-beach-01634.herokuapp.com/data',{
            userData
        },{headers:{"x-auth-token":token}})
        
        .then((res)=>{
            console.log(res)
            console.log(res.data.result)
            if(res.data.result === 'User Added successfully'){
                setsuccess(res.data.result) 
                setTimeout(function(){
                    setsuccess(null)
                     history.push('/tabtwo')
               }, 2500)
               
              
            }else{
                seterror(res.data.result) 
                setTimeout(function(){
                    seterror(null)
               }, 3000)
            }
        })
        .catch((err)=>{
        console.log(err.message)
        seterror(err.message) 
        setTimeout(function(){
                seterror(null)
         }, 2000)
    });
    };

    const [permit,setpermit] = useState(true)

    useEffect( () => {

        async function fetch(){
        var aut = await auth()
        console.log(aut)
        setpermit(aut)
        
        }
        fetch()
    }, [])

    if(!permit){
        return <div className='Error-page'>
            <h1>please do Login and try again</h1>
        </div>
    }    

    return (
        
        <div className='tabone-page'>
        <h1>Tab one</h1>
        {errorDiv}
        {successDiv}
           <form action="" className='post'>
               <input 
               type="text" 
               name="username" 
               placeholder='Username'
               pattern ="^[a-zA-Z0-9]*$"
               required
               onChange={(e)=>setuserData({...userData,username:e.target.value})} 
               />
               <input 
               type="tel"
                pattern={/[+-]?\d+(?:[.,]\d+)?/}
               maxLength={10}
               name="mobile-num" 
               placeholder='Mobile Number'
               required
                onChange={(e)=>setuserData({...userData,mobile:e.target.value})}     
               />
               <input 
               type="email" 
               name="email" 
               placeholder='Email' 
               required
                onChange={(e)=>setuserData({...userData,email:e.target.value})}     
               />
        
               <textarea 
                name='address' 
                placeholder='Address'
                required
                onChange={(e)=>setuserData({...userData,address:e.target.value})}    
               />
               <button onClick={handleSubmit} >Submit</button>
               <p>Go to tab Two <a href="/tabtwo">tabtwo</a></p>
           </form>
        </div>
    )
}

export default Home
