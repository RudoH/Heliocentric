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
      geoSunset = timeToMinutes(geoSunset);

      let timeInMins = 600;
      let sunrise = 480;
      let sunset = 1200;
      let dayLength = 720;
      let timePassed = (timeInMins - sunrise) / dayLength;
      console.log(`hours: ${hours} - minutes: ${minutes}`);
      console.log(timeInMins);

      drawSun(timePassed);
    });

  function drawSun(timePassed) {
    let sun = document.createElement("img");
    sun.src =
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/Emojione_2600.svg";
    sun.style.width = "100px";
    sun.style.height = "100px";
    sun.style.position = "absolute";
    sun.style.zIndex = 100;
    console.log(timePassed);
    sun.style.left = `${window.innerWidth * timePassed}px`;
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
    const colon = TimeString.indexOf(":");
    const hours = timeString.slice(0, colon);
    const minutes = timeString.slice(colon + 1, colon + 3);
    return (hours * 60) + minutes
  }

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
});
