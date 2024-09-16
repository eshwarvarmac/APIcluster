function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
var viewMode = getCookie("view-mode");
if(viewMode == "desktop"){
    viewport.setAttribute('content', 'width=1024');
}else if (viewMode == "mobile"){
    viewport.setAttribute('content', 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no');
}
const appurlCountry="https://restcountries.com/v3.1/name/"
//const fulltext=""

const searchBox=document.querySelector(".search input")
const searchButton=document.querySelector(".search button")
async function countryInformation(country)
{
    const response=await fetch(appurlCountry+country+'?fullText=true');
    var data=await response.json();
    console.log(data);
    if(response.status==404)
    {
        document.querySelector(".error").style.display="block";
        document.querySelector(".countries-info").style.display="none";
    }
    else
    {
        document.querySelector(".error").style.display="none";
        document.querySelector(".countries-info").style.display="block";
    }
    const flag=data[0].flags.png
    const flagAlt=data[0].flags.alt    
    document.querySelector(".country").innerHTML=data[0].name.common;
    document.querySelector(".flag").setAttribute("src"," "+flag+" ")
    document.querySelector(".flag").setAttribute("alt",flagAlt)
    // document.querySelector(".officialName").innerHTML="<h4>Official Name : </h4>"+data[0].name.nativeName.eng.official;
    document.querySelector(".capital").innerHTML="<h4>Capital : </h4>"+data[0].capital;
    document.querySelector(".borders").innerHTML="<h4>Continent : </h4>"+data[0].continents;
    document.querySelector(".continent").innerHTML="<h4>Borders : </h4>"+data[0].borders;
    document.querySelector(".population").innerHTML="<h4>Population : </h4>"+data[0].population;
    document.querySelector(".area").innerHTML="<h4>Area : </h4>"+data[0].area+" Km²";
    document.querySelector(".demonym").innerHTML="<h4>Demonym : </h4>"+data[0].demonyms.eng.m;
    document.querySelector(".timeZone").innerHTML="<h4>Time Zone : </h4>"+data[0].timezones;
    
}
document.querySelector("#countryName").addEventListener("keypress", function(event) 
{
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector(".country-ele-click").click();
    }
});
searchButton.addEventListener("click",()=>
{
        countryInformation(searchBox.value);
})
countryInformation("India");