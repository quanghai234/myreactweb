import React from 'react'
import {NavLink , Outlet} from 'react-router-dom'


const AccountDetail = () => {

  const handleLogout =()=>{
    localStorage.clear();
  }


  return (
    <div className="account-area">
  <div className="account-controll">
    <nav>
      <ul>
        <li>
          <NavLink to={'payment'}>Payment Method</NavLink>
        </li>
        <li>
          <NavLink to={'account'}>Account Details</NavLink>
        </li>
        <li>
          <NavLink to={'orders'}>
           Orders
          </NavLink>
        </li>
        <li>
          <NavLink to={'/'} onClick={handleLogout}>
           Log Out
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
  <div className="account-display">
    <div className="tab">
      <Outlet></Outlet>
    </div>
  </div>
</div>

  )
}

export default AccountDetail