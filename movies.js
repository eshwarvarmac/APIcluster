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
const movieurl="https://www.omdbapi.com/?t="
const tdburl="https://api.themoviedb.org/3/find/"
const tdb="https://api.themoviedb.org/3/search/movie?api_key=bee8ce9f0d5a33ee50837d31a61a64eb&query="
const movieName=document.querySelector(".search #movieName")
const searchButton=document.querySelector(".search button")
var i,len;
var totres;
var clcikedmovieid;
var movie_clickedname;
var clickedyear,movie_clickedyear;
$(".but").click(function()
{
    clcikedmovieid=(this.id);
    movie_clickedname=(document.getElementById(clcikedmovieid).querySelector(".name").innerHTML)
    clickedyear=(document.getElementById(clcikedmovieid).querySelector(".year").innerHTML)
    poster_path=(document.getElementById(clcikedmovieid).querySelector("img").getAttribute("src"));
    movieInformation(movie_clickedname,clickedyear,poster_path)
});
console.log(movie_clickedname+" "+clickedyear)
async function movieInformation(movie_clickedname,clickedyear,poster_path)
{
    document.querySelector(".search-results").style.display="none";
    document.querySelector(".noresults").style.display="none";
    movie_clickedyear=clickedyear.substr(0,4);
    console.log(movie_clickedyear)
    document.querySelector(".nobreak").style.display="block";
    const response=await fetch(movieurl+movie_clickedname+'&y='+movie_clickedyear+'&plot=full&apikey=f9c47ed2&r=JSON');
    var data=await response.json();
    console.log(data);
    if(data.Response==="False")
    {
        document.querySelector(".error").style.display="block";
        document.querySelector(".nobreak").style.display="none";
    }
    else
    {
        document.querySelector(".error").style.display="none";
    }
    document.querySelector(".movie").innerHTML=""+data.Title;

    // const imdbID=data.imdbID
    // console.log(imdbID)
    // const response2=await fetch(tdburl+imdbID+'?api_key=bee8ce9f0d5a33ee50837d31a61a64eb&external_source=imdb_id');
    // var data2=await response2.json();
    // console.log(data2)
    const posterpath=poster_path.substr(30);
    //const posterimg="http://image.tmdb.org/t/p/original"+posterpath;
    document.querySelector(".poster").setAttribute("src","http://image.tmdb.org/t/p/w342"+posterpath);
    document.querySelector(".runtime").innerHTML="<h4>Runtime : </h4>"+data.Runtime;
    document.querySelector(".released").innerHTML="<h4>Released on : </h4>"+data.Released;
    document.querySelector(".genre").innerHTML="<h4>Genre : </h4>"+data.Genre;
    document.querySelector(".Actors").innerHTML="<h4>Actors : </h4>"+data.Actors;
    document.querySelector(".Director").innerHTML="<h4>Director : </h4>"+data.Director;
    document.querySelector(".Writer").innerHTML="<h4>Writer : </h4>"+data.Writer;
    document.querySelector(".Country").innerHTML="<h4>Country : </h4>"+data.Country;
    document.querySelector(".Awards").innerHTML="<h4>Awards : </h4>"+data.Awards;
    document.querySelector(".imdbRating").innerHTML="<h4>IMDB Rating : </h4>"+data.imdbRating;
    document.querySelector(".BoxOffice").innerHTML="<h4>Box Office Collection : </h4>"+data.BoxOffice;
    document.querySelector(".Plot").innerHTML=data.Plot;
}
async function movielist(movieName)
{
    const response=await fetch(tdb+movieName);
    var data=await response.json();
    var len=data.results.length;
    var j=0;
    if(data.results.length!=0)
    {
        document.querySelector(".search-results").style.display="block";
        document.querySelector(".nobreak").style.display="none";
        document.querySelector(".noresults").style.display="none";
        for(i=0;i<12;i++)
        {
            document.querySelector(".div"+i).style.display="none";
        }
        for(i=0;i<len;i++)
        {
            console.log(data.results[i].poster_path)
            if(data.results[i].poster_path!=null)
            {
                document.querySelector(".img"+j).setAttribute("src","http://image.tmdb.org/t/p/w154"+data.results[i].poster_path)
                document.querySelector(".name"+j).innerHTML=data.results[i].title
                document.querySelector(".year"+j).innerHTML=data.results[i].release_date
                document.querySelector(".div"+j).style.display="block";
                document.querySelector(".div"+j).id=j;
                j++;
            }

        }
        totres=j;
    }
    else
    {
        document.querySelector(".noresults").style.display="block";
        document.querySelector(".search-results").style.display="none";
        document.querySelector(".nobreak").style.display="none";
    }
    
    
}
searchButton.addEventListener("click",()=>
{
    if(movieName.value.trim())
    {
        document.querySelector(".error").style.display="none";
        document.querySelector(".results-heading").innerHTML="Here are the results for <h5>"+movieName.value+"</h5>"
        movielist(movieName.value);
    }
})
document.getElementById("movieName").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector(".movie-ele-click").click();
  }
});
movieInformation("RRR","2022","http://image.tmdb.org/t/p/w342/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg");