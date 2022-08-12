import React from 'react'
import { useSelector,useDispatch } from 'react-redux'

const Wishlist = () => {

    
    const wishList = useSelector(state=>state.wishlist.wishlist) 
   
    const dispatch = useDispatch();
    const handleAdd=(prod)=>dispatch({
      type:'ADD_TO_CART',
      payload:{...prod,quantity:1}
    })
    const handleDelete=(id)=>dispatch({
        type:'DELETE_WISHLIST',
        payload:id
    })
  return (
    <>
        <div className='wish-table-area'>
            <table className='wish-list'>
                <thead>
                    <tr>
                        <th className='wl-remove'></th>
                        <th className='wl-thumbnail'></th>
                        <th className='wl-productname'>PRODUCT</th>
                        <th className='wl-price'>UNIT PRICE</th>
                        <th className='wl-stock'>STOCK STATUS</th>
                        <th className='wl-to-cart'></th>
                    </tr>
                </thead>
                <tbody>
                    { wishList===[]? <tr></tr>
                    :   wishList.map((wish)=>{ 
                    return <tr key={wish.id}>
                        <td>
                            <button className='remove-btn' onClick={()=>handleDelete(wish.id)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </td>
                        <td>
                            <div className='wl-img'>
                            <a href='#'>
                            <img src={wish.imglink}></img>
                            </a>
                            </div>
                        </td>
                        <td className='wl-pr-name'>
                            <a href='#'>{wish.name}</a>
                        </td>
                        <td>
                            <p>${wish.price}</p>
                        </td>
                        <td><i className="fa-solid fa-check"></i> In Stock</td>
                        <td className='add-btn'>
                            <button className='add-to-cart' onClick={()=>handleAdd(wish)}>
                                ADD TO CART
                            </button>
                        </td>
                    </tr>})
                    }
                </tbody>
            </table>
        </div>
    </>
  )
}

export default Wishlist