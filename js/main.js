/* TODO 
    * Fix the API
    * search function
    * make checkboxes work
    * Function that deletes previous results
*/
"use strict";

const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function() {
    const onlyWeather = document.querySelector('#weather:checked');
    const onlyAttractions = document.querySelector('#attractions:checked');
    let searchTerm = document.getElementById('searchBox').value;
    
    //Ser till så att vi inte skickar tomma request till API:n
    if (searchTerm != null && searchTerm != "") {
        // Kolla om checkbox för only weather är checked så den inte hämtar i onödan
        if (onlyWeather == null) {
            fetchApi(getVenueUrl(searchTerm))
                .then(response => {
                    createVenueCard(response);
                })
        }

        // Kolla om only attraction är checked så den inte hämtar i onödan
        if (onlyAttractions == null) {
        fetchApi(getWeatherUrl(searchTerm))
            .then(response => {
                console.log(response);
            }) 
        }
    } else {
        console.log("searchTerm did not contain anything")
    }
});


function getWeatherUrl(city) {
    const weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather');

    // Sökparametrarna jag vill hämta
    weatherUrl.searchParams.append('q', city);
    weatherUrl.searchParams.append('appid', '984e8b07157055164de5d508d1e7e094');
    weatherUrl.searchParams.append('mode', 'json');
    weatherUrl.searchParams.append('units', 'metric');
    weatherUrl.searchParams.append('lang', 'se');

    return weatherUrl;
}

function getVenueUrl(city) {
    const venueUrl = new URL('https://api.foursquare.com/v2/venues/explore');
    const today = dateBuilder();

    // Sökparametrarna jag vill hämta
    venueUrl.searchParams.append('near', city);
    venueUrl.searchParams.append('client_id', 'UT23XCWOFEUB3EXA40EQXRVCLN1NTE1XEJLS1JUNJAWQFSYV');
    venueUrl.searchParams.append('client_secret', 'WSOBYLFKSXJAJYWV1MGFW45RPIY0DRI3YDC0I0EDRRLEDTEM');
    venueUrl.searchParams.append('v', today);

    return venueUrl;
}

/* Funktion för att skapa datum som jag skapade för att förenkla url:en ytterligare*/
function dateBuilder() {
    let dateToday = new Date();
    let todaysDate, y, m, d;

    y = dateToday.getFullYear().toString();
    m = (dateToday.getMonth()+1).toString();
    d = dateToday.getDate().toString();

    if (m.length < 2) 
    m = '0' + m;
    if (d.length < 2) 
    d = '0' + d;

    todaysDate = (y + m + d);

    return todaysDate;
}

/* Hämtar API utifrån en URL*/
async function fetchApi(url) {
    try {
        let response = await fetch(url);
        if (response.ok) {
            let jsonResponse = await response.json();
            console.log(JSON.stringify(jsonResponse, null, " "));
            return jsonResponse;
        } else {
            console.log(url + " not loaded successfully");
        }        
    } catch (error) {
            console.log("Error");
    }    
}

function createVenueCard(city) {    
    let cityName = document.querySelector('#cityName');
    cityName.innerText = city.response.headerFullLocation;

    let venue = document.querySelector('.resultCard');
    venue.innerText = city.response.groups[0].items[0].venue.name;
}

/* For future 

function createSearchResult(count) {
    for (let i = 0; i < count; i++) {
        let section = document.createElement("section");
        let div = document.createElement("div");
        let paragraph = document.createElement("p");
        let CityName = document.createElement("h3");
    }
}
*/

function clearResults(input) {   
    if (input != null){
        input.remove();
    }
}