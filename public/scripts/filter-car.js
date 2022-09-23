class Car {
  constructor(cars) {
    this.cars = cars;
  }
  filterCarAvailable(cars) {
    const result = [];
    for (let i = 0; i < cars.length; i++) {
      if (cars[i].available) {
        result.push(cars[i]);
      }
    }
    return result;
  }
  filterCarNotAvailable(cars) {
    const result = [];
    for (let i = 0; i < cars.length; i++) {
      if (cars[i].available === false) {
        result.push(cars[i]);
      }
    }
    return result;
  }
  filterCarBySelected() {
    let driver = document.getElementById("driver").value;
    let date = document.getElementById("tanggal").value;
    let time = document.getElementById("jemput").value;

    let capacity = document.getElementById("jmlPenumpang").value;

    if (driver === undefined || driver == "") {
      alert("Please select a driver");
    } else if (driver.value === "dengan-supir") {
      return this.filterCarAvailable(this.cars);
    } else if (driver.value === "tanpa-supir") {
      return this.filterCarNotAvailable(this.cars);
    } else if (dateTime === undefined || dateTime === "") {
      alert("Please select Date and Time");
    } else if (capacity == "" && driver.value == "dengan-supir") {
      return this.cars.filter((mobil) => {
        mobil.available === true && mobil.availableAt <= dateTime;
      });
    } else if (capacity != "" && driver.value == "dengan-supir") {
      return this.cars.filter(
        (mobil) =>
          mobil.available === true &&
          mobil.capacity >= capacity &&
          mobil.availableAt <= dateTime
      );
    } else if (capacity == "" && driver.value == "tanpa-supir") {
      return this.cars.filter(
        (mobil) => mobil.available === false && mobil.availableAt <= dateTime
      );
    } else if (capacity != "" && driver.value == "tanpa-supir") {
      return this.cars.filter(
        (mobil) =>
          mobil.available === false &&
          mobil.capacity >= capacity &&
          mobil.availableAt <= dateTime
      );
    }
  }
}

// const XMLHttpRequest = require('xhr2');

// Ambil data dari cars.min.js
let xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "http://localhost:3000/cars", false);
xmlHttp.send(null); // Request body null

const listCar = JSON.parse(xmlHttp.responseText);
console.log(listCar);

// Initiate obj
const car = new Car(listCar);

// Ambil button search
const btnSearch = document
  .getElementById("btn-search")
  .addEventListener("click", () => {
    document.getElementById("halo").innerHTML = "Halo from backend";
  });

const cobaInner = () => {
  let tes = (document.getElementById("halo").innerHTML = "Halo From Backend");
};

function getCars() {
  let htmlData = "";
  data = cars;
  if (data === "" || data === undefined) {
    htmlData = "";
    app.innerHTML = htmlData;
    return;
  } else {
    for (let index = 0; index < data.length; index++) {
      let car = data[index];

      htmlData += `
            <div class="col m-2">
                <div class="card" style="width: 20rem; height: 450px">
                <img src="${car.image}"" class="img-fluid card-img-top " alt="${car.manufacture}" style="object-fit: scale-down; height: 200px; ">
                <div class="card-body" style="font-size: 14px;">
                    <p class="card-title">${car.manufacture} ${car.model}</p>
                    <p class="fw-bold">Rp. ${car.rentPerDay} / hari</p>
                    <p class="card-text" style="height: 85px">${car.description}</p>
                    <div class=""><i class="bi bi-people me-2"></i>${car.capacity} Orang</div>
                    <div class=""><i class="bi bi-gear me-2"></i>${car.transmission}</div>
                    <div class=""><i class="bi bi-calendar4 me-2"></i>${car.year}</div>
                    <a href="#" class="btn bg-button text-white w-100 mt-2 fw-bold mt-4" style="font-size: 14px;">Pilih Mobil</a>
                </div>
                </div>
            </div>
            `;
    }
    app.innerHTML = htmlData;
    if (htmlData == "") {
      alert("No car available");
    }
  }
}
