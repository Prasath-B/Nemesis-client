import axios from 'axios'
const auth = async()=>{

    
    let value = true
    const token = localStorage.getItem('auth-token')

    if(token ===null) return false;

    if(token){
        await axios.post('https://mysterious-beach-01634.herokuapp.com/auth',{userdata:'Hello'},{headers:{"x-auth-token":token}})
        .then((res)=> value = true)
        .catch((error)=>{
            console.log(error)
            value = false
        })
        return value
    }

}

export default auth;