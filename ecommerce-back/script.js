const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const path = require("path")
const {filetopath}= require("url")
const app = express();
const moongo = require("mongoose")
const parser = require("cookie-parser")
const routers = require("./route/router")
const cors = require("cors")
app.use(express.json());
app.use(parser())
app.use(cors({
    origin:"https://ecommerce-s74m.onrender.com",
    credentials: true
}));

const __filename = fileURLToPath("https://ecommerce-s74m.onrender.com/")
const __dirname = path.dirname(__filename)

// Frontend build folder
app.use(express.static(path.join(__dirname, "dist")))

// IMPORTANT
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})

moongo.connect(process.env.MONGO)
.then(
    ()=>{ console.log("connected mongo db")}
)
.catch(
    (err)=>{ console.error("there is an errror in the mango db ...."+err)}
)

app.use("/",routers);






const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{ console.log(`port is running in ${PORT}`)})