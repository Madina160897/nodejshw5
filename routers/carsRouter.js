const express = require("express");
const router = express.Router();
const fs = require("fs")

router.get("/cars", (req, res) => {
    console.log("cars router");
    res.send(fs.readFileSync("./routers/cars.json", { encoding: "utf-8" }));
});

router.get("/:id", (req, res) => {
    const id = +req.params.id;
    const carsArray = JSON.parse(fs.readFileSync("./routers/cars.json", { encoding: "utf-8" }));
    const car = carsArray.find(car => car.id === id);
    res.send(car);
});

router.post("/cars", (req, res) => {
    const carsArray = JSON.parse(fs.readFileSync("./routers/cars.json", { encoding: "utf-8" }));
    fs.writeFileSync("./routers/cars.json", JSON.stringify([...carsArray, { id: carsArray.length + 1, model: req.body.model }]));
    res.send("cars added");
});

router.put("/cars", (req, res) => {
    const { id, model } = req.body;
    const idCar = carsArray.find(item => item.id === +id);
    idCar.id = id;
    idCar.model = model;
    res.status(201).send("ok");
});

router.delete("/cars/:id", (req, res) => {
    carsArray = carsArray.filter(item => item.id !== +req.params.id)
    res.status(200).send("ok");
});

module.exports = router;