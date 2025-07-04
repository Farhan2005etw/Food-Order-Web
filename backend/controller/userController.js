import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success: false, message:"User Not Found"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({success:false, message:"Invalid Credentials"})            
        }

        const token = createToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
        
    }

}

//Token

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}


//register user

const registerUser = async (req, res) => {
    const {name, email, password, mobile} = req.body;
    try{
        //Checking is user already exist
        const exist = await userModel.findOne({email})
        if (exist) {
            return res.json({success:false, message: "User Already Exist"})            
        }

        //validating email format and strong password
        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Please Enter Valid Email"})
        }
        if(password.length>8) {
            return res.json({success: false, message: "Please Enter a Strong Password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        //Creating New User
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
            mobile:mobile
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true, token});
     

    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Error"})       

    }

}

export {loginUser,registerUser}
