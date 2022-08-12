import React from 'react'
import Register from './Register';
import Login from './Login';


const Userform = () => {
    // REGISTER
  
    //  LOGIN 

  return (
    <div className="container">  
        <div className="login-register-area">
            <div className="login-area">
              <Login/>
            </div>

            <div className="register-area">
               <Register/>
            </div>
        </div>
        
    </div>

  )
}

export default Userform