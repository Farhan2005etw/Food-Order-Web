import express from "express"
import cors from "cors"
import { connect } from "mongoose"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'


//app config
const app = express()
const port = 4000

//Middlewares
app.use(express.json())
app.use(cors())

//DB Connection
connectDB();


//api endpoints
app.use('/api/food',foodRouter)
app.use("/images", express.static('uploads'))
app.use('/api/user', userRouter)

app.get("/", (req, res, ) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}` )
})

// mongodb+srv://farhan786etw:Khan786@cluster0.hgfiw6g.mongodb.net/?