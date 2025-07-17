import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//Login User
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email})
        if (!user) {
           return res.json({success:false, message:"User Not Found"})                       
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
           return res.json({success:"false", message:"Invalid Credential"})
        }
        const token = createToken(user._id)
        res.json({success:"true", token})
    
    } catch (error) {
        console.log(error);
        return res.json({success:false, message:"Error"})       
        
    }
    
}

const createToken =  (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}
 
//register User
const registerUser = async (req, res) => {
    const {name, email, mobile, password} = req.body;
    try {
        const exist = await userModel.findOne({email});
        //Checking is user already Exist
        if(exist) {
            return res.json({success: false, message: "User already exist"})
        }

        //Validating Email format and Password Stength
        if(!validator.isEmail(email)) {
            return res.json({succes: false, message: "Please Enter a Valid Email"})            
        }
        if(password.length < 8) {
            return res.json({success: false, message:"Please Enter a Strong Password"})
        }

        if(mobile.length !== 10) {
            return res.json({success:false, message:"Please Enter a Valid Mobile No"})
        }

        //Hashing User Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newUser = new userModel({name, email, password:hashedPassword , mobile})
        
        const user = await newUser.save() 
        const token = createToken(user._id)
        res.json({success:true, token})

        
    } catch (error) {
        console.log(error);
        return res.json({success:false, message:"Error"})        
        
    }
    
}

export {loginUser, registerUser}
