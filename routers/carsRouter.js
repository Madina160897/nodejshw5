const express = require("express");
const router = express.Router();
const fs = require("fs")

router.get("/", (req, res) => {
    console.log("cars router");
    res.send(fs.readFileSync("./routers/cars.json", { encoding: "utf-8" }));
});

router.get("/:id", (req, res) => {
    const id = +req.params.id;
    const carsArray = JSON.parse(fs.readFileSync("./routers/cars.json", { encoding: "utf-8" }));
    const car = carsArray.find(car => car.id === id);
    res.send(car);
});

router.post("/", (req, res) => {
    const carsArray = JSON.parse(fs.readFileSync("./routers/cars.json", { encoding: "utf-8" }));
    fs.writeFileSync("./routers/cars.json", JSON.stringify([...carsArray, { id: carsArray.length + 1, model: req.body.model }]));
    res.send("cars added");
});

router.put("/", (req, res) => {
    const { id, model } = req.body;
    const carsArray = JSON.parse(fs.readFileSync("./routers/cars.json", { encoding: "utf-8" }));
    const idCar = carsArray.find(item => item.id === +id);
    idCar.id = id;
    idCar.model = model;
    fs.writeFileSync("./routers/cars.json", JSON.stringify(carsArray, idCar))
    res.status(201).send("ok");
});

router.delete("/:id", (req, res) => {
    const id = +req.params.id;
    const carsArray = JSON.parse(fs.readFileSync("./routers/cars.json", { encoding: "utf-8" }));
    fs.writeFileSync("./routers/cars.json", JSON.stringify(carsArray.filter(car => car.id !== id)))
    res.status(200).send("ok");
    res.send("User deleted");
});

module.exports = router;