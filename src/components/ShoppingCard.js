import axios from '../api/products'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import CardProduct from './CardProduct'



const ShoppingCard = () => {
 
  const product = useSelector(state=>state.cart.card)
  const dispatch = useDispatch()
 
  
  const handleDelete =(id)=>dispatch({
    type:'DELETE_CART',
    payload:id
  })
  const handleUpdate = (id,update)=>
  dispatch({
    type:'UPDATE_CART',
    payload:{id,update}
  })
  const handlePay = (e)=>{
    e.preventDefault();
    updateBill();
    clearCart();
  }
  const clearCart = ()=>dispatch({
    type:'PAY'
  })

  const createDate = new Date();
  const buyer = localStorage.getItem("userid")
  const updateBill = async()=>{
    await axios.post("bill",
    {createAt:createDate.toDateString(),createBy:buyer,total:shipping(),listItem:product})
    .catch(err=>console.log(err))
  }

  const showCardProduct = product.map((prod,index)=>{
    return  <CardProduct key={index} card={prod} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
  })


  const logged = localStorage.getItem('logged');
  let buybtn ;
  if(logged==="true"){
    buybtn = <button onClick={(e)=>handlePay(e)}>
              PROCEED TO CHECKOUT
            </button>
  }else{
    buybtn = <button onClick={()=>toast.info('You need to login to purchase',
            {position:'top-center',})}>
              <Link to="/login">PROCEED TO CHECKOUT</Link>
            </button>
  }


  var subTotal = 0;

  const subTotalCount = (card)=>{
    for(let i=0;i<card.length;i++){
      if(card[i].deal!==""){
        subTotal += parseInt(card[i].deal) * card[i].quantity
        
      }else{
        subTotal += parseInt(card[i].price) * card[i].quantity
      }
    }
    return subTotal
    
  }
  
  const [ship,setShip] = useState(0);
  const shipping = ()=>{
    return subTotal+parseInt(ship)
  }

  

  return (
   <>
   <div className="container">
  <div className="card-table">
    <div className="card-wrap">
      <table>
        <thead>
          <tr className="table-header">
            <th className="width-thumbnail" />
            <th className="width-name">PRODUCT</th>
            <th className="width-price">PRICE</th>
            <th className="width-quantity">QUANTITY</th>
            <th className="width-subtotal">SUBTOTAL</th>
            <th className="width-remove" />
          </tr>
        </thead>
        <tbody>
          {showCardProduct}
        </tbody>
      </table>
    </div>
      <div className="back-to-shop">
        <a href="#" className="back-btn">
          BACK TO SHOP
        </a>
      </div>
  </div>
  <div className="card-controll">
    <div className="col-card">
      <div className="col-card-header">Caculate Shipping</div>
      <select name="" id="">
        <option value="">contry 1</option>
        <option value="">contry 2</option>
      </select>
      <input className="col-input" type="text" placeholder="Town / City" />
      <input className="col-input" type="text" placeholder="PostCode / ZIP" />
      <div className="col-button">
        <a href="#">Update</a>
      </div>
    </div>
    <div className="col-card">
      <div className="col-card-header">Caculate Shipping</div>
      <label htmlFor="">Enter your coupon code</label>
      <input className="col-input" type="text" placeholder="Discount" />
      <div className="col-button">
        <a href="#">Apply Coupon</a>
      </div>
    </div>
    <div className="col-card ">
      <div className="subtotal-card">
        <div className="total">
          <h5>Subtotal</h5>
          <span>{subTotalCount(product)}$</span>
        </div>
        <div className="shipping-check">
          <p>Shipping</p>
          <div className="check-area">
            <input type="radio" name="shipping" id="shipping1" value="0" onChange={(e)=>setShip(e.target.value)} />
            <label htmlFor="shipping1">Free Shipping</label>
          </div>
          <div className="check-area">
            <input type="radio" name="shipping" id="shipping2" value="100"  onChange={(e)=>setShip(e.target.value)} />
            <label htmlFor="shipping2">Flat rate: $100.00</label>
          </div>
          <div className="check-area">
            <input type="radio" name="shipping" id="shipping3" value='120'  onChange={(e)=>setShip(e.target.value)} />
            <label htmlFor="shipping3">Local pickup: $120.00</label>
          </div>
        </div>
        <div className="total">
          <h5>Total</h5>
          <span>{shipping()}$</span>
        </div>
      </div>
      <div className="buy-btn-link">
         {buybtn}
      </div>
    </div>
  </div>
</div>

   </>
  )
}

export default ShoppingCard