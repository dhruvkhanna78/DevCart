import User from "../models/User.js"
import { addAddress } from "./addressController.js";


//Update user carrt: /api/cart/update
export const updateCart = async (req,res) =>{
    try{
        const {userId, cartItems} = req.body
        await User.findByIdAndUpdate(userId, {cartItems});
        res.json({success:true, message: "Cart Updated"});
    } catch(error){
        console.log(error.message);
        return res.json({success:false, message:error.message});
    }
}

//Get Address: /api/cart/get

export const getAddress = async(req,res) =>{
    try{
        const {userId} = req.body;
        const addresses = await Address.find({useerId})
        res.json({success:true, addresses})
    } catch(error){
         console.log(error.message);
        return res.json({success:false, message:error.message});
    }
}