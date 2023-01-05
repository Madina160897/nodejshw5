const express = require("express");
const cors = require("cors");
const bodYPaser = require("body-parser");
const carsRouter = require("./routers/carsRouter");
const app = express();

app.use(cors());
app.use(bodYPaser.json()); 
app.use(bodYPaser.urlencoded({extended: false})); 
 
app.use("/cars", (req, res, next) => {
    console.log("Middleware");
    next();
})

app.use("/cars", carsRouter);



app.listen(8080, () => {
    console.log("Server started");
});