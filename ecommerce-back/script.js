const express = require("express")
const app = express();
const moongo = require("mongoose")
const parser = require("cookie-parser")
const routers = require("./route/router")
const cors = require("cors")
app.use(express.json());
app.use(parser())
app.use(cors({
    origin: "https://ecommerce-website-7662.onrender.com",
    credentials: true
}));

moongo.connect("mongodb+srv://vippismart_db_user:QH0arsdNuQ1otaGI@cluster0.g5fywdi.mongodb.net//ecommerce?retryWrites=true&w=majority")
.then(
    ()=>{ console.log("connected mongo db")}
)
.catch(
    (err)=>{ console.error("there is an errror in the mango db ...."+err)}
)

app.use("/",routers);






const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{ console.log(`port is running in ${PORT}`)})