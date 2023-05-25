import { hashPassword } from "../helpers/authHelper.js";
import  userModel from "../models/userModel.js";

export const registerController=async(req,res)=>{
    try{
        const {name,email,password,phone,address} = req.body;

        if (!name) {
            return res.status(400).send({error:"Name is required"})
        }
        if (!email) {
            return res.status(400).send({error:"email is required"})
        }
        if (!password) {
            return res.status(400).send({error:"password is required"})
        }
        if (!phone) {
            return res.status(400).send({error:"phone is required"})
        }
        if (!address) {
            return res.status(400).send({error:"address is required"})
        }

        const existingUser = await userModel.findOne({email}).exec();
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:"Already registered please login",
            })
        }

        const hashedPassword = await hashPassword(password);

        const user = await new userModel({name,email,phone,address,password:hashedPassword}).save();

        res.status(201).send({
            succes:true,
            message:"User Registered sucessfully",
            user,
        })
    } catch(err){
        console.log(err);
        res.status(500).send({
            succes:false,
            message:"Error in registration",
            err,
        })
    }
};

