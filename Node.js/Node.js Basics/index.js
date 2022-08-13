const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {

  const url =
    ("https://api.openweathermap.org/data/2.5/weather?q=London&appid=8a7b579b2234232325cbd1702285bc1c");

 
  https.get(url, (response) => {
      console.log(res.statusCode);

      //jab response mile
      response.on("data", (data) => {
      const weatherDataString = JSON.parse(data);
      const temperature = weatherDataString.main.temp;
      const weatherDescription = weatherDataString.weather[0].description;
      console.log(temperature+" "+weatherDescription);
      
      const icon = weatherDataString.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/"+ icon + "@2x.png"

      res.write("<p>The weather is currently "+ weatherDescription + "<p>");
      res.write("<h1>The temperature in London is " + temperature + " degree Celcius. </h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
  });
    });
 //res.send("Server is up and running");
});

app.get("/weather", (req,res) => {
    res.sendFile(__dirname+"/weather.html");
})

app.post("/", function(req,res) {
    console.log(req.body.cityName);

    const query =  req.body.cityName;
    const apiKey = "8a7b579b2234232325cbd1702285bc1c";

    const url =
      "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey;

      https.get(url, function(response) {
          console.log(response.statusCode);

          response.on("data", function(data){
              const weatherDataString = JSON.parse(data);
              const temperature = weatherDataString.main.temp;
              const weatherDescription =
                weatherDataString.weather[0].description;
              console.log(temperature + " " + weatherDescription);

              const icon = weatherDataString.weather[0].icon;
              const imageURL =
                "https://openweathermap.org/img/wn/" + icon + "@2x.png";

              res.write(
                "<p>The weather is currently " + weatherDescription + "<p>"
              );
              res.write(
                "<h1>The temperature in" +query+
                 "is " +
                  temperature +
                  " degree Fahrenheit. </h1>"
              );
              res.write("<img src=" + imageURL + ">");
              res.send();
          })
      })
})

app.get("/home", (req,res)=> {
    res.sendFile(__dirname+"/home.html");
    console.log(__dirname);

})

app.get("/hello", function(req,res){
    res.send(
      "<div><h1>Hello World!</h1><br/><a href='http://localhost:8000/contact'>contact</a><br/><a href='http://localhost:8000/about'>about</a><br/><a href='http://localhost:8000/hobbies'>hobbies</a></div>"
    );
})

app.get("/contact", function (req, res) {
  res.send("<h1>Contact page Of London Brewery</h1>");
});

app.get("/about", function (req, res) {
  res.send("<h1>Made by Aditya</h1>");
});

app.get("/hobbies", function (req, res) {
  res.send("<h1><ul><li>Coffee</li><li>Beer</li><li>Code</li></ul></h1>");
});

app.get("/calculator", function(req,res){
res.sendFile(__dirname+"/calculator.html");
});

app.post("/", (req,res) => {

    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result =  num1+num2;

    console.log(req.body);

    res.send("Thnaks for posting that. The result is = " + result);
});


app.listen(8000, function(){
    console.log("Server has Started at 8000")
});