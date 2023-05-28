import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignin = async(req,res,next)=>{
    try{
        const decode = JWT.verify(req.headers.authorization, process.env.JwT_SECRET);
        req.user = decode;
        next();
    } catch(err) {
        console.log(err);
    }
};

export const isAdmin =async(req,res,next) =>{
    try{
        const user = await userModel.findById(req.user._id);
        if(user?.roles !== 1){
            return res.status(200).send({
                success: false,
                message:"Unauthorised user",
            });
        } else{
            next();
        }
    } catch(err) {
        res.status(401).send({
            success:false,
            message:"Error in Admin middleware",
            err,
        })
        console.log(err);
    }
}