import axios from '../api/products'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React, { useState,useEffect, useRef } from 'react';
import Slider from "react-slick";
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {motion} from 'framer-motion';
import Brand from '../assets/images/brand.png';
import Brand2 from '../assets/images/brand 2.png';



 const Home = () => {
    
    const dispatch = useDispatch();
    const handleAdd=(prod)=>
    dispatch({
      type:'ADD_TO_CART',
      payload:{...prod,quantity:1}
    })
    const handleWish=(prod)=>dispatch({
        type:'ADD_TO_WISHLIST',
        payload:prod
    })
    //  framer motion
    const carousel = useRef()
    const [width,setWidth] = useState(0)
   
    useEffect(()=>{
        setWidth(carousel.current.scrollWidth-carousel.current.offsetWidth);
    })

    // call api
    const [list,setList] = useState([]);
    const [customer,setCustomer] = useState([]);
    const [banner,setBanner] = useState([]);

    useEffect(()=>{
        window.scrollTo(0,0)
        const getProduct = async()=>{
            return await axios.get('/product')
            .then((resp)=>setList(resp.data))
            .catch((err)=>console.log(err))
        }
        const getCustomerReview = async()=>{
            return await axios.get('/customerreview')
            .then((resp)=>setCustomer(resp.data))
            .catch((err)=>console.log(err))
        }
        const getBanner = async()=>{
            return await axios.get('/banner')
            .then((resp)=>setBanner(resp.data))
            .catch((err)=>console.log(err))
        }
        getProduct()
        getCustomerReview()
        getBanner()
        
    },[])

    // product list
    const featureProduct = list.slice(0,6).map((prod,indx)=>{
        return  <div className="product-box " key={indx}>
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
                    <Link to='/product-detail' state={{id:prod.id,tag:prod.tag}}>
                        <img src={prod.imglink} alt="#" />
                    </Link>
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
                        {prod.deal!==""?
                                        <p className="product-sale">${prod.deal} - <span>${prod.price}</span></p>
                                        :<p>${prod.price}</p>
                                        }
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
    const topRateProduct = list.sort((a,b)=>b.rate-a.rate).slice(0,3).map((prod,indx)=>{
        return  <div className="horizontal-product-box" key={indx}>
        <div className="img-box">
            <Link to='/product-detail' state={{id:prod.id,tag:prod.tag}}>
             <img src={prod.imglink} alt="#" />
            </Link>
        </div>
        <div className="info-box">
            <div className="product-name">
            <Link  to='/product-detail' state={{id:prod.id,tag:prod.tag}}>{prod.name}</Link>
            </div>
            <div className='info-bottom'>

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
    const popularProduct = list.sort((a,b)=>b.rate-a.rate).slice(0,7).map((prod,indx)=>{
        return <motion.div className="product-box item" key={indx}>
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
                <img src={prod.imglink} alt={prod.name} /> 
        </div>
        <div className="info-box">
        <div className="product-name">
            <Link to='/product-detail' state={{id:prod.id,tag:prod.tag}}>{prod.name}</Link>
        </div>
        <div className="info-bottom">
            <div className="evaluate">
            <div className="item-price">
            {prod.deal!==""?
                                        <p className="product-sale">${prod.deal} - <span>${prod.price}</span></p>
                                        :<p>${prod.price}</p>
                                        }
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
                </motion.div>
    })
    const bestSeller = list.sort((a,b)=>b.rate-a.rate).slice(0,8).map((prod,indx)=>{ 
        return   <motion.div className="product-box item" key={indx}>
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
            <Link to='/product-detail' state={{id:prod.id,tag:prod.tag}}>{prod.name}</Link>
        </div>
        <div className="info-bottom">
            <div className="evaluate">
            <div className="item-price">
            {prod.deal!==""?
                                        <p className="product-sale">${prod.deal} - <span>${prod.price}</span></p>
                                        :<p>${prod.price}</p>
                                        }
            </div>
            <div className="rate">
            {
                    [...Array(prod.rate)].map((obj,indx)=><i key={indx} className="fa-solid fa-star" />)
                }
                
            </div>
            </div>
        </div>
        </div>
    </motion.div>
    })
    // const showReview = customer.map((review,indx)=>{
    //     return  <div className="swiper-slide testimonial-box" key={indx}>
    //                 <div className="testimonial-img-box">
    //                     <img src={review.imglink} alt="#" />
    //                 </div>
    //                 <div className="testimonial-info">
    //                     <div className="testi-name">
    //                     <p>{review.name}</p>
    //                     </div>
    //                     <div className="comment">
    //                     <p>
    //                        {review.review}
    //                        {" "}
    //                     </p>
    //                     </div>
    //                     <div className="rate">
    //                     {
    //                         [...Array(review.rate)].map((obj,indx)=>
    //                         <i key={indx} className="fa-solid fa-star" />)
    //                     }
    //                     </div>
    //                 </div>
    //              </div>
    // })
    const upperBanner = banner.slice(0,2).map((banner,indx)=>{
        return <div className="banner-info" 
                style={{backgroundImage:`url(${banner.img})`}}
                key={indx}>
                    <p>{banner.discount}</p>
                    <h3>{banner.title}</h3>
                    <Link to='/product'>
                    SHOP NOW <i className="fa fa-arrow-right" />
                    </Link>
                </div>
    })
    const underBanner = banner.slice(2).map((banner,indx)=>{
        return <div className="banner-info" 
        style={{backgroundImage:`url(${banner.img})`}}
        key={indx}>
            <p>{banner.discount}</p>
            <h3>{banner.title}</h3>
            <Link to='/product'>
            SHOP NOW <i className="fa fa-arrow-right" />
            </Link>
        </div>
    })

    // Slider setting
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        initialSlide: 0,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
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
    const dealSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
              breakpoint: 980,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
                breakpoint:550,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true
                }
              }
        ]
      };
    const brandSettings = {
        dots: false,
        arrows:false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                
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
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
          ]
      };

      const Ref = useRef(null);
  
      //  Timer
      const [timer, setTimer] = useState('');
    
      useEffect(()=>{
        const tomorrow  = new Date(); 
        tomorrow.setDate(tomorrow.getDate() + 1);

            let countDown = new Date(`${tomorrow.toDateString()} 00:00:00`).getTime();

            let count = setInterval(function(){
                let now = new Date().getTime()
                
                let distance = countDown-now;
               
                let hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
                let minutes = Math.floor((distance%(1000*60*60))/(1000*60));
                let seconds = Math.floor((distance%(1000*60))/1000);

                setTimer(hours+"h "+minutes+"m "+seconds+"s")

                if(distance<0){
                    clearInterval(count);
                }
                
            },1000)
      },[])
      

      
  return (
    <>
    <div className="container">
        <div className="product-area">
            <div className="left-product">
            <div className="daily-deal-box">
                <div className="deal-header">
                <p>Daily Deals!</p>
                <div className="deal-controll">
                   
                </div>
                </div>
                <div className="deal-item">
                    <div className="time-wrap">
                        <div className="time-wrap-line">
                        <div className='time-count'>
                           <span>{timer}</span>
                        </div>
                        </div>
                    </div>
                    <div className="deal-wrap">
                        <Slider {...dealSettings}>
                        {
                        list.filter(pr=>pr.deal!=="").slice(0.5).map((prod)=>{
                        return <div className="product-box " key={prod.id}>
                                <div className="product-action">
                                <div className="product-action-btn">
                                    <i className="fa-solid fa-heart" />
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
                                        {prod.deal!==""?
                                        <p className="product-sale">${prod.deal} - <span>${prod.price}</span></p>
                                        :<p>${prod.price}</p>
                                        }
                                    </div>
                                    <div className="rate">
                                    {
                                        [...Array(prod.rate)].map((obj,indx)=><i key={indx} className="fa-solid fa-star" />)
                                    }
                                    </div>
                                    </div>
                                    <div className="card-btn">
                                    <button>
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
            <div className="right-product">
            <div className="title">
                <h3>Featured Products!</h3>
            </div>
            <div className="product-list">
                
                 {featureProduct}
                
            </div>
            </div>
        </div>
        <div className="product-banner-area">
            <div className="upper-banner">
                {upperBanner}
            </div>
        </div>
        <div className="product-area">
            <div className="top-rate">
            <div className="title">Top Rated Products!</div>
            <div className="top-rate-product">
                {topRateProduct}
            </div>
            </div>
            <div className="popular-categories">
            <div className="title">Popular Categories</div>
            <motion.div ref={carousel} 
                className="carousel" 
                whileTap={{cursor:"grabbing"}}>
                <motion.div 
                drag="x" 
                dragConstraints={{right:0,left:-(width-200)}} 
                className="inner-slider">
                    {popularProduct}
                </motion.div>
            </motion.div>
            </div>
        </div>
        <div className="testimonial-area">
            <div className="title">Customer Review</div>
            <Slider {...settings}>

                {customer.map((review,indx)=>{
                return  <div className="testimonial-box" key={indx}>
                    <div className="testimonial-img-box">
                        <img src={review.imglink} alt="#" />
                    </div>
                    <div className="testimonial-info">
                        <div className="testi-name">
                            <h3>{review.name}</h3>
                        </div>
                        <div className="comment">
                        <p>
                           {review.review}
                           {" "}
                        </p>
                        </div>
                        <div className="rate">
                        {
                            [...Array(review.rate)].map((obj,indx)=>
                            <i key={indx} className="fa-solid fa-star" />)
                        }
                        </div>
                    </div>
                 </div>
                })}
            </Slider>
               
        </div>
        <div className="product-area best-seller">
            <div className="title">
            <p>Best Sellers</p>
            </div>
            <div className="best-sale-carousel">
            <motion.div ref={carousel} 
                className="bsl-product-list carousel" 
                whileTap={{cursor:"grabbing"}}>
                <motion.div 
                    drag="x" 
                    dragConstraints={{right:0,left:-width}} 
                    className="inner-slider">
                    {bestSeller}
                </motion.div>
            </motion.div>
            </div>
        </div>
        <div className="product-banner-area">
            <div className="under-banner"  >
            {underBanner}
            </div>
            
        </div>
        <div className="brand-area">
            <div className="brand-contain">
            <Slider {...brandSettings}>
            <div className="brand">
                <img src={Brand} alt="#" />
            </div>
            <div className="brand">
                <img src={Brand2} alt="#" />
            </div>
            <div className="brand">
                <img src={Brand} alt="#" />
            </div>
            <div className="brand">
                <img src={Brand2} alt="#" />
            </div>
            <div className="brand">
                <img src={Brand} alt="#" />
            </div>
            <div className="brand">
                <img src={Brand2} alt="#" />
            </div>
            <div className="brand">
                <img src={Brand} alt="#" />
            </div>
            <div className="brand">
                <img src={Brand2} alt="#" />
            </div>
            </Slider>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home