/* TODO 
    * Fix the API
    * search function
    * make checkboxes work
    * Function that deletes previous results
*/
"useStrict";
document.addEventListener("DOMContentLoaded", pageLoaded);

function pageLoaded() {
    /* Variables */
    /*
    const CLIENT_ID = "UT23XCWOFEUB3EXA40EQXRVCLN1NTE1XEJLS1JUNJAWQFSYV";
    const CLIENT_SECRET = "WSOBYLFKSXJAJYWV1MGFW45RPIY0DRI3YDC0I0EDRRLEDTEM";
    const API_KEY = '984e8b07157055164de5d508d1e7e094';
    let weatherApi, mode, units, lang, url;
    weatherApi = 'https://api.openweathermap.org/data/2.5/weather';
    mode = 'json';
    units = 'metric';
    lang = 'se';  
    let today = dateBuilder();
    let venueApi = 'https://api.foursquare.com/v2/venues/explore';
    let jsonResponse;
    */

   const SEARCHBUTTON = document.getElementById('searchButton');
    SEARCHBUTTON.onclick = function() {
        let searchTerm = 'helsingborg'; //document.getElementById('searchBox').value;
        console.log(`Search value: ${searchTerm}`);
        //venueUrl = new URL(`${venueApi}?near=${searchTerm}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${today}&limit=10`);

        jsonResponse = fetchApi(getVenueApi(searchTerm)).then(result => console.log(result));
        //jsonResponse2 = fetchApi(weatherUrl).then(result => console.log(result));  
        //createData(jsonResponse);   
    }
}

function getWeatherApi(city) {
    const weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather');

    weatherUrl.searchParams.append('q', city);
    weatherUrl.searchParams.append('appid', '984e8b07157055164de5d508d1e7e094');
    weatherUrl.searchParams.append('mode', 'json');
    weatherUrl.searchParams.append('units', 'metric');
    weatherUrl.searchParams.append('lang', 'se');

    return weatherUrl;
}

function getVenueApi(city) {
    const venueUrl = new URL('https://api.foursquare.com/v2/venues/explore');
    const today = dateBuilder();

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
            return jsonResponse;
        } else {
            console.log(url + " not loaded successfully");
        }        
    } catch (error) {
            console.log("Error");
    }    
}

function createData(city) {    
    let cityName = document.querySelector("#cityName");
    cityName.innerText = city.meta.response.response.headerLocation;
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