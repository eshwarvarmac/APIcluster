// function getCookie(name) {
//     var nameEQ = name + "=";
//     var ca = document.cookie.split(';');
//     for(var i=0;i < ca.length;i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') c = c.substring(1,c.length);
//         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//     }
//     return null;
// }
// var viewMode = getCookie("view-mode");
// if(viewMode == "desktop"){
//     viewport.setAttribute('content', 'width=1024');
// }else if (viewMode == "mobile"){
//     viewport.setAttribute('content', 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no');
// }
var apikeyWeather="fd8b9a6b9a738eb3da552915806df26c"
var appurlWeather="https://api.openweathermap.org/data/2.5/weather?units=Metric&q=";
var units="&deg;C"
var city=document.querySelector(".search #cityName")
var temp_units=document.querySelector(".search #tempunit")
var searchButton=document.querySelector(".search button")
var unitchecker=0;
function checkunits()
{
    if(temp_units.value.trim()==="Kelvin")
    {
        appurlWeather="https://api.openweathermap.org/data/2.5/weather?q=";
        units="K"
        unitchecker=0;
    }
    else if(temp_units.value.trim()==="Celsius"||temp_units.value.trim()==="")
    {
        appurlWeather="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        units="&deg;C"
        unitchecker=0;
    }
    else if(temp_units.value.trim()==="Fahrenheit")
    {
        appurlWeather="https://api.openweathermap.org/data/2.5/weather?units=Imperial&q=";
        units="&deg;F"
        unitchecker=0;
    }
    else
    {
        unitchecker=1;
    }
}
async function checkWeather(city)
{
    const response=await fetch(appurlWeather+city+'&appid='+apikeyWeather);
    var data=await response.json();
    console.log(data);
    console.log(appurlWeather);
    console.log(temp_units.value)
    if(response.status==404)
    {
        document.querySelector("#weather-info-data").style.display="none";
        document.querySelector(".city-error").style.display="block";
        document.querySelector(".units-error").style.display="none";
    }
    else if(unitchecker===1)
    {
        document.querySelector("#weather-info-data").style.display="none";
        document.querySelector(".units-error").style.display="block";
        document.querySelector(".city-error").style.display="none";
    }
    else
    {
        document.querySelector(".units-error").style.display="none";
        document.querySelector(".city-error").style.display="none";
        document.querySelector("#weather-info-data").style.display="block";
    }
    document.querySelector("#header").innerHTML="Weather in "+data.name;
    document.querySelector("#temperatur").innerHTML="Temperature : "+data.main.temp+units;
    document.querySelector("#weatherDescription").innerHTML="Weather : "+data.weather[0].main;
    document.querySelector("#Humidity").innerHTML="Humidity : "+data.main.humidity+"%";
    document.querySelector("#windSpeed").innerHTML="Wind Speed : "+data.wind.speed+" km/h";
    const icon=data.weather[0].icon
    const iconurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
    document.querySelector("#weatherIcon").setAttribute("src",iconurl);
}
searchButton.addEventListener("click",()=>
{
    
    if(city.value.trim())
    {
        checkunits();
        checkWeather(city.value);
    }
})
document.getElementById("cityName").addEventListener("keypress", function(event) 
{
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector(".weather-ele-click").click();
    }
});
document.getElementById("tempunit").addEventListener("keypress", function(event) 
{
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector(".weather-ele-click").click();
    }
});
checkWeather("Hyderabad");