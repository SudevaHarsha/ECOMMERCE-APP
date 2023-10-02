import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import  userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";

export const registerController=async(req,res)=>{
    try{
        const {name,email,password,phone,address,answer} = req.body;

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
        if (!answer) {
            return res.status(400).send({message:"answer is required"})
        }

        const existingUser = await userModel.findOne({email}).exec();
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"Already registered please login",
            })
        }

        const hashedPassword = await hashPassword(password);

        const user = await new userModel({name,email,phone,address,password:hashedPassword,answer}).save();

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
                role:user.roles,
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

export const forgetPasswordController = async(req,res) =>{
    try{
        const{email,answer,newPassword}=req.body
        if(!email){
            res.status(400).send({message:'email is required'})
        }
        if(!answer){
            res.status(400).send({message:'answer is required'})
        }
        if(!newPassword){
            res.status(400).send({message:'newPassword is required'})
        }

        const user = await userModel.findOne({email, answer})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong Email Or Answer",
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, {password:hashed});
        res.status(200).send({
            success: true,
            message:"Password Reset Successfully",
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went worng",
            error
        })
    }
}

export const testController = (req,res) =>{
    try{
        res.send("Protected Routes")
    } catch(err){
        console.log(err);
        res.send({err});
    }
    console.log("protected Route");
};

export const updateProfileController =async(req,res) =>{
    try{
        const {name,email,password,address,phone}=req.body;
        const user = await userModel.findOne({email:email})
        console.log(user);
        if(password && password.length <6){
            return res.json({error:'password is required add 6 charcter long'})
        }
        const hashedPassword =password ? await hashPassword(password) :undefined
        const updatedUser = await userModel.findByIdAndUpdate(user._id,{
            name:name||user.name,
            password:hashedPassword||user.password,
            phone:phone||user.phone,
            address:address||user.address

        },{new:true});
        res.status(200).send({
            success:true,
            message:"updated successfully",
            updatedUser,
        })
    }catch(err){
        console.log(err);
        res.status(400).send({
            success:false,
            message:"Error while update profile",
            err
        });
    }
};

export const getOrdersController =async(req,res) =>{
    try{
        const orders = await orderModel.find({buyer:req.user}).populate("products","-photo").populate("buyer","name");
        res.json(orders);
    } catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error while getting orders",
            err
        });
    }
}

export const getAllOrdersController =async(req,res) =>{
    try{
        const orders = await orderModel.find({}).populate("products","-photo").populate("buyer","name").sort({createdAt:"-1"});
        res.json(orders);
    } catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error while getting orders",
            err
        });
    }
}

export const orderStatusController =async(req,res) =>{
    try{
        const {orderId} = req.params;
        const {status} = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId, {status},{new:true});
        res.json(orders);
    } catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error while getting status orders",
            err
        });
    }
};

export const getAllUsersController =async(req,res) =>{
    try{
        const users = await userModel.find({});
        res.status(200).send({
            success:true,
            message:"successfully obtained users",
            users
        });
    } catch(err){
        console.log(err);
        res.status(400).send({
            success:false,
            message:"Error while getting users",
            err
        });
    }
}

export const deleteUserController =async(req,res) =>{
    try{
        const user=await userModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success:true,
            message:"deleted user successfully"
        })
    } catch(err){
        console.log(err);
        res.status(400).send({
            success:false,
            message:"Error while deleting users",
            err
        });
    };
};

export const getUsersByIdController =async(req,res) =>{
    try{
        const user = await userModel.findById(req.params.id);
        res.status(200).send({
            success:true,
            message:"user obtained successfully",
            user
        })
    } catch(err){
        console.log(err);
        res.status(400).send({
            success:false,
            message:"Error while getting user by id",
            err
        });
    };
};

export const usersRoleController =async(req,res) =>{
    try{
        
        let role=req.body.role;
        /* role ? role=0 : role=1; */
        role = role ? 0 : 1;
        
        const user = await userModel.findByIdAndUpdate(req.params.id,{roles:role},{new:true});
        res.status(200).send({
            success:true,
            message:"user updated successfully",
            user
        })
    } catch(err){
        console.log(err);
        res.status(400).send({
            success:false,
            message:"Error while getting user by id",
            err
        });
    };
};


export const getUserOrdersController =async(req,res) =>{
    try{
        const user = await userModel.findById(req.params.uid);
        console.log(user);
        const orders = await orderModel.find({buyer:user}).populate("products","-photo").populate("buyer","name");
        res.json(orders);
    } catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error while getting orders",
            err
        });
    };
};