import React, { useState,useEffect } from 'react'

const CardProduct = (props) => {

    const [quantity,setQuantity] = useState(1)
    useEffect(()=>{
        setQuantity(props.card.quantity)
     },[props.card.quantity])

     const subTotal = (product)=>{
      if(props.card.deal!==""){
        return parseInt(product.deal) * product.quantity
      }else{
        return product.price * product.quantity
      }
     }
     const handleDelete = () =>{
        props.handleDelete(props.card.id)
      }
    const handleUpdate=()=>{
        props.handleUpdate(props.card.id, quantity)
    }

  return (
    <tr className="card-product" >
    <td className="product-thumbnail">
      <img src={props.card.imglink} alt="#" />
    </td>
    <td className="product-name">
      <a href="#">
        <h3>{props.card.name}</h3>
      </a>
    </td>
    <td className="product-price">
    {props.card.deal!==""?
    <p className="product-sale">${props.card.deal} - <span>${props.card.price}</span></p>
    :<p>${props.card.price}</p>
    }
    </td>
    <td className="product-quantity">
      <input type="number" value={quantity} min={1} onChange={(e)=>setQuantity(e.target.value)} />
    </td>
    <td className="product-subtotal">
      <span>${subTotal(props.card)}</span>
    </td>
    <td className="product-remove">
        <button onClick={handleUpdate}>
            <i className="fa-solid fa-pen"></i>
        </button>
        <button onClick={handleDelete}>
            <i className="fa-solid fa-trash-can" />
        </button>
    </td>
  </tr>
  )
}

export default CardProduct