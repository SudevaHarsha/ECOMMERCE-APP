import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js'
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);



app.get('/',(req,res)=>{
    res.send({
        message : "welcome to ecommerce app"
    })
})

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    connectDB();
    console.log(`server running sucessfully on ${PORT}`.bgCyan.white);
})

/* const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    connectDB()
      .then(() => {
        console.log("Server is running !!!");
      })
      .catch((error) => {
        console.log("Server is running, but database connection failed...");
        console.log(error);
  });
  }); */