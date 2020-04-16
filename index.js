window.addEventListener("load", function () {
  getLocation()

  function getData(userLat, userLng) {
    fetch(`https://api.sunrise-sunset.org/json?lat=${userLat}&lng=${userLng}&date=today`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let currentTime = new Date();
        let timezone = currentTime.getTimezoneOffset();
        console.log(timezone)
        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();

        // sunrise
        let geoSunrise = data.results.sunrise;
        let geoSunset = data.results.sunset;
        // let geoSunrise = "1:31:07 PM"
        // let geoSunset = "2:47:13 AM"
        console.log(geoSunrise, geoSunset)
        geoSunrise = timeToMinutes(geoSunrise) - timezone;
        if (geoSunrise < 0) geoSunrise += 60 * 12
        geoSunset = (timeToMinutes(geoSunset) + 60 * 12 - timezone);
        if (geoSunset < 720) geoSunset += 60 * 12
        console.log(geoSunrise, geoSunset)

        let timeInMins = hours * 60 + minutes;
        console.log(`current time ${hours}h:${minutes}mins || Time in mins ${timeInMins}`)
        let timePassed;
        // console.log(`hours: ${hours} - minutes: ${minutes}`);
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
  }

  function drawSun(timePassed, timeOfDay) {
    let sun = document.createElement("img");
    if (timeOfDay === "day") {
      sun.src =
        "https://upload.wikimedia.org/wikipedia/commons/e/e3/Emojione_2600.svg";
    } else if (timeOfDay === "night") {
      setDarkMode()
      sun.src =
        "https://images.vexels.com/media/users/3/137782/isolated/preview/5317233afd8c42be610172dc89c5dd18-realistic-moon-by-vexels.png";
    }
    sun.style.width = "100px";
    sun.style.height = "100px";
    sun.style.position = "absolute";
    sun.style.zIndex = 100;
    // console.log(timePassed);
    sun.style.left = `${window.innerWidth * timePassed}px`;
    // console.log(`${Math.abs(timePassed - 0.5) * 350}px`);
    sun.style.top = `${Math.abs(timePassed - 0.5) * 350}px`;
    const body = document.getElementById("body");
    body.prepend(sun);
  }

  function timeToMinutes(timeString) {
    const colon = timeString.indexOf(":");
    const stringHrs = Number(timeString.slice(0, colon));
    const stringMins = Number(timeString.slice(colon + 1, colon + 3));
    console.log(stringHrs);
    console.log(stringMins);
    return stringHrs * 60 + stringMins;
  }

  function getLocation() {
    if (navigator.geolocation) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition((position) => {
        userLat = position.coords.latitude.toFixed(6)
        userLng = position.coords.longitude.toFixed(6)
        console.log(`lat: ${userLat} - long: ${userLng}`)
        getData(userLat, userLng)
      });
    }
  }

  function setDarkMode() {
    document.body.style.background = "rgb(40, 40, 40)";
    // document.getElementsByTagName('img')[0].src = "https://cdn.clipart.email/39ec82631b4f7c7bad3b151d54918eaf_google-transparent-background-png-cliparts-free-download-hiclipart_300-225.jpeg"
    const links = document.querySelectorAll('body a')
    links.forEach(link => {
      link.style.color = "cornflowerblue";
    })
    const divText = document.querySelector('#SIvCob');
    if (divText) divText.style.color = "cornflowerblue";
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
