import axios from '../api/products'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link,useLocation} from 'react-router-dom'
import service from '../assets/images/service2.png'
import service2 from '../assets/images/service3.png'
import service3 from '../assets/images/sevice4.png'
import Slider from 'react-slick'


const ProductDetail = (props) => {

    const location = useLocation()

    // thuc hien hanh dong
    const dispatch = useDispatch()
    
    const [purchaseNum,setperchaseNum] = useState(); 
    
    const handleChange = (e)=>{
      setperchaseNum(e.target.value)
    }
    if(purchaseNum===undefined){setperchaseNum(1)}
    
    const handleAdd=()=>dispatch({
        type:'ADD_TO_CART',
        payload:{...product,quantity:parseInt(purchaseNum)}
    })
    const handleWish=(prod)=>dispatch({
      type:'ADD_TO_WISHLIST',
      payload:prod
  })
  //  hien thi chi tiet
    const [product,setProduct] = useState([]);
    const [related,setRelated] = useState([]);

    useEffect(()=>{
      window.scrollTo(0,0)
      const getProductDetail = async()=>{
        return await axios.get('/product/'+location.state.id)
        .then((resp)=>{setProduct(resp.data)})
        .catch((err)=>console.log(err))
      }
      getProductDetail()
      getRelated()
    },[location.state])


    const getRelated = async()=>{
      return await axios.get('/product?tag='+location.state.tag)
     .then((resp)=>{setRelated(resp.data)})
    .catch((err)=>console.log(err))
    }

  

    // tab
    useEffect(()=>{
      navTab()
    })
    const navTab = ()=>{
      const tabs = document.querySelectorAll(".tab-item");
      const panes = document.querySelectorAll(".tab-pane");

      const tabActive = document.querySelector(".tab-item.active");
      const line = document.querySelector(".tabs .line");

      requestIdleCallback(function () {
      line.style.left = tabActive.offsetLeft + "px";
      line.style.width = tabActive.offsetWidth + "px";
      });

      tabs.forEach((tab, index) => {
      const pane = panes[index];

      tab.onclick = function () {
          document.querySelector(".tab-item.active").classList.remove("active");
          document.querySelector(".tab-pane.active").classList.remove("active");

          line.style.left = this.offsetLeft + "px";
          line.style.width = this.offsetWidth + "px";

          this.classList.add("active");
          pane.classList.add("active");
      };
      });
    }

    // Slider setting
    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: "linear",
      initialSlide: 0,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 550,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };
    
  return (
   <>
   
   <div className="container">
    <div className="detail-area">
      <div className="product-detail">
        <div className="left-detail">
          <div className="upper-img">
            <img src={product.imglink} alt="#" />
          </div>
          <div className="img-control">
            <div className="under-img-box">
              <a href="#" className="img-con">
                <img src={product.imglink} alt="#" className="img-active" />
              </a>
            </div>
            <div className="under-img-box">
              <a href="#" className="img-con">
                <img src={product.imglink} alt="#" />
              </a>
            </div>
            <div className="under-img-box">
              <a href="#" className="img-con">
                <img src={product.imglink} alt="#" />
              </a>
            </div>
          </div>
        </div>
        <div className="right-detail">
          <div className="detail-name">
            <h2>{product.name}</h2>
          </div>
          <div className="detail-price">
          {product.deal!==""?
          <p className="product-sale">${product.deal} - <span>${product.price}</span></p>
          :<p>${product.price}</p>
          }
          </div>
          <div className="review-rate">
            {
              [...Array(product.rate)].map((obj,indx)=><i key={indx} className="fa-solid fa-star" />)
            }
          </div>
          <div className="detail-desc">
            <p>
              {product.description}
            </p>
          </div>
          <div className="detail-control">
            <div className="quantity">
              <input name="" type="number" min={1} defaultValue={1}  onChange={handleChange} />
            </div>
            <div className="buy-btn">
              <button onClick={()=>handleAdd(product)}>ADD TO CART</button>
            </div>
          </div>
          <div className='add-wishlist'>
            <button onClick={()=>handleWish(product)}>
            <i className="fa-regular fa-heart"></i>
            Add to Wishlist
            </button>
          </div>
          <div className="feature-area">
            <div className="feature-box">
              <div className="feature-img">
                <img src={service} alt="" />
              </div>
              <div className="feature-text">
                <h3>SUPPORT 24/7</h3>
              </div>
            </div>
            <div className="feature-box">
              <div className="feature-img">
                <img src={service2} alt="" />
              </div>
              <div className="feature-text">
                <h3>SUPPORT 24/7</h3>
              </div>
            </div>
            <div className="feature-box">
              <div className="feature-img">
                <img src={service3} alt="" />
              </div>
              <div className="feature-text">
                <h3>SUPPORT 24/7</h3>
              </div>
            </div>
          </div>
          <div className="product-detail-meta">
            <ul>
              <li>
                <span>SKU:</span> WX-256HG
              </li>
              <li>
                <span>Categories:</span> Home, Electronic
              </li>
              <li>
                <span>Tag:</span> {product.tag}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="nav-tab">
        <div className="tabs">
          <div className="tab-item active">Description</div>
          <div className="tab-item">Specification</div>
          <div className="tab-item">Review</div>
          <div className="line" />
        </div>
        <div className="tab-content">
          <div className="tab-pane active">
            <p>
             {product.description}
            </p>
          </div>
          <div className="tab-pane">
            <p>
              {product.specification}
            </p>
          </div>
          <div className="tab-pane">
            <p>
              {product.review}
            </p>
          </div>
        </div>
      </div>
      <div className="related-area">
        <div className='related-title'>
          <h2>Related Products</h2>
        </div>
        <div className='related-carousel'>
          <Slider {...settings}>
            {
              related ===[]?<div></div>
              : related.filter((pr)=>pr.id!==location.state.id).map((prod)=>{
              return <div className="product-box"  key={prod.id}>
                    <div className="product-action">
                    <div className="product-action-btn">
                        <button onClick={()=>handleWish(prod)}>
                        <i className="fa-solid fa-heart" />
                        </button>
                    </div>
                    <div className="product-action-btn">
                        <i className="fa-solid fa-code-compare" />
                    </div>
                    
                    </div>
                    <div className="img-box">
                     
                        <img src={prod.imglink} alt="#" />
                       
                    </div>
                    <div className="info-box">
                    <div className="product-name">
                        <Link to='/product-detail' state={{id:prod.id,tag:prod.tag}}>
                        {prod.name}
                        </Link>
                    </div>
                    <div className="info-bottom">
                        <div className="evaluate">
                        <div className="item-price">
                            <p>${prod.price}</p>
                        </div>
                        <div className="rate">
                        {
                        [...Array(prod.rate)].map((obj,indx)=><i key={indx} className="fa-solid fa-star" />)
                        }
                        </div>
                        </div>
                        <div className="card-btn">
                        <button onClick={()=>handleAdd(prod)}>
                            <i className="fa fa-cart-shopping" />
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                }) 
            }
          </Slider>
        </div>
      </div>
    </div>
</div>

   </>
  )
}

export default ProductDetail