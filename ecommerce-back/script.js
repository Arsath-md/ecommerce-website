const express = require("express")
const app = express();
const moongo = require("mongoose")
const parser = require("cookie-parser")
const routers = require("./route/router")
const cors = require("cors")
app.use(express.json());
app.use(parser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

moongo.connect("mongodb://localhost:27017/ecommerce")
.then(
    ()=>{ console.log("connected mongo db")}
)
.catch(
    (err)=>{ console.error("there is an errror in the mango db ...."+err)}
)

app.use("/",routers);






const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{ console.log(`port is running in 000`)})