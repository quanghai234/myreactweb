import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {NavLink,Link,useLocation} from 'react-router-dom'

const Header2 = () => {
    const path =useLocation()
    const location=(path)=>{
        const local = path.pathname.replace('/','')
        return local.charAt(0).toUpperCase()+local.slice(1)
    }

    const [search,setSearch] = useState('')
    

    const cardProduct = useSelector(state => state.cart.card)
    
    let user;
    const displayname = localStorage.getItem('displayname')
    const logged = localStorage.getItem('logged') 
    if (logged==="true") {
      const userimg = localStorage.getItem('useravatar')
        user=<div className="login-link">
                <div className='user-img'>
                  <img src={userimg} alt="user img" />
                </div>
                <Link to='/account-detail/payment'>{displayname}</Link>
            </div>
    }else{
        user=<div className="login-link">
                <Link to='/login'>Login / Regist</Link>
              </div>
    }


    const [showMenu,setShowMenu] = useState(false);
    showMenu?document.body.style.overflow="hidden":document.body.style.overflow="auto";
      let menu;

      if(showMenu){
         menu = <div className='sub-menu'>
            <div className='sub-menu-list' >
              <div className="sub-nav-bar">
               <ul className="menu">
                  <li>
                    <NavLink  to="/" onClick={()=>setShowMenu(!showMenu)}>HOME</NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" onClick={()=>setShowMenu(!showMenu)}>ABOUT</NavLink>
                  </li>
                  <li>
                    <NavLink to="/product" onClick={()=>setShowMenu(!showMenu)}>PRODUCT</NavLink>
                  </li>
                  <li>
                    <NavLink to="/blog" onClick={()=>setShowMenu(!showMenu)}>BLOG</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" onClick={()=>setShowMenu(!showMenu)}>CONTACT</NavLink>
                  </li>
                </ul>
              </div>
            <button onClick={()=>setShowMenu(!showMenu)}><i className="fa-solid fa-xmark"></i></button>
            </div>
          </div>
      }

  return (
    <>
    <header className="header-second">
  <div className="small-header">
    <div className="banderol">
      <span>World Wide Completely Free Returns and Free Shipping</span>
    </div>
    <div className="region">
      <select name="" id="">
        <option value="">English</option>
        <option>Francais</option>
      </select>
      <select name="" id="">
        <option value="">USD</option>
        <option value="">EUR</option>
      </select>
    </div>
  </div>
  <div className="midder-bar">
    <div className="logo-box">
      <Link to="/" className="logo">
        LOGO
      </Link>
    </div>
    <div className="search-bar">
      <div className="search-input">
        <input type="text" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      <div className="search-btn">
          <Link to='search' state={search}>
            <button>      
                <i className="fa fa-magnifying-glass" />
            </button>
          </Link>    
      </div>
    </div>
    <div className="account">
      {user}
      <div className="icon-box">
        <Link to='/wishlist'>
         <i className="fa fa-regular fa-heart"></i>
        </Link>
      </div>
      <div className="icon-box">
        <Link to='/card'>
         <i className="fa fa-cart-shopping"></i>
          { 
          cardProduct.length!==0
          ?<div className='card-num'>{cardProduct.length}</div>
          :<></>
          }
        </Link>
      </div>
      <div className='hamberger-menu'>
          <button className='toggle-menu' onClick={()=>setShowMenu(!showMenu)}>
          <i className="fa-solid fa-bars"></i>
          </button>
        </div>
    </div>
  </div>
  <nav>
    <div className="department">
      <div className="depart-list">
        <i className="fa-solid fa-bars" />
        <h3>All Departments</h3>
      </div>
    </div>
    <div className="nav-bar">
      <ul className="menu">
        <li>
          <NavLink   to="/">HOME</NavLink>
        </li>
        <li>
          <NavLink  to="/about">ABOUT</NavLink>
        </li>
        <li>
          <NavLink  to="/product">PRODUCT</NavLink>
        </li>
        <li>
          <NavLink  to="/blog">BLOG</NavLink>
        </li>
        <li>
          <NavLink  to="/contact">CONTACT</NavLink>
        </li>
      </ul>
    </div>
  </nav>
  <div className="page-banner">
    <Link to='/' className='to-home'>
      Home // 
    </Link>
    <Link to={`/${location(path)}`}>
      <span>{""} {location(path)} {""} </span>/
    </Link>
  </div>
</header>
{menu}
    </>
  )
}

export default Header2