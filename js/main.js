"use strict";

// Viktiga variablar
const searchButton = document.getElementById('searchButton');
const clientId = 'UT23XCWOFEUB3EXA40EQXRVCLN1NTE1XEJLS1JUNJAWQFSYV';
const clientSecret = 'WSOBYLFKSXJAJYWV1MGFW45RPIY0DRI3YDC0I0EDRRLEDTEM';
const appID = '984e8b07157055164de5d508d1e7e094';

searchButton.addEventListener('click', function() {
    const result = document.querySelectorAll('.result');    
    const onlyWeather = document.querySelector('#weather:checked');
    const onlyAttractions = document.querySelector('#attractions:checked');
    let searchTerm = document.getElementById('searchBox').value;
    clearResults(result);

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
                createWeatherCard(response);
            }) 
        }
    } else {
        console.log("searchTerm did not contain anything")
    }
});

// Skapar openweather URL
function getWeatherUrl(city) {
    const weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather');

    // Sökparametrarna jag vill hämta
    weatherUrl.searchParams.append('q', city);
    weatherUrl.searchParams.append('appid', appID);
    weatherUrl.searchParams.append('mode', 'json');
    weatherUrl.searchParams.append('units', 'metric');
    weatherUrl.searchParams.append('lang', 'se');

    return weatherUrl;
}

// Skapar foursquare URL
function getVenueUrl(city) {
    const venueUrl = new URL('https://api.foursquare.com/v2/venues/explore');
    const today = dateBuilder();

    // Sökparametrarna jag vill hämta
    venueUrl.searchParams.append('near', city);
    venueUrl.searchParams.append('client_id', clientId);
    venueUrl.searchParams.append('client_secret', clientSecret);
    venueUrl.searchParams.append('v', today);
    venueUrl.searchParams.append('limit', '10');

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

function createWeatherCard(city) {
    let main = document.querySelector("main");
    let section = document.createElement("section");
    let div1 = document.createElement("div");
    let cityName = document.createElement("h3");
    let div2 = document.createElement("div");
    let paragraph = document.createElement("p");

    section.append(cityName);       
    div1.append(div2)
    div2.append(paragraph);
    section.append(div1);
    
    main.append(section);

    cityName.innerText = `Väder i ${city.name}`;
    paragraph.innerHTML = `Väder:  ${city.weather[0].description} 
                        <br> Tempratur: ${city.main.temp}
                        `;

    div1.classList.add('resultPanel');
    div2.classList.add('resultCard');
    section.classList.add('result');
    cityName.classList.add('cityName');
}

function imgUrl(venue) {
    const imgUrl = new URL(`https://api.foursquare.com/v2/venues/${venue.id}/photos`);
    const today = dateBuilder();

    imgUrl.searchParams.append('client_id', clientId);
    imgUrl.searchParams.append('client_secret', clientSecret);
    imgUrl.searchParams.append('v', today);
}

function createVenueCard(city) {
    let main = document.querySelector("main");
    let section = document.createElement("section");
    let div1 = document.createElement("div");
    let cityName = document.createElement("h3");

    for (let i = 0; i < city.response.groups[0].items.length; i++) {        
        let div2 = document.createElement("div");
        let paragraph = document.createElement("p");
        
        let prefix = city.response.groups[0].items[i].venue;
        //let img = fetchApi(imgUrl(prefix));

        section.append(cityName);
        
        div1.append(div2)
        div2.append(paragraph);
        
        paragraph.innerHTML = `${prefix.name}
                                <br> ${prefix.categories[0].name}                                
                                <br> ${prefix.location.formattedAddress}
                                `;
        
        div2.classList.add('resultCard');
    }
  
    section.append(cityName);
    section.append(div1);            
    main.append(section);
    
    cityName.innerText = `Sevärt i ${city.response.headerFullLocation}`;

    div1.classList.add('resultPanel');
    section.classList.add('result');
    cityName.classList.add('cityName');


    
}

function clearResults(input) {   
    for (let i = 0; i < input.length; i++) {
        input[i].remove();
    }    
}