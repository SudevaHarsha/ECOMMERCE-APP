import React, {useState, useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserInfo = () => {

  const [user,setUser] = useState([]);
  const params = useParams();

  const getUser = async()=>{
    const id = params.id;
    const {data} = await axios.get(`/api/v1/auth/user/${id}`);
    if(data?.success) {
      setUser(data?.user);
    }
  };

  useEffect(()=>{
    getUser();
  },[])

  return (
    <Layout>
        <div className='row dashboard ms-5'>
          <div className="border shadow">
                  <table className="table">
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
        </div>
    </Layout>
  )
}

export default UserInfo