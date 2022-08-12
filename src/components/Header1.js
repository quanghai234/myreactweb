import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import{NavLink,Link}from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../api/products';

const Header1 = () => {

  const cardProduct = useSelector(state=>state.cart)
  const [carousel,setCarousel] = useState([]);

  useEffect(()=>{
    const getCarousel = async()=>{
      await axios.get('headercarosel')
      .then(resp=>setCarousel(resp.data))
      .catch(err=>console.log(err))
    }
    getCarousel()
    showSearch()
  },[])
  
  const showSearch = ()=>{
    const searchBar = document.querySelector('.hide-bar');
    const showSearch = document.querySelector('.show-search');
    const hideBar = document.querySelector('.turn-off');
    showSearch.addEventListener('click',function(){
        searchBar.style.bottom = `-2.5rem`
        searchBar.style.display = `block`
    })
    hideBar.addEventListener('click',function(){
        searchBar.style.bottom = `0`
        searchBar.style.display =`none`
    })
  } 


  const logged = localStorage.getItem('logged') 

  const [search,setSearch]= useState('') 

  const handleLogout =()=>{
    localStorage.clear();
    window.location.reload();
  }

  let user ;
  const [showOption,setShowOption]= useState(false)
  
  if (logged==="true") {
    const userimg = localStorage.getItem('useravatar')
    user = <div className="icon-box show-user">
          <div className="user" onClick={()=>setShowOption(!showOption)}>
            <img src={userimg} alt='#'/>
          </div>
          {showOption?
          <div className="user-box">
            <ul className="user-list">
              <li className="user-controll">
                <Link to="/account-detail/payment">Account</Link>
              </li>
              <li className="user-controll">
                <button onClick={handleLogout}>Log Out</button>
              </li>
            </ul>
          </div>
          :<></>
          }
        </div>

  }else{
    user = <div className="icon-box">
            <Link to='/login' >
              <i className="fa fa-user" />
            </Link>
          </div>
  }

  // Slider setting 
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 3000
  };

  const [showMenu,setShowMenu] = useState(false);
  showMenu?document.body.style.overflow="hidden":document.body.style.overflow="auto";
    let menu;
    if(showMenu){
      
       menu = <div className='sub-menu'>
          <div className='sub-menu-list'>
            <div className="sub-nav-bar">
             <ul className="menu">
                <li>
                  <NavLink  to="/" onClick={()=>setShowMenu(!showMenu)}>HOME</NavLink>
                </li>
                <li>
                  <NavLink to="/about" onClick={()=>document.body.style.overflow="auto"}>ABOUT</NavLink>
                </li>
                <li>
                  <NavLink to="/product" onClick={()=>document.body.style.overflow="auto"}>PRODUCT</NavLink>
                </li>
                <li>
                  <NavLink to="/blog" onClick={()=>document.body.style.overflow="auto"}>BLOG</NavLink>
                </li>
                <li>
                  <NavLink to="/contact" onClick={()=>document.body.style.overflow="auto"}>CONTACT</NavLink>
                </li>
              </ul>
            </div>
          <button onClick={()=>setShowMenu(!showMenu)}><i className="fa-solid fa-xmark"></i></button>
          </div>
        </div>
    }

  return (
    <>   
    <header>
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
    <nav>
      <div className="logo-box">
        <Link to="/" className="logo">
          LOGO
        </Link>
      </div>
      <div className="nav-bar">
        <ul className="menu">
          <li>
            <NavLink  to="/">HOME</NavLink>
          </li>
          <li>
            <NavLink to="/about">ABOUT</NavLink>
          </li>
          <li>
            <NavLink to="/product">PRODUCT</NavLink>
          </li>
          <li>
            <NavLink to="/blog">BLOG</NavLink>
          </li>
          <li>
            <NavLink to="/contact">CONTACT</NavLink>
          </li>
        </ul>
      </div>
      <div className="account">
        <div className="icon-box show-search" >
          <i className="fa fa-magnifying-glass" />
        </div>
       {user}
        <div className="icon-box">
          <Link to='/wishlist'>
           <i className="fa fa-heart" />
          </Link>
        </div>
        <div className="icon-box">
          <Link to='/card'>
          <i className="fa fa-cart-shopping" />
          { 
          cardProduct.card.length!==0
          ?<div className='card-num'>{cardProduct.card.length}</div>
          :<></>
          }
          </Link>
        </div>
        <div className="hide-bar">
          <div className="search-bar">
            <div className="turn-off">
              <button>
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <input type="text" placeholder="Search for product...." onChange={(e)=>setSearch(e.target.value)} />
            <div className="search-action">
              <Link to='/search' state={search}>
                <button>
                  <i className="fa fa-magnifying-glass" />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className='hamberger-menu'>
          <button className='toggle-menu' onClick={()=>setShowMenu(!showMenu)}>
          <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
    <div className='new-arrival-box'>
     <Slider {...settings}>
      {
      carousel.map((carousel)=>{
      return <div className="new-arrival-content" key={carousel.id}>
              <div className="arr-text">

                <p>{carousel.subTitle}</p>
                <h1>{carousel.title}</h1>

                {/* <p className="off">
                  Up To <span>25%</span> Off
                </p>  */}
              </div>
              <div className="arr-img">
                <img src={carousel.img} alt="#" />
              </div>
            </div>
      })
      }
    </Slider>
    </div>
    </header>
      {menu}
    </>
  )
}

export default Header1