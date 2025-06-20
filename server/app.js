// server.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import { users } from "./Routes/UserRouter.js";
import { admin } from "./Routes/AdminRoutes.js";
import dotenv from 'dotenv'
dotenv.config();


const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.use('/images', express.static('public/images'));

app.use("/user", users);
app.use("/admin", admin);

app.get('/',(req,res)=>{
  res.send({
    activeStatus:true,
    error:false
  })
})
app.listen(process.env.PORT, () => {
  console.log("Server running on http://localhost:3000");
});
