import React, {useState, useEffect} from 'react'
import Layout from './../../components/layout/Layout.js'
import UserMenu from '../../components/layout/UserMenu.js'
import { useAuth } from '../../context/Auth.js'
import axios from 'axios'
import moment from "moment";

const Orders = () => {

    const [orders,setOrders] = useState([]);
    const [auth,setAuth] = useAuth();

    const getOrders = async() =>{
        try{
            const {data} = await axios.get("/api/v1/auth/orders");
            setOrders(data)
        } catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        if(auth?.token) getOrders();
    },[auth?.token])

  return (
    <Layout title={'your orders'}>
    <div className='container-fluid m-3 p-3 dashboard'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu />
            </div>
            <div className='col-md-9'>
                <h1>all orders</h1>
                {orders?.map((o, index) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sno</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-2">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="50px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8 ms-5">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            </div>
        </div>
    </div>
</Layout>
  )
}

export default Orders