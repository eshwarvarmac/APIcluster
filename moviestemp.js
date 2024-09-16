const movieurl = "https://www.omdbapi.com/?t=";
const tdburl = "https://api.themoviedb.org/3/find/";
const tdb = "https://api.themoviedb.org/3/search/movie?api_key=bee8ce9f0d5a33ee50837d31a61a64eb&query=";
const movieName = document.querySelector(".search #movieName");
const searchButton = document.querySelector(".search button");
var i, len;
var totres;
var clcikedmovieid;
var movie_clickedname;
var clickedyear, movie_clickedyear;

// Function to display suggestions while typing
function displaySuggestions(event) {
    const inputValue = event.target.value.trim();
    const suggestionList = document.getElementById("suggestion-list");

    if (inputValue.length < 3) {
        suggestionList.innerHTML = "";
        return;
    }

    fetch(tdb + inputValue)
        .then(response => response.json())
        .then(data => {
            const results = data.results;
            suggestionList.innerHTML = "";

            if (results.length > 0) {
                results.slice(0, 5).forEach(result => {
                    const suggestionItem = document.createElement("div");
                    suggestionItem.className = "suggestion-item";
                    suggestionItem.textContent = result.title;
                    suggestionItem.addEventListener("click", () => {
                        document.getElementById("movieName").value = result.title;
                        suggestionList.innerHTML = "";
                    });
                    suggestionList.appendChild(suggestionItem);
                });
            } else {
                suggestionList.innerHTML = "<div class='suggestion-item'>No suggestions found</div>";
            }
        })
        .catch(error => {
            console.error("Error fetching suggestions:", error);
            suggestionList.innerHTML = "<div class='suggestion-item'>Error fetching suggestions</div>";
        });
}

// Attach event listener for input changes to display suggestions
movieName.addEventListener("input", displaySuggestions);

$(".but").click(function () {
    clcikedmovieid = this.id;
    movie_clickedname = document.getElementById(clcikedmovieid).querySelector(".name").innerHTML;
    clickedyear = document.getElementById(clcikedmovieid).querySelector(".year").innerHTML;
    poster_path = document.getElementById(clcikedmovieid).querySelector("img").getAttribute("src");
    movieInformation(movie_clickedname, clickedyear, poster_path);
});

async function movieInformation(movie_clickedname, clickedyear, poster_path) {
    document.querySelector(".search-results").style.display = "none";
    document.querySelector(".noresults").style.display = "none";
    movie_clickedyear = clickedyear.substr(0, 4);
    console.log(movie_clickedyear);
    document.querySelector(".nobreak").style.display = "block";
    const response = await fetch(movieurl + movie_clickedname + '&y=' + movie_clickedyear + '&plot=full&apikey=f9c47ed2&r=JSON');
    var data = await response.json();
    console.log(data);
    if (data.Response === "False") {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".nobreak").style.display = "none";
    } else {
        document.querySelector(".error").style.display = "none";
    }
    document.querySelector(".movie").innerHTML = "" + data.Title;

    const posterpath = poster_path.substr(30);
    document.querySelector(".poster").setAttribute("src", "http://image.tmdb.org/t/p/w342" + posterpath);
    document.querySelector(".runtime").innerHTML = "<h4>Runtime : </h4>" + data.Runtime;
    document.querySelector(".released").innerHTML = "<h4>Released on : </h4>" + data.Released;
    document.querySelector(".genre").innerHTML = "<h4>Genre : </h4>" + data.Genre;
    document.querySelector(".Actors").innerHTML = "<h4>Actors : </h4>" + data.Actors;
    document.querySelector(".Director").innerHTML = "<h4>Director : </h4>" + data.Director;
    document.querySelector(".Writer").innerHTML = "<h4>Writer : </h4>" + data.Writer;
    document.querySelector(".Country").innerHTML = "<h4>Country : </h4>" + data.Country;
    document.querySelector(".Awards").innerHTML = "<h4>Awards : </h4>" + data.Awards;
    document.querySelector(".imdbRating").innerHTML = "<h4>IMDB Rating : </h4>" + data.imdbRating;
    document.querySelector(".BoxOffice").innerHTML = "<h4>Box Office Collection : </h4>" + data.BoxOffice;
    document.querySelector(".Plot").innerHTML = data.Plot;
}



searchButton.addEventListener("click", () => {
    if (movieName.value.trim()) {
        document.querySelector(".error").style.display = "none";
        document.querySelector(".results-heading").innerHTML = "Here are the results for <h5>" + movieName.value + "</h5>";
        movielist(movieName.value);
    }
});

document.getElementById("movieName").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector(".movie-ele-click").click();
    }
});

movieInformation("RRR", "2022", "http://image.tmdb.org/t/p/w342/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg");