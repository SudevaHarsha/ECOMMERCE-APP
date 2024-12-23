import { useState,useEffect } from "react";
import { useAuth } from "../../context/Auth.js";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner.js";

export default function PrivateRoute(){
    const [ok,setOk]= useState(false);
    const [auth,setAuth] = useAuth();

    useEffect(()=>{
        const authCheck = async() =>{
            const res = await axios.get('https://ecommerce-backend-nxza.onrender.com/api/v1/auth/user-auth')
            console.log(res)
            if(res.data.ok) {
                setOk(true);
            } else{
                setOk(false);
            }
        };
        if(auth?.token) setOk(true);
    },[auth?.token])

    return ok ? <Outlet /> :<Spinner />;
}