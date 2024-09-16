const express=require("express");
const app=express();
const http=require("http");
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
});
app.get("/weather",function(req,res)
{
    res.sendFile(__dirname+"/weather.html");
});
app.post("/weather",function(req,res)
{
    const cityName=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=fd8b9a6b9a738eb3da552915806df26c&units=metric"
    https.get(url,function(response)
    {
        response.on("data",function(data)
        {
            const weatherData=JSON.parse(data)
            const temperatur=weatherData.main.temp
            const weatherDescription=weatherData.weather[0].main
            const icon=weatherData.weather[0].icon
            const iconurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            const Humidity=weatherData.main.humidity
            const windSpeed=weatherData.wind.speed
            res.writeHead(200, { 'Content-Type':'text/html'});
            res.write("<h1>Weather in "+cityName+"</h1>");
            res.write("<p>"+weatherDescription+"</p>");
            res.write("<p>Temperature : "+temperatur+"&deg;C</p>")
            res.write("<p>Humidity : "+Humidity+"%</p>")
            res.write("<p>Wind Speed : "+windSpeed+" km/h</p>")
            res.write("<p><img src=" +iconurl+ "></p>");
            res.send()
        })
    })
});
app.get("/currency",function(req,res)
{
    res.sendFile(__dirname+"/currency.html");
});
app.post("/currency",function(req,res)
{
    const base_currency=req.body.currency1;
    const currencies=req.body.currency2;
    //const api1="n705x0suPJVIXcAWc4HoruILHamUZoTM3OdCnrRc";
    const url1="https://api.freecurrencyapi.com/v1/latest?base_currency="+base_currency+"&currencies="+currencies+"&apikey=n705x0suPJVIXcAWc4HoruILHamUZoTM3OdCnrRc";
    https.get(url1,function(response)
    {
        response.on("data",function(d)
        {
            res.writeHead(200, { 'Content-Type':'text/html'});
            const conversionRate=JSON.parse(d);
            const value=conversionRate.data.EUR;
            res.write("<p>1 "+base_currency+" ----> "+value+" "+currencies+"</p>")
            res.send()
        })
    })


})



app.get("/countries",function(req,res)
{
    res.sendFile(__dirname+"/countries.html");
});
app.post("/countries",function(req,res)
{
    const countryName=req.body.countryName;
    const url="https://restcountries.com/v3.1/name/"+countryName+"?fullText=true"
    // const url="https://countryapi.io/api/name/"+countryName+"?apikey=e3uIF9xju4fJhV9IQeBKRZJOyFnOzjS24czFnabl"
    https.get(url,function(response)
    {
        response.on("data",function(data)
        {
            const countryData=JSON.parse(data)
            const flag=countryData[0].flags.png
            const flagAlt=countryData[0].flags.alt
            const officialName=countryData[0].name.official
            const capital=countryData[0].capital;
            const borders=countryData[0].borders;
            //const currencyName=countryData[0].currencies
            // const currencySymbol=countryData[0].currencies.symbol
            const continent=countryData[0].continents
            const population=countryData[0].population
            const area=countryData[0].area
            const demonym=countryData[0].demonyms.eng.m
            const timeZone=countryData[0].timezones
            res.writeHead(200, { 'Content-Type':'text/html'});
            res.write("<h1>Here is the information about "+countryName+"</h1>")
            res.write("<p><img src=" +flag+ " alt=" +flagAlt+ "></p>")
            res.write("Official Name : "+officialName)
            res.write("<p>Capital : "+capital+"<p>");
            res.write("<p>Borders : "+borders+"<p>");
            //res.write("<h4>Currency</h4>")
            //res.write("Currency Name : "+currencyName)
            // res.write("Currency Symbol : "+currencySymbol)
            res.write("<p>Continent : "+continent+"</p>")
            res.write("<p>Population : "+population+"</p>")
            res.write("<p>Area : "+area+" sq.km</p>")
            res.write("<p>Demonym : "+demonym+"</p>")
            res.write("<p>Time Zone : "+timeZone+"</p>")
            res.send()
        })
    })
    //e3uIF9xju4fJhV9IQeBKRZJOyFnOzjS24czFnabl
    //countryapi https://countryapi.io/api/name/India?apikey=e3uIF9xju4fJhV9IQeBKRZJOyFnOzjS24czFnabl

    //Fw/oziU5tzi6On6entBDzQ==zm3Jha0BTKAMb93R
    
});

app.get("/movies",function(req,res)
{
    res.sendFile(__dirname+"/movies.html");
})
app.post("/movies",function(req,res)
{
    const movieName=req.body.movieName;
    const year=req.body.year
    const url="https://www.omdbapi.com/?t="+movieName+"&y="+year+"&plot=short&apikey=f9c47ed2&r=JSON"
    https.get(url,function(response)
    {
        response.on("data",function(data)
        {
            const movieData=JSON.parse(data)
            res.writeHead(200, { 'Content-Type':'text/html'});
            const duration=movieData.Runtime
            res.write("<p>"+duration+"</p>")
            res.send()
            console.log(data);
        })
    })
})
app.listen(3000,function(req,res)
{
    console.log("Listening to port 3000");
});



//newsdata.io is lit man
//pub_21823bc4fe51dc1208b133c2736375998532b
//https://newsdata.io/api/1/news?apikey=pub_21823bc4fe51dc1208b133c2736375998532b&q=Virat&country=in&language=en&category=sports 


//http://numbersapi.com/43/trivia 

//https://api.themoviedb.org/3/search/movie?api_key=API_KEY&query=Jack+Reacher

//&apikey=f9c47ed2 omdb
//https://www.omdbapi.com/?t=RRR&y=2022&plot=full&apikey=f9c47ed2