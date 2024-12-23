import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth.js";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("https://ecommerce-backend-nxza.onrender.com/api/v1/auth/admin-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.user?.role === 1) setOk(true);
  }, [auth?.user?.roles]);

  return ok ? <Outlet /> : <Spinner path="" />;
}