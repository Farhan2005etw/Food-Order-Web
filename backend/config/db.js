import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://farhan786etw:Khan786@cluster0.hgfiw6g.mongodb.net/food-del')
    .then(() => {
        console.log('DB Connected')
    })
}

