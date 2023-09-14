import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import morgan from 'morgan'
import cors from "cors";
import path from 'path'
import authRoutes from './routes/authRoute.js'
import productRoutes from './routes/productRoutes.js'
import { fileURLToPath } from 'url';


//configure ev
dotenv.config()

//database config
connectDB()

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express()

//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./frontend/build')))



//routes
app.use('/api/v1/auth',authRoutes)
app.use("/api/v1/product", productRoutes);


//rest api
app.use('*', function(req, res) {
  res.sendFile(path.join(__dirname,'./frontend/build/index.html'))
})

//port
const PORT = process.env.PORT || 8080

//run listen
app.listen(PORT, ()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`)
})