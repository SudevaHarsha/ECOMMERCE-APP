import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import  userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController=async(req,res)=>{
    try{
        const {name,email,password,phone,address} = req.body;

        if (!name) {
            return res.status(400).send({message:"Name is required"})
        }
        if (!email) {
            return res.status(400).send({message:"email is required"})
        }
        if (!password) {
            return res.status(400).send({message:"password is required"})
        }
        if (!phone) {
            return res.status(400).send({message:"phone is required"})
        }
        if (!address) {
            return res.status(400).send({message:"address is required"})
        }

        const existingUser = await userModel.findOne({email}).exec();
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"Already registered please login",
            })
        }

        const hashedPassword = await hashPassword(password);

        const user = await new userModel({name,email,phone,address,password:hashedPassword}).save();

        res.status(201).send({
            success:true,
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

export const loginController= async(req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password",
            })
        }
        const user = await userModel.findOne({email}).exec();
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered",
            })
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(404).send({
                success:false,
                message:"Invalid password",
            })
        }
        const token = JWT.sign({ _id:user._id}, process.env.JWT_SECRET,{
            expiresIn:"7d",
        });
        res.status(200).send({
            success:true,
            message:'login sucessfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token,
        });
    } catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error in login",
            err,
        })
    }
};

export const testController = (req,res) =>{
    try{
        res.send("Protected Routes")
    } catch(err){
        console.log(err);
        res.send({err});
    }
    console.log("protected Route");
};

