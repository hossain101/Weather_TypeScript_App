import express from "express";
import { json } from "stream/consumers";
import https from "https";
import { get } from "http";
import bodyParser from "body-parser";

// Create a new express application instance
const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: true }));

// The port the express app will listen on
const port: number = 3000;

 app.get("/", (_req, _res) => {

  //storing api url into a variable

  //calling api using https weatherResponse holds the data from api

  

  _res.sendFile(__dirname + "/index.html");

  
}); //end of app.get

app.post('/', (_req, _res) => {
    console.log(_req.body.cityName);

    var query: string = _req.body.cityName;
      console.log("Post request received");

      var location: string = query  ;
      var unit: string = "metric";
      var apiID: string = "5677c9fcdd0823346332ba920dcea180";
      //Storing geocodingURL into a variable
      const geocodingURL: string =
        "https://api.openweathermap.org/geo/1.0/direct?q=" +
        location +
        "&appid=" +
        apiID;
    
      //variables to store latitude and longitude
    
      var latitude: string;
      var longitude: string;
    
      var geocodingData: any;
    
      //calling api using https geocodingResponse holds the data from api
    
      https.get(geocodingURL, (geoCodingResponse) => {
        geoCodingResponse.on("data", (data) => {
          geocodingData = JSON.parse(data);
          latitude = geocodingData[0].lat;
          longitude = geocodingData[0].lon;
    
          console.log("GeoCoding Response Code : " + geoCodingResponse.statusCode);
    
          console.log("Latitude : " + latitude);
          console.log("Longitude : " + longitude);
          console.log("apiID : " + apiID);
          console.log("Unit : " + unit);
    
          const weatherURL: string =
            "https://api.openweathermap.org/data/2.5/weather?lat=" +
            latitude +
            "&lon=" +
            longitude +
            "&appid=" +
            apiID +
            "&units=" +
            unit;
          https.get(weatherURL, (weatherResponse) => {
            console.log("Weather Response Code : " + weatherResponse.statusCode);
            console.log("Status Message : " + weatherResponse.statusMessage);
    
            weatherResponse.on("data", (weatherData) => {
                var weatherDataJSON = JSON.parse(weatherData);
                var weatherDescription = weatherDataJSON.weather[0].description;
                var weatherIcon = weatherDataJSON.weather[0].icon;
                var weatherTemp = weatherDataJSON.main.temp;
                var weatherFeelsLike = weatherDataJSON.main.feels_like;
                var weatherHumidity = weatherDataJSON.main.humidity;
                var weatherWindSpeed = weatherDataJSON.wind.speed;
                var weatherWindDeg = weatherDataJSON.wind.deg;
                var weatherCountry = weatherDataJSON.sys.country;
                var weatherCity = weatherDataJSON.name;
                console.log("Weather Description : " + weatherDescription);
                console.log("Weather Icon : " + weatherIcon);
                console.log("Weather Temperature : " + weatherTemp);
                console.log("Weather Feels Like : " + weatherFeelsLike);
                console.log("Weather Humidity : " + weatherHumidity);
                console.log("Weather Wind Speed : " + weatherWindSpeed);
                console.log("Weather Wind Degree : " + weatherWindDeg);
                console.log("Weather Country : " + weatherCountry);
                console.log("Weather City : " + weatherCity);
        
                _res.write("<h1>Weather Description : " + weatherDescription + "</h1>");
                _res.write("<h1>Weather Icon : " + weatherIcon + "</h1>");
                _res.write("<h1>Weather Temperature : " + weatherTemp + "</h1>");
                _res.write("<h1>Weather Feels Like : " + weatherFeelsLike + "</h1>");
                _res.write("<h1>Weather Humidity : " + weatherHumidity + "</h1>");
                _res.write("<h1>Weather Wind Speed : " + weatherWindSpeed + "</h1>");
                _res.write("<h1>Weather Wind Degree : " + weatherWindDeg + "</h1>");
                _res.write("<h1>Weather Country : " + weatherCountry + "</h1>");
                _res.write("<h1>Weather City : " + weatherCity + "</h1>");
                _res.write("<img src='http://openweathermap.org/img/wn/" + weatherIcon + ".png'>");
                
                _res.send();
            });
          });// end of https.get for weatherURL
        }); //end of geoCodingResponse.on
      }); //end of https.get for geocodingURL
    



  });
app.listen(port, () => {
  console.log(`TypeScript with Express
         http://localhost:${port}/`);
});
