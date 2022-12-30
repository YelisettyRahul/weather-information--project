const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
 
});

app.post("/",function(req,res){
  console.log(req.body.city);

const query = req.body.city;

const keyid = "8f3ae138ee27979732f0e51f79d99af2";

const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ keyid +"&units=metric";
https.get(url,function(response,request){
console.log(response.statusCode);
response.on("data",function(data){
     const weatherdata=JSON.parse(data)
     console.log(weatherdata);
     const temper = weatherdata.main.temp;
     console.log(temper);
     const desp =  weatherdata.weather[0].description;
     console.log(desp);
     const icon =weatherdata.weather[0].icon;
     const imageurl =  "http://openweathermap.org/img/wn/"+icon+"@2x.png";
     res.write("<h1>The temperature in "+ query + " is :"+temper+" degree</h1>");
     res.write("<h2>the weather is currently in "+desp+" condition</h2>");
     res.write("<img src=" + imageurl + ">");
 
     res.send()
});

});

});


app.listen(3000,function(req,res){
    console.log("server is runing in port 3000");
});