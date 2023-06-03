import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout.js'
import UserMenu from '../../components/layout/UserMenu'
import axios from 'axios'
import  toast  from 'react-hot-toast'
import { useAuth } from '../../context/Auth.js'
const Profile = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [auth,setAuth] = useAuth();
    /*get user data */
    useEffect(()=>{
        const {email,name,phone,address} =auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    },[auth?.user])
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.put("/api/v1/auth/profile", {
                name,
                email,
                password,
                phone,
                address,
                
              });
              if(data?.error){
                toast.error(data?.error);
              } else{
                setAuth({...auth,user:data?.updatedUser});
                let ls = localStorage.getItem("auth");
                ls=JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth",JSON.stringify(ls));
                toast.success("Profile UpdatedSucessfully");
              }
        } catch(err){
            console.log(err);
            toast.error("something went wrong");
        }

    }
  return (
    <Layout title={'your profile'}>
    <div className='container-fluid m-3 p-3 dashboard'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu />
            </div>
            <div className='col-md-9'>
                <div className="form-container ">
                    <form onSubmit={handleSubmit}>
                    <h4 className="title">USER PROFILE</h4>
                    <div className="mb-3">
                        <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Your Name"
                        autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Your Email "
                        disabled
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Enter Your Password"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Your Phone"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Your Address"
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">
                        UPDATE
                    </button>
                    </form>
        </div>
            </div>
        </div>
    </div>
</Layout>
  )
}

export default Profile