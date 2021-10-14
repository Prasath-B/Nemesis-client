import React, { useEffect ,useState } from 'react'
import axios from 'axios'
import './TabTwo.css'
import auth from '../auth'

const TabTwo = () => {

    const [datas,setdata] = useState([])
    const [permit,setpermit] = useState(true)
    const token = localStorage.getItem('auth-token')

   async function fetchdata(URL){
       
        await axios.get(URL,{headers:{"x-auth-token":token}})
        .then((res)=>{
            console.log(res.data)
           
            setdata(res.data)
        })
        .catch((error)=>console.log(error))
   }
    

        useEffect(() => {
            fetchdata('https://mysterious-beach-01634.herokuapp.com/data')
        }, [])
   
     const deleteuser =()=>{
         const username = datas[0].username;
         axios.post('https://mysterious-beach-01634.herokuapp.com/delete',{
             username
         },{headers:{"x-auth-token":token}})
         window.location.reload()
     }
    

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
            <h1> please do Login and try again</h1>
        </div>
}
    


    return (<div className='tabtwo-page'>
        <table className='table'>
    <tbody >
        <tr>
            <th>Username</th>   
            <th>Mobile</th>
            <th>Address</th>
            <th>Email</th>
        </tr> 
        {datas.map((data)=>{
        return (
        <tr key={data._id}>
        <td>{data.username}</td>
        <td>{data.mobile}</td>
        <td>{data.address}</td>
        <td>{data.email}</td>
        </tr>
        )
        })}
       
        </tbody>

       </table>
       
       <button className="delete" onClick={deleteuser}>Delete</button>

       </div>
        
            
        
 
    
    )
}

export default TabTwo

{/* <tbody>
            <tr>
                <th>{data.username}</th>
                 <th>{data.username}</th>
                 <th>{data.username}</th>
                 <th>{data.username}</th>
            </tr>
                    <tr>
                <th>Column</th>
                <th>Column</th>
                <th>Column</th>
                <th>Column</th>
            </tr>
                    <tr>
                <th>Column</th>
                <th>Column</th>
                <th>Column</th>
                <th>Column</th>
            </tr>
        </tbody> */}