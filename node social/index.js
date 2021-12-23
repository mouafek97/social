const express = require("express")
const app = express() ; 
const helmet = require ("helmet")
const mongoose =require("mongoose")
const morgan =require("morgan")
const dotenv = require("dotenv")
const User = require("./models/User")
const path = require("path")

const multer =require('multer')
var cors = require('cors')
app.use(cors())

//midelware

app.use(express.json());
app.use(helmet()) ; 
app.use(morgan("common")) ; 



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null,file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
//iumportation des routes 
const authRoute = require("./routing/authRoute")
const postRoute = require("./routing/postRoute")
const userRoute = require("./routing/userRoute")

dotenv.config() ; 
mongoose.connect
(process.env.mongu_url)
.then(()=>console.log('db connection succuful '))
.catch((err)=>{
    console.log(err);
} )
app.use("/images" , express.static(path.join(__dirname , "public/images")))

app.use("/post",postRoute)
app.use("/user",userRoute)
app.use("/auth",authRoute)

app.listen(8000,()=>{
    console.log("backend serveur is running  ")
})
var cors = require('cors')

