
import React, { useEffect, useState } from 'react'
import axios from '../../api/products'

const Account = () => {
  
  const localuser = localStorage.getItem('username');
  
  const getUser = async()=>{
    const user = await axios.get( `/user?username=${localuser}` );
    setId(user.data[0].id);
    setFirst(user.data[0].firstname)
    setLast(user.data[0].lastname)
    setEmail(user.data[0].email)
    setDisplay(user.data[0].displayname)
  }
    
    useEffect(()=>{
      getUser()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const [id,setId] = useState('');
    const [firstname,setFirst] = useState('');
    const [lastname,setLast] = useState('');
    const [email,setEmail] = useState('');
    const [displayname,setDisplay] = useState('');


    const handleUpdate = async(e)=>{
        e.preventDefault()
        await axios.put("/user/"+id,{firstname,lastname,displayname,email})
        localStorage.setItem('displayname',displayname)
    }
   
  return (
    <div className="myaccount-content">
        <h3>Account Details</h3>
        <form>
          <div className="input-row">
            <div className="single-input">
              <label htmlFor="first-name">First Name</label>
              <input type="text" 
                name="first-name" 
                id='first-name' 
                autoComplete='off' 
                value={firstname}
                onChange={(e)=>setFirst(e.target.value)}
              />
            </div>
            <div className="single-input">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" 
                id='last-name' 
                autoComplete='off'
                value={lastname}
                onChange={(e)=>setLast(e.target.value)}
              />
            </div>
          </div>
          <div className="single-input">
            <label htmlFor="display-name">Display Name</label>
            <input type="text" 
                id='display-name' 
                autoComplete='off'
                value={displayname}
                onChange={(e)=>setDisplay(e.target.value)}
            />
          </div>
          <div className="single-input">
            <label htmlFor="email">Email Addres</label>
            <input type="email" 
                id='email' 
                autoComplete='off'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="check-btn">
            <button onClick={(e)=>handleUpdate(e)}>Save Change</button>
          </div>
        </form>
      </div>
  )
}

export default Account