import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import axios from '../api/products'
import { useDispatch } from 'react-redux'
import ReactPaginate from 'react-paginate'

const Search = () => {


    const local = useLocation()
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


    const [searchList,setsearchList] = useState([]);
    const [newProduct,setNewProduct] = useState([]);
    useEffect(()=>{
      
        const getResult = async()=>{
            return await axios.get('/product?name_like='+local.state)
            .then((resp)=>{setsearchList(resp.data)})
            .catch((err)=>{console.log(err)})  
        }
        const getProduct = async()=>{
            return await axios.get('/product')
            .then((resp)=>{setNewProduct(resp.data)})
            .catch((err)=>{console.log(err)})  
        }
        getResult()
        getProduct()
    },[local.state])
    
  
        
    const [sortBy,setsortBy]=useState('');
    const handleSort = (e)=>{
        setsortBy(e.target.value)
      }

      if(sortBy==='lowtohight'){
        searchList.sort((a,b)=>a.price-b.price)
      }else if(sortBy==='highttolow'){
        searchList.sort((a,b)=>b.price-a.price)
      }else if(sortBy==='bestseller'){
        searchList.sort((a,b)=>a.sold-b.sold)
      }

      const [grid,setGrid] = useState(true);

      //Pagination
      const [pageNum,setPageNum] = useState(0)
    
      if(grid===true){
         var prodPerPage = 9
        }
      else{
         prodPerPage = 10
      }
    
    const curPage = pageNum*prodPerPage
  
    const pageCount = Math.ceil(searchList.length / prodPerPage)
    const changePage = ({selected})=>{
      setPageNum(selected)
    }

    const showList =searchList.slice(curPage,curPage+prodPerPage).map((prod)=>{
            return grid?<div className="product-box" key={prod.id}>
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
            <Link to="/product-detail" state={{id:prod.id,tag:prod.tag}}>
              <img src={prod.imglink} alt="#" />
            </Link>
            </div>
            <div className="info-box">
              <div className="product-name">
                <Link to="/product-detail" state={{id:prod.id,tag:prod.tag}} > 
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
                  <button  onClick={()=>handleAdd(prod)}>
                    <i className="fa fa-cart-shopping" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          :<div className="horizontal-product-box" key={prod.id}>
        <div className="img-box">
            <Link to='/product-detail' state={{id:prod.id,tag:prod.tag}}>
              <img src={prod.imglink} alt="#" />
            </Link>
        </div>
        <div className="info-box">
            <div className="product-name">
            <Link  to='/product-detail' state={{id:prod.id,tag:prod.tag}}>{prod.name}</Link>
            </div>
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
        
    })

    return (
        <>
    <div className="pr-container">

      <div className="product-area product-page">
        <div className="controller">
            <div className="left-control">
            <div className="display">
              <button className="display-style" onClick={()=>setGrid(!grid)}>
                {grid?
                <i className="fa-solid fa-table-cells-large" />
                :
                <i className="fa-solid fa-list" />
                }
              </button>
              
            </div>
            <div className="sorting">
              <select name="sort" id="sort" onChange={handleSort}>
                <option value="default">Default</option>
                <option value="bestseller">Best Seller</option>
                <option value="lowtohight">Price:Low to Hight</option>
                <option value="highttolow">Price:Hight to Low</option>
              </select>
            </div>
          </div>
        <div className="right-control">
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"page-control"}
          disabledClassName={"pagination-disable"}
          activeClassName={"pagination-active"}
        />
        </div>
        </div>
        {grid?
        <div className="grid-product">
          {showList}
        </div>
        :<div className="list-product">
          {showList}
        </div>
        }
        <div className="under-control search-page-controll">
        <div className='back-to-home'>
            <Link to='/' className='back'>
                Back To Home
            </Link>
        </div>
        <div className="page-control ">
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"page-control"}
          disabledClassName={"pagination-disable"}
          activeClassName={"pagination-active"}
        />
        </div>
        </div>
      </div>

      <div className="recent-post">
            <div className="post-wrap">
                <div className="post-title">
                <h3>New Product</h3>
                </div>
                {
                    newProduct.slice(0,4).map((product)=>{
                        return <div className="post-blog" key={product.id}>
                        <div className="post-img">
                            <img src={product.imglink} alt="#" />
                        </div>
                        <div className="post-desc">
                            <Link to="/product-detail" state={{id:product.id,tag:product.tag}}>
                            <h5>{product.name}</h5>
                            </Link>
                            <div className="evaluate">
                                <div className="item-price">
                                    <p>${product.price}</p>
                                </div>
                                <div className="rate">
                                {
                                [...Array(product.rate)].map((obj,indx)=><i key={indx} className="fa-solid fa-star" />)
                                }
                                </div>
                            </div>
                        </div>
                        </div>
                    })
                }
        </div>
      </div>
      
    </div>
    </>
  )
}

export default Search