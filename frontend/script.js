const carsBlock = document.querySelector(".cars_block");
const createCarBtn = document.querySelector("#create_car_btn");
const putCarBtn = document.querySelector("#put_car_btn");

const BASE_URL = "http://localhost:8080";
const loadData = async () => {
    const responseCars = await fetch(BASE_URL + "/cars");
    const cars = await responseCars.json();

    carsBlock.innerHTML = "";

    for (const car of cars) {
        carsBlock.innerHTML += `
        <p>
            ${car.model} 
            <button onclick="deleteCar(${car.id})">Delete</button>
        </p>
            `;
    }
};
loadData();

createCarBtn.addEventListener("click", () => {
    const newCarModel = document.querySelector("#new_car_model").value;
    const payload = {
        model: newCarModel,
    };
    fetch(BASE_URL + "/cars", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(payload)
    })
        .then(() => loadData())
        .catch(() => alert("Car create error"));
})

const deleteCar = id => {
    fetch(BASE_URL + "/cars/" + id, { method: "delete" })
        .then(() => loadData())
        .catch(() => alert("Car delete error"));
}

putCarBtn.addEventListener("click", () => {
    const responseCars = fetch(BASE_URL + "/cars");
    const cars = responseCars.json();

    const changeCarId = document.querySelector("# put_car_id").value;
    const changeCarModel = document.querySelector("#put_car_model").value;
    const someData = {
        id: changeCarId,
        model: changeCarModel,
    }

    const putMethod = {
        method: 'PUT',
        headers: {
         'Content-type': 'application/json; charset=UTF-8' 
        },
        body: JSON.stringify(someData)
       }
       
       fetch(BASE_URL + "/cars", putMethod)
       .then(cars = responseCars.json())
       .then(() => loadData())
       .catch(() => alert("Car create error"))
})
