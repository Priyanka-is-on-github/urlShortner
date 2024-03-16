const express = require("express");
const app = express();
const cors = require("cors")

const PORT = 1332;
const router = require("./routes/authRoutes");

//middlewares

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use("/api/v1", router);
app.use("/", router);

app.listen(PORT , ()=>{
    console.log("server is running at port number",PORT);
});