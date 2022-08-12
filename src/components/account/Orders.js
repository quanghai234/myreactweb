import React, { useEffect, useState } from 'react';
import axios from '../../api/products';
import OrderDetail from './OrderDetail';

const Orders = () => {
    const userid = localStorage.getItem("userid")
    const [list,setList] = useState([])
    useEffect(()=>{
        const getOrder = async()=>{
            await axios.get(`bill?createBy=${userid}`)
            .then(resp=>setList(resp.data))
            .catch(err=>console.log(err))
        }   
        getOrder()
    },[])
    
    const [show,setShow] = useState(false);
    const [data,setData] = useState([]);

    const handleView=(e,order)=>{
        e.preventDefault()
        setData(order.listItem)
        setShow(!show)
    }

  return (
    <>
        <div className='myaccount-content'>
            <h3>Orders</h3>
            <div className='order-table'>
                <table>
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((order,indx)=>{
                        return <tr key={order.id}>
                            <td>{indx+1}</td>
                            <td>{order.createAt}</td>
                            <td>{order.total} $</td>
                            <td>
                                <button onClick={(e)=>handleView(e,order)}>View</button>
                            </td>
                        </tr>
                        })}
                        
                    </tbody>
                </table>
            </div>
        </div>
        { show ?
        <div className='myaccount-content order-detail'>
            <h3 >Orders Detail</h3>
            <OrderDetail detail={data} />
        </div>
        :  null
        }
    </>
  )
}

export default Orders