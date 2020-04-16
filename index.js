window.addEventListener("load", function () {
  // geolocation
  let coords = [];
  userLocation();
  console.log(coords);

  const url =
    "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let currentTime = new Date();
      let hours = currentTime.getHours();
      let minutes = currentTime.getMinutes();

      // sunrise
      let geoSunrise = data.results.sunrise;
      let geoSunset = data.results.sunset;
      geoSunrise = timeToMinutes(geoSunrise);
      geoSunset = timeToMinutes(geoSunset) + 60 * 12;

      console.log(geoSunrise, geoSunset);

      let timeInMins = 2 * 60;
      let timePassed;
      // console.log(`hours: ${hours} - minutes: ${minutes}`);
      console.log(timeInMins);
      if (timeInMins >= geoSunrise && timeInMins <= geoSunset) {
        timePassed = (timeInMins - geoSunrise) / (geoSunset - geoSunrise);
        drawSun(timePassed, "day");
      } else {
        if (timeInMins > geoSunset) {
          timePassed =
            (timeInMins - geoSunset) / (24 * 60 - geoSunset + geoSunrise);
        } else {
          timePassed = timeInMins / (24 * 60 - geoSunset + geoSunrise);
        }
        drawSun(timePassed, "night");
      }
    });

  function drawSun(timePassed, timeOfDay) {
    let sun = document.createElement("img");
    if (timeOfDay === "day") {
      sun.src =
        "https://upload.wikimedia.org/wikipedia/commons/e/e3/Emojione_2600.svg";
    } else if (timeOfDay === "night") {
      sun.src =
        "https://images.vexels.com/media/users/3/137782/isolated/preview/5317233afd8c42be610172dc89c5dd18-realistic-moon-by-vexels.png";
      document.body.style.background = "rgb(40, 40, 40)";
    }
    sun.style.width = "100px";
    sun.style.height = "100px";
    sun.style.position = "absolute";
    sun.style.zIndex = 100;
    console.log(timePassed);
    sun.style.left = `${window.innerWidth * timePassed}px`;
    console.log(`${Math.abs(timePassed - 0.5) * 350}px`);
    sun.style.top = `${Math.abs(timePassed - 0.5) * 350}px`;
    const body = document.getElementById("body");
    body.prepend(sun);
  }

  function userLocation() {
    if (navigator.geolocation) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition((position) => {
        let userLat = position.coords.latitude;
        console.log(userLat);
        let userLng = position.coords.longitude;
        coords.push(userLat);
        coords.push(userLng);
        return;
      });
    }
  }

  function timeToMinutes(timeString) {
    const colon = timeString.indexOf(":");
    const stringHrs = Number(timeString.slice(0, colon));
    const stringMins = Number(timeString.slice(colon + 1, colon + 3));
    console.log(stringMins);
    console.log(stringHrs);
    return stringHrs * 60 + stringMins;
  }
});

// console.log(sunrise);
// let currentTime = new Date();
// let hours = currentTime.getHours();
// let minutes = currentTime.getMinutes();
// console.log(`hours: ${hours} - minutes: ${minutes}`);

//
// fetch sunset and sunrise from API
// const url =
//   "https://api.sunrise-sunset.org/json?lat=" +
//   userLatitude.toString() +
//   "&lng=" +
//   userLongitude.toString() +
//   "&date=today";
// fetch(url)
//   .then((data) => data.JSON())
//   .then((data) => {
//     console.log(data);
//   });
// }

// API for sunset/sunrise times?

// get user longitude/latitude

// https://api.sunrise-sunset.org/json.

// fetch();

// function getLocation() {
//   console.log("entered getlocation function");
//   // get geolocation
//   if ("geolocation" in navigator) {
//     console.log("if statement true");
//     navigator.geolocation.getCurrentPosition(function success(position) {
//       //   userLatitude = position.coords.latitude;
//       //   userLongitude = position.coords.longitude;
//       //   return userLatitude.toString();
//       return [position.coords.latitude, position.coords.longitude];
//     });
//   } else {
//     console.log("no geolocation");
//   }
// }
