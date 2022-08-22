var citySearched = document.getElementById("search-city-input");
var searchButton = document.querySelector('#search-button');

var weather = {

    apiKey: "fbe4cb1baae3b652dc40c7ea6fe78676",

    getWeather: function (city) {
        fetch ("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=imperial&appid="
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => {
                // this.displayWeather(data)
                console.log(data);

                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely&appid=${this.apiKey}&units=imperial`)
                    .then((response1) => response1.json())
                    .then((data) => {
                        console.log(data);

                        var currentWeather = data.current;
                        var dailyArr = data.daily;

                        console.log(city, currentWeather, dailyArr);
                        document.querySelector('#currentCity').textContent = " ";                       
                        document.querySelector('#temp').textContent = " ";
                        document.querySelector('#wind').textContent = " ";
                        document.querySelector('#humid').textContent = " ";
                        document.querySelector('#uv').textContent = " ";

                        document.querySelector('#currentCity').textContent = city;
                        document.getElementById("weatherIcon").setAttribute("src", "https://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png")
                        document.getElementById("currentDate").textContent = moment().format("MM/DD/YYYY")
                        document.getElementById("temp").textContent += currentWeather.temp + " F"
                        document.getElementById("wind").textContent += currentWeather.wind_speed + " MPH"
                        document.getElementById("humid").textContent += currentWeather.humidity + " %"
                        document.getElementById("uv").textContent += currentWeather.uvi
                        document.getElementById("dayForecast").innerHTML = " "

                        for (var i=0; i < 5; i++) {
                        var dayEl = document.querySelector("#dayForecast");
                        var card = document.createElement("ul");
                        card.setAttribute("class", "weatherCard")
                        card.innerHTML = 
                        `<li>Temp: ${dailyArr[i].temp.max} F</li>
                        <li>Wind: ${dailyArr[i].wind_speed} MPH</li>
                        <li>Humidity: ${dailyArr[i].humidity} %</li>
                        `
                    
                        dayEl.appendChild(card);
                        
                        }
                    })
                    

            });
     
                   
    },  
};


searchButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    var userInput = citySearched.value;

    console.log(userInput);

    weather.getWeather(userInput);

    recentSearches();
   
});

function recentSearches () {

    var searchHistory = JSON.parse(localStorage.getItem("search-history")) || [];
    var recentCity = document.getElementById("search-city-input").value; 
    searchHistory.push(recentCity)
    localStorage.setItem("search-history", JSON.stringify(searchHistory));
        
};

function historyBtn () {
    var town = this.value ;
    weather.getWeather(town);
};

function renderSearchHistory () {
    var history = JSON.parse(localStorage.getItem("search-history")) || [];
    var recentSearches = document.getElementById("recent-searches"); 
    history.forEach(function (row) {
        var button = document.createElement("button"); 
        button.setAttribute("class", "row"); 
        button.setAttribute("value", row)
        button.addEventListener("click", historyBtn)
        button.textContent = row;
        recentSearches.appendChild(button);
    })
};

renderSearchHistory(); 







