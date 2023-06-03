import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "antd/es/layout/layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setusers] = useState([]);
  const navigate = useNavigate();

  //getall users
  const getAllusers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-users");
      setusers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong in fecthing all users");
    }
  };

  const handleDelete =async(id)=>{
    try{
        const {data}= await axios.delete(`/api/v1/auth/delete-user/${id}`);
        if (data.success) {
            toast.success('user is deleted');
            getAllusers();
          } else {
            toast.error(data.message);
          }
    }catch(error){
        console.log(error);
        toast.error("some thing went wrong in deleting user")
    }
  }

  //lifecycle method
  useEffect(() => {
    getAllusers();
  }, []);
  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Users List</h1>
          <div className="d-flex flex-wrap">
          <div className='w-75'>
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                                {users?.map((u) =>{
                                    return <>
                                    <tr>
                                        <td key={u._id}>{u.name}</td>
                                        <td>
                                            <button className='btn btn-primary ms-2'onClick={()=>{navigate(`/dashboard/admin/user-info/${u._id}`)}}>deatils</button>
                                            <button className='btn btn-danger ms-2'onClick={()=>{handleDelete(u._id)}}>delete</button>
                                        </td>
                                    </tr>
                                    </>
                                })}
                           
                        </tbody>
                        </table>

                    </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;