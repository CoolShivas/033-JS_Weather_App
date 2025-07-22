// //======// // Starting of references of id's and classes of html tag.// //======// //

const accWeath_City = document.querySelector(".weather_city");
// console.log(accWeath_City); // Getting h1 tag on browser console;
// accWeath_City.textContent = "Guna"; // Getting text on screen;

const accWeath_DateTime = document.querySelector(".weather_date_time");
// console.log(accWeath_DateTime); // Getting p tag on browser console;
// accWeath_DateTime.textContent = new Date().toLocaleString(); // Gettting date and time on screen;

const accWeath_ForeCast = document.querySelector(".weather_forecast");

const accWeath_Icon = document.querySelector(".weather_icon");

const accWeath_Temp = document.querySelector(".weather_temperature");

const accWeath_Min = document.querySelector(".weather_min");

const accWeath_Max = document.querySelector(".weather_max");

const accWeath_FeelsLike = document.querySelector(".weather_feelsLike");

const accWeath_Humidity = document.querySelector(".weather_humidity");

const accWeath_Wind = document.querySelector(".weather_wind");

const accWeath_Pressure = document.querySelector(".weather_pressure");

const accWeath_FormSubSearch = document.querySelector(".weather_search");

// //======// // Ending of references of id's and classes of html tag.// //======// //

////////**********************************************************************************************////////
////////**********************************************************************************************////////

// //======// // Starting of defining all the function here. // //======// //

const getCorrectFormatDateTime = (dt) => {
  const currDateTime = new Date(dt * 1000); // Converting seconds to miliseconds;
  // console.log(currDateTime); // Getting on browser console as => Tue Jul 22 2025 13:51:22 GMT+0530 (India Standard Time);
  const options = {
    weekday: "long",
    month: "long",
    year: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  // return formatter; // Getting on display as => [object Intl.DateTimeFormat];

  const correctDateTIme = formatter.format(currDateTime);
  return correctDateTIme;
};

const getCountryCodeFullName = (code) => {
  // return new Intl.DisplayNames(["en"], {type: "region"}); // Getting on display as [object Intl.DisplayNames];
  // return new Intl.DisplayNames([code], {type: "region"}); // Now, also getting on display as [object Intl.DisplayNames];
  return new Intl.DisplayNames([code], { type: "region" }).of(code); // Getting full name of country on display;
};

let dynamicNameCity = "gwalior"; // Assigning the default dynamic city name for api;

accWeath_FormSubSearch.addEventListener("submit", (event) => {
  event.preventDefault(); // Preventing the auto form submission;

  let accInputFieldCityName = document.querySelector(".city_name"); // Getting reference of input field class;
  dynamicNameCity = accInputFieldCityName.value; // Assigning input field search value to dynamic city name;
  console.log(dynamicNameCity); // Getting the input field value on browser console;

  getWeatherData(); // Calling the function after entering the input field on reloading the page;

  accInputFieldCityName.value = ""; // Clearing the input field;
});

const getWeatherData = async () => {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${dynamicNameCity}&appid=3aa94f962094ae7c82dcebf7d91b85e0`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data); // Getting data on browser console;

    const { main, name, weather, wind, sys, dt } = data; // Destructuring the data of response;
    // console.log(name); // Getting name on browser console;

    // accWeath_City.innerHTML = name; // Getting city name on display;

    // accWeath_City.innerHTML = `${name}, ${sys.country}`; // Getting city name with country code on display;

    accWeath_City.innerHTML = `${name}, ${getCountryCodeFullName(sys.country)}`; // Getting city name with country code on display;

    // accWeath_DateTime.innerHTML = dt; // Getting on display 1753172256 i.e., the seconds;

    accWeath_DateTime.innerHTML = getCorrectFormatDateTime(dt); // Passing dt as argument to function;

    // accWeath_Temp.innerText = main.temp; // Getting temp on display as numeric value as 306.4 only;

    // accWeath_Temp.innerText = `${main.temp}&#176`; // Getting temp on display as => 306.4&#176 not the degree sign;

    accWeath_Temp.innerHTML = `${main.temp}&#176`; // Getting temp on display as => 306.4°;

    // accWeath_Min.innerHTML = `Min: ${main.temp_min}&#176`; // Getting temp minimum on display as => Min: 306.4°;

    // accWeath_Max.innerHTML = `Max: ${main.temp_max}&#176`; // Getting temp maximun on display as => Max: 306.4°;

    accWeath_Min.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`; // Getting temp minimum by removing decimal value on display as => Min: 306°;

    accWeath_Max.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`; // Getting temp maximun by removing decimal value on display as => Max: 306°;

    accWeath_FeelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`; // Getting feels_like on display as => Feels Like 309°;

    accWeath_Humidity.innerHTML = `${main.humidity}%`; // Getting humidity on display;

    accWeath_Wind.innerHTML = `${wind.speed} m/s`; // Getting wind speed in m/s on display;

    accWeath_Pressure.innerHTML = `${main.pressure} hPa`; // Getting pressure on display;

    accWeath_ForeCast.innerHTML = weather[0].main; // Getting weather forecast as cloudy or sunny type text on display;

    // accWeath_Icon.innerHTML = weather[0].icon; // Getting icon image on display as => 04n (i.e., unicode of icon image);

    accWeath_Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="not found">`; // Finally, we are getting the icon image on display;
  } catch (error) {
    console.log(error);
  }
};

// //======// // Ending of defining all the function here. // //======// //

////////**********************************************************************************************////////
////////**********************************************************************************************////////

// //======// // Starting of firing the event listener on load when function invokes.// //======// //

// // // Added the load on body and invoke the function for preload on page open or user visit to this page;
document.body.addEventListener("load", getWeatherData());

// //======// // Ending of firing the event listener on load when function invokes.// //======// //

////////**********************************************************************************************////////
////////**********************************************************************************************////////
