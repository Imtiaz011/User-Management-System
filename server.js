import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyparser from "body-parser";
import path from "path";
import {fileURLToPath} from 'url';
import route from './server/routes/router.js';
import connectDB from "./server/database/connections.js";

const app = express();

//creating PORT
dotenv.config({path:"config.env"});
const PORT = process.env.PORT||8080

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body-parser
app.use(express.json());
app.use(bodyparser.urlencoded({extened:true}));

//set view engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine","ejs");

//dedicate folder for ejs files
//app.set("views",path.resolve(__dirname,"views/ejs"));

//load assests
app.use("/css",express.static(path.resolve(__dirname,"assets/css")));
app.use("/img",express.static(path.resolve(__dirname,"assets/img")));
app.use("/js",express.static(path.resolve(__dirname,"assets/js")));

app.use("/",route);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}/`)
});
