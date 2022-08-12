import React, { useEffect, useState } from 'react'
import axios from '../api/products'
import{Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ReactPaginate from 'react-paginate'


const ProductList = () => {
  
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

  // danh sach san pham
  const [list,setList]=useState([]);

  useEffect(()=>{
    window.scrollTo(0,0)
    const getProduct = async()=>{
      await axios.get("/product")
      .then((resp)=>setList(resp.data))
      .catch((err)=>console.log(err))
    }
    
    getProduct()
  },[]) 

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

  const pageCount = Math.ceil(list.length / prodPerPage)
  const changePage = ({selected})=>{
    setPageNum(selected)
  }

  //Sort
  const [sortBy,setsortBy]=useState();
  const [category,setCategory] = useState();

  const handleSort = (e)=>{
    setsortBy(e.target.value)
  }

  const handleCategory = (e)=>{
    setCategory(e.target.value)
  }

  let proDis = [];


  if(category===undefined&&sortBy===undefined){
    proDis = list
  }
  else if(sortBy==='default'){
    setsortBy(undefined);
    setCategory(undefined);
  }
  else if(category!==undefined&&sortBy!==undefined){
    let result = list.filter(pr=>{ return( pr.tag===category) })
    if(sortBy==='lowtohight'){
      proDis = result.sort((a,b)=>a.price-b.price)
    }else if(sortBy==='highttolow'){
      proDis = result.sort((a,b)=>b.price-a.price)
     }else if(sortBy==='bestseller'){
      proDis = result.sort((a,b)=>a.sold-b.sold)
    }
  }
  else if(category!==undefined||sortBy!==undefined){
    if(category!==undefined){
      proDis = list.filter(pr=>{ return( pr.tag===category) })
    }else{
      if(sortBy==='default'){
        proDis = [...list]
      }else if(sortBy==='lowtohight'){
        proDis=list.sort((a,b)=>a.price-b.price)
      }else if(sortBy==='highttolow'){
        proDis= list.sort((a,b)=>b.price-a.price)
      }else if(sortBy==='bestseller'){
        proDis= list.sort((a,b)=>a.sold-b.sold)
      }
    }
  }
  
  

  const displayProduct = proDis.slice(curPage,curPage+prodPerPage).map((prod)=>{
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
                {
                prod.deal!==""?
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
      <div className="sidebar-area">
        <div className='category-area'>
          <div className='category-title'>
            <h3>Category</h3>
          </div>
          <div className='category-list'>
            <div className='category-btn'>
              <button value='headphone' onClick={(e)=>handleCategory(e)}>
              <i className="fa-solid fa-headphones-simple"></i>
              Headphone 
              </button>
            </div>
            <div className='category-btn'>
              <button value='game' onClick={(e)=>handleCategory(e)}>
              <i className="fa-solid fa-gamepad"></i>
               Gaming 
              </button>
            </div>
            <div className='category-btn'>
              <button value='speaker' onClick={(e)=>handleCategory(e)}>
              <i className="fa-brands fa-soundcloud"></i>
               Protable Speakers
              </button>
            </div>
            <div className='category-btn'>
              <button value='home electric' onClick={(e)=>handleCategory(e)}>
              <i className="fa-solid fa-tv"></i>
              Home Appliances
              </button>
            </div>
          </div>
        </div>
        <div className='side-banner' >
          
          <div className='side-banner-img'>
            <img src='https://htmldemo.net/elehaus/elehaus/assets/images/shop/banner/21.png' alt='Banner'></img>
            </div> 
        </div>
      </div>
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
              previousLabel={"<"}
              nextLabel={">"}
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
          {displayProduct}
        </div>
        :<div className="list-product">
          {displayProduct}
        </div>
        }
        <div className="under-control">
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

    </>
  )
}

export default ProductList