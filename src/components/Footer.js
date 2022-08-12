import React from 'react'
import ser from '../assets/images/service.png'
import ser2 from '../assets/images/service2.png'
import ser3 from '../assets/images/service3.png'
import ser4 from '../assets/images/sevice4.png'
import local from '../assets/images/location.png'
import mobile from '../assets/images/mobile.png'
import { Link } from 'react-router-dom'


const Footer = () => {
 
  return (
    <> 
    <div className='to-top' style={{position:'fixed',zIndex:'5',bottom:'50px',right:'10px'}}>
      <button onClick={()=>window.scroll(0,0)} 
      style={{width:'40px',height:'40px',
              borderRadius:'50%',
              backgroundColor:'rgba(168,168,168,0.3)',
              cursor:'pointer'
            }}
      >
        <i className="fa-solid fa-arrow-up"></i>
        </button>
    </div>
      <footer>
    <div className="service">
      <div className="service-box">
        <div className="ser-icon">
          <img src={ser} alt="#" />
        </div>
        <div className="service-text">
          <div className="main">SUPPORT 24/7</div>
          <div className="sub">Delicated 24/7 Support</div>
        </div>
      </div>
      <div className="service-box">
        <div className="ser-icon">
          <img src={ser2} alt="#" />
        </div>
        <div className="service-text">
          <div className="main">EASY RETURNS</div>
          <div className="sub">Shop With Confidence</div>
        </div>
      </div>
      <div className="service-box">
        <div className="ser-icon">
          <img src={ser3} alt="#" />
        </div>
        <div className="service-text">
          <div className="main">CARD PAYMENT</div>
          <div className="sub">12 Months Installments</div>
        </div>
      </div>
      <div className="service-box">
        <div className="ser-icon">
          <img src={ser4} alt="#" />
        </div>
        <div className="service-text">
          <div className="main">FREE SHIPPING</div>
          <div className="sub">Capped at $50 per order</div>
        </div>
      </div>
    </div>
    <div className="footer-main">
      <div className="information-col">
        <div className="footer-main-title">
          <h4>INFORMATION</h4>
        </div>
        <div className="widget">
          <ul>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="account-col">
        <div className="footer-main-title">
          <h4>ACCOUNT</h4>
        </div>
        <div className="widget">
          <ul>
            <li>
              <Link to="/account-detail/account">My account</Link>
            </li>
            <li>
              <Link to="/account-detail/orders">My orders</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/card">Shopping Cart</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="store-col">
        <div className="footer-main-title">
          <h4>INFORMATION</h4>
        </div>
        <div className="widget">
          <ul>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Delivery</a>
            </li>
            <li>
              <a href="#">information</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Sales</a>
            </li>
            <li>
              <a href="#">Terms &amp;</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="contact-col">
        <div className="footer-main-title">
          <h4>CONTACT US</h4>
        </div>
        <div className="email">
          <p>
            If you have any question. please contact us <span>@example.com</span>
          </p>
        </div>
        <div className="location ">
          <div className="img-box">
            <img src={local} alt="#" />
          </div>
          <div className="widget-info">
            <p>Your address goes here. 123, Address.</p>
          </div>
        </div>
        <div className="mobile">
          <div className="img-box">
            <img src={mobile} alt="#" />
          </div>
          <div className="widget-info">
            <ul>
              <li>
                <a href="#">+0123 456 789</a>
              </li>
              <li>
                <a href="#">+0234 567 891</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2022 .Copyright </p>
    </div>
  </footer>
</>
  )
}

export default Footer