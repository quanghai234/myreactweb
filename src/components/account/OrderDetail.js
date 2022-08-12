import React from 'react'

const OrderDetail = (props) => {

    const detail = props.detail;
    
    return (
    <>
        <div className='order-detail-area'>
            <table className='order-detail-table'>
                <thead>
                    <tr>
                        <th className='prd-name'>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                     detail.map((pr)=>{
                    return <tr key={pr.id}>
                        <td>{pr.name}</td>
                        <td>{pr.price} $</td>
                        <td>{pr.quantity}</td>
                        <td>{pr.price*pr.quantity} $</td>
                    </tr>
                    })
                    }
                </tbody>
            </table>
        </div>
    </>
  )
}

export default OrderDetail