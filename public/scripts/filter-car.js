class Car {
  constructor(cars) {
    this.cars = cars;
  }
  filterCarBySelected() {
    let driver = document.getElementById("driver").value;
    let date = document.getElementById("tanggal").value;
    let time = document.getElementById("jemput").value;

    let capacity = document.getElementById("jmlPenumpang").value;

    if (driver == "" || driver == undefined) {
      alert("Please Select Driver Type");
    } else if (date == "" || date == undefined) {
      alert("Please Select the Date");
    } else if (time == "" || time == undefined) {
      alert("Please Select The Time");
    } else if (driver == "dengan-supir") {
      const result = [];
      for (let i = 0; i < this.cars.length; i++) {
        let x = date.slice(0, 4);
        if (
          this.cars[i].available &&
          this.cars[i].year >= x &&
          this.cars[i].capacity >= capacity
        ) {
          result.push(this.cars[i]);
        }
      }
      return result;
    } else if (driver == "tanpa-supir") {
      const result = [];
      for (let i = 0; i < this.cars.length; i++) {
        let x = date.slice(0, 4);
        if (
          this.cars[i].available &&
          this.cars[i].year >= x &&
          this.cars[i].capacity >= capacity
        ) {
          result.push(this.cars[i]);
        }
      }
      return result;
    }
  }
}

let xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "http://localhost:3000/cars", false);
xmlHttp.send(); // Request body null

// Initiate obj Car
let cars = new Car(JSON.parse(xmlHttp.responseText));

let btnSearch = document
  .getElementById("btn-search")
  .addEventListener("click", () => {
    // Ambil id carsList
    let list = document.getElementById("carsList");
    let text = "";
    let data = cars.filterCarBySelected();
    if (data === "" || data === undefined) {
      text = "Data Belum di Initiate";
      list.innerHTML = text;
      return;
    } else {
      for (let index = 0; index < data.length; index++) {
        let car = data[index];
        text += `
      <div class="col-md">
        <div class="card" style="width: 18rem;">
          <img src="${car.image}" class="card-img-top" alt="${car.manufacture}">
          <div class="card-body">
            <h5 class="card-title">${car.manufacture} ${car.model}</h5>
            <p class="fst fst-bold">Rp. ${car.rentPerDay} / hari</p>
            <p class="card-text">${car.description}</p>
            <div class="">${car.capacity} Orang</div>
            <div class="">${car.transmission}</div>
            <div class="">${car.year}</div>
            <a href="" class="btn btn-success w-100 mt-2 fw-bold" style="font-size: 14px;">Pilih Mobil</a>
          </div>
        </div>
      </div>
      `;
      }
      list.innerHTML = text;
      if (text == "") {
        document.getElementById("notMatch").innerHTML = `
        <div class="alert alert-danger " style="padding: 10px 10px 10px 10px; margin-left: auto; margin-right: auto; margin-top: -80px; width: 50%;" role="alert">
          No Car Found!
        </div>
        `;
      }
    }
  });
