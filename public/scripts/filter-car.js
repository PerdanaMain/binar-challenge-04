class Car {
  constructor(cars) {
    this.cars = cars;
  }
  filterCarAvailable() {
    return this.cars.filter((mobil) => mobil.available === true);
  }
  filterCarNotAvailable() {
    return this.cars.filter((mobil) => mobil.available === false);
  }
  filterCarBySelected() {
    let driver = document.getElementById("driver").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let dateTime = date + time;
    var capacity = document.getElementById("capacity").value;

    if (driver === undefined || driver == "") {
      alert("Please select a driver");
    } else if (driver.value === "dengan-supir") {
      return this.filterCarAvailable(this.cars);
    } else if (driver.value === "tanpa-supir") {
      return this.filterCarNotAvailable(this.cars);
    } else if (dateTime === undefined || dateTime === "") {
      alert("Please select the date");
    } else if (capacity == "" && driver.toString() == "true") {
      return this.cars.filter(
        (mobil) => mobil.available === true && mobil.availableAt <= dateTime
      );
    } else if (capacity != "" && driver.toString() == "true") {
      return this.cars.filter(
        (mobil) =>
          mobil.available === true &&
          mobil.capacity >= capacity &&
          mobil.availableAt <= dateTime
      );
    } else if (capacity == "" && driver.toString() == "false") {
      return this.cars.filter(
        (mobil) => mobil.available === false && mobil.availableAt <= dateTime
      );
    } else if (capacity != "" && driver.toString() == "false") {
      return this.cars.filter(
        (mobil) =>
          mobil.available === false &&
          mobil.capacity >= capacity &&
          mobil.availableAt <= dateTime
      );
    }
  }
}
