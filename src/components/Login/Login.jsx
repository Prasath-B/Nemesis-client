import React,{useState} from 'react'
import axios from "axios";
import  './Login.css';
import {useHistory} from 'react-router-dom'

const Login = () => {

    const [mail,setmail] =useState('')
    const [password,setpassword] =useState('')
    const [context,setcontext] = useState(null)
      const errorDiv = context 
        ? <div className="error-login">
            <p>{context}</p> 
          </div> 
        : '';
    const history = useHistory()

    
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(mail);
        axios.post('https://mysterious-beach-01634.herokuapp.com/login',{
            mail,
            password
        }).then((res)=>{
            
            
            if(res.data.result ==='success'){  
            localStorage.setItem("auth-token",res.data.token);      
            history.push('/home')
                 
            }else{
                setcontext(res.data.result)
                setTimeout(function(){
                    setcontext(null)
                    }, 1300)
                }
        })
        .catch((err)=>console.log(err));
    };

  

    return (
        <div className='login-page'>
        <img src="" alt="" />
        <div className='login-form'>
            <p className='login-text'>Login to Nemesis</p>
            {errorDiv}
            <form action="">
            <input 
            type="text" name="e-mail" className='mail-input' placeholder = 'E-Mail' 
            value={mail} 
            onChange ={(e)=>setmail(e.target.value)} required/>
            <input type="password" name="password"   
            placeholder='Password' 
            value={password} 
            onChange ={(e)=>setpassword(e.target.value)} 
            required/>
            <button className='btn btn-primary btn-lg' onClick ={handleSubmit}>Submit</button>
            </form>
        </div>
        
        </div>
    )
}

export default Login
