import 'dotenv/config'

import  express from "express";
const app = express();

import cors from "cors";
import bodyParser from 'body-parser';
import  {connectToMongoDB} from "../connection.js";
import userRoutes from "./routes/user.routes.js";

app.use(cors({
    origin: 'https://dhiravproject.onrender.com', // Change to your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization'
  }));
// app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use(bodyParser.json());

app.use("/api/v1/users", userRoutes);

const dbUrl = process.env.ATLASDB_URL;
connectToMongoDB(dbUrl)
    .then((result) => {
        console.log("DB connected")
    }).catch((err) => {
        console.log("DB not connected", err)
    });
app.use("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(8080,()=>{
    console.log("Server Started");
});