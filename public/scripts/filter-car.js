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
    let dateTime = date + time;
    var capacity = document.getElementById("jmlPenumpang").value;

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

let btnFilterCar = document
  .getElementById("btnFilterCar")
  .addEventListener("click", getCars);

function getDateTimeNow() {
  let today = new Date();
  let date =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");
  let time =
    String(today.getHours()).padStart(2, "0") +
    ":" +
    String(today.getMinutes()).padStart(2, "0") +
    ":" +
    String(today.getSeconds()).padStart(2, "0");
  let dateNow = date + "T" + time + ".000Z";
  return dateNow;
}

function getCars() {
  let htmlData = "";
  data = cars.filtermobil();
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
