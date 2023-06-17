import React, {useState, useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import moment from 'moment';

const UserInfo = () => {

  const [user,setUser] = useState([]);
  const [orders,setOrders] = useState([]);
  const [roles,setRoles] = useState();
  const [auth] = useAuth();
  const params = useParams();

  const getUser = async()=>{
    try{
      const {data} = await axios.get(`/api/v1/auth/user/${params.id}`);
      if(data?.success) {
        setUser(data?.user);
      }
    } catch(error){
      console.log(error);
  }
  };

  const handleRole = async(id,role)=>{
    /* console.log(role); */
    
    /* if(role===1){
      setRoles(0);
    } else{
      setRoles(1);
    } */
    try{
      const {data} = await axios.put(`/api/v1/auth/user-role/${id}`,{role})
      getUser();
    } catch(error){
      console.log(error);
    }
  }

  const getOrders = async() =>{
    try{
        const {data} = await axios.get(`/api/v1/auth/user-orders/${params.id}`);
        setOrders(data)
    } catch(error){
        console.log(error);
    }
  };

  useEffect(()=>{
    if(params.id && auth.token) getUser();
  },[params.id,auth.token]);

  useEffect(()=>{
    if(auth?.token) getOrders();
  },[auth?.token])

  return (
    <Layout>
        <div className='container dashboard text-center'>
          <div className="border shadow text-center">
                  <table className="table bordered">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <td>{user.name}</td>
                      </tr>
                      <tr>
                        <th scope="col">Role</th>
                        <td>{user.roles ? "Admin" : "User"}</td>
                      </tr>
                      <tr>
                        <th scope="col">Email</th>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <th scope="col">Phone</th>
                        <td>{user.phone}</td>
                      </tr>
                      <tr>
                        <th scope="col">Address</th>
                        <td>{user.address}</td>
                      </tr>
                    </thead>
                  </table>
          </div>
          <button className='btn btn-secondary mt-5 text-center' onClick={()=>{handleRole(user._id,user.roles)}}>Change role</button>
          { orders ? <div className='col-md-12 mt-4 '>
                <h1 className='mt-5'>users orders</h1>
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
                            width="70px"
                            height={"120px"}
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
            </div> : <div className='col-md 9'> <p className='text-center'>No orders yet</p></div>
          }
        </div>
    </Layout>
  )
}

export default UserInfo