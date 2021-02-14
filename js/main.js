"use strict";

// Viktiga variablar
const searchButton = document.getElementById('searchButton');
const searchBox = document.getElementById('searchBox');

const clientId = 'UT23XCWOFEUB3EXA40EQXRVCLN1NTE1XEJLS1JUNJAWQFSYV';
const clientSecret = 'WSOBYLFKSXJAJYWV1MGFW45RPIY0DRI3YDC0I0EDRRLEDTEM';
const appID = '984e8b07157055164de5d508d1e7e094';

// TODO Får dubbla resultat ibland, inte ofta men ibland
searchBox.addEventListener('change', searchExecution);
searchButton.addEventListener('click', searchExecution);

// Huvud funktion. När man klickar sök så händer magin
function searchExecution() {
    const result = document.querySelectorAll('.result');    
    const onlyWeather = document.querySelector('#weather:checked');
    const onlyAttractions = document.querySelector('#attractions:checked');
    //const filter = document.querySelector('#filter:checked');
    const searchTerm = searchBox.value;

    // Tömmer allt i .result innan nya resultat visas
    clearResults(result);

    //Ser till så att vi inte skickar tomma request till API:n
    if (searchTerm != null && searchTerm != "") {

    // Kolla om only attraction är checked så den inte hämtar i onödan
        if (onlyAttractions == null) {
            /*  Hämta vädret om only attractions inte är checked.
                Jag har skapat det så att jag först hämtar json från API:n 
                sedan skickar jag det direkt vidare till det sorts kort jag 
                vill skapa.
            */
            fetchApi(getWeatherUrl(searchTerm))
                .then(response => {
                    // Skapa väderkortet
                    createWeatherCard(response);
                }) 
            }

        // Kolla om checkbox för only weather är checked så den inte hämtar i onödan
        if (onlyWeather == null) {
            fetchApi(getVenueUrl(searchTerm))
                .then(response => {
                    createVenueCard(response);
                })
        }
    } else {
        console.log("searchTerm did not contain anything");
    }
}

// Skapar openweather URL
function getWeatherUrl(city) {
    const weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather');

    // Sökparametrarna jag vill hämta
    weatherUrl.searchParams.append('q', city);
    weatherUrl.searchParams.append('appid', appID);
    weatherUrl.searchParams.append('mode', 'json');
    weatherUrl.searchParams.append('units', 'metric');
    weatherUrl.searchParams.append('lang', 'en');

    // returnera URL
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

    // returnera URL
    return venueUrl;
}

/* Funktion för att skapa datum som jag skapade för att förenkla url:en ytterligare*/
function dateBuilder() {
    const dateToday = new Date();
    let todaysDate, y, m, d;

    y = dateToday.getFullYear().toString();
    m = (dateToday.getMonth()+1).toString(); // +1 eftersom 'month' är noll indexerat
    d = dateToday.getDate().toString();

    // lägger till en nolla om längden på värdet är mindre än 2
    if (m.length < 2) 
    m = '0' + m;
    if (d.length < 2) 
    d = '0' + d;

    todaysDate = (y + m + d);

    return todaysDate;
}

// Hittade ingen dag parameter på openweather så skapade en egen funktion för att få ut den
function getWeekday() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
  
    var n = weekday[d.getDay()];
    return n;
  }

/*  Hämtar API utifrån en URL 

*/
async function fetchApi(url) {
    // En try för lite felhantering
    try {
        const response = await fetch(url);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(JSON.stringify(jsonResponse, null, " "));
            return jsonResponse;
        } else {
            console.log(url + " not loaded successfully");
        }        
    } catch (error) {
            console.log("Error");
    }    
}

/* Skapa ett väderkort utifrån svaret vi fick från fetchApi */
function createWeatherCard(city) {
    const main = document.querySelector("main");
    // Skapa alla element vi behöver
    const section = document.createElement("section");
    const div1 = document.createElement("div");
    const cityName = document.createElement("h3");
    const div2 = document.createElement("div");
    const paragraph = document.createElement("p");
    const day = document.createElement("h4");

    // Url till ikon
    const iconPrefix = 'https://openweathermap.org/img/w/';

    // lägg till elementen vi skapat
    section.append(cityName);       
    div1.append(div2);
    div2.append(day);
    div2.append(paragraph);
    section.append(div1);
    
    main.append(section);

    // lägg till innehåll i de olika elementen
    cityName.innerText = `Current weather in ${city.name}`; // så vi vet vilken stad
    day.innerText = getWeekday(); // Lägger till dagens dag
    paragraph.innerHTML =  `<img src="${iconPrefix}${city.weather[0].icon}.png">
                            <br> Condition:  ${city.weather[0].description} 
                            <br> Temprature: ${city.main.temp}
                            <br> Wind: ${city.wind.speed} m/s
                            `;

    // Lägg till klasser från CSS till elementen
    div1.classList.add('resultPanel');
    div2.classList.add('resultCard');
    section.classList.add('result');
    cityName.classList.add('cityName');
}

/* En egen funktion för att skapa en URL för ikoner till venues */
function imgUrl(venue) {
    const imgUrl = new URL(`https://api.foursquare.com/v2/venues/${venue.id}/photos`);
    const today = dateBuilder();

    imgUrl.searchParams.append('client_id', clientId);
    imgUrl.searchParams.append('client_secret', clientSecret);
    imgUrl.searchParams.append('v', today);
}

/* Skapa venuekort utifrån svaret vi fick från fetchApi */
function createVenueCard(city) {
    const main = document.querySelector("main");
    // Skapa alla element vi behöver för resultat panelen
    const section = document.createElement("section");
    const div1 = document.createElement("div");
    const cityName = document.createElement("h3");

    for (let i = 0; i < city.response.groups[0].items.length; i++) { 
        // Skapa element per 'sak' vi fick i svaret       
        const div2 = document.createElement("div");
        const paragraph = document.createElement("p");
        const name = document.createElement("h4");

        // Lite varibler för att förenkla
        const venuePrefix = city.response.groups[0].items[i].venue;
        const iconPrefix = venuePrefix.categories[0].icon;
        const iconLink = `${iconPrefix.prefix}bg_64${iconPrefix.suffix}`;

        // lägg till elementen vi skapat per 'sak'     
        div1.append(div2);
        div2.append(name);
        div2.append(paragraph);
        
        name.innerText = `${venuePrefix.name}`;
        
        paragraph.innerHTML = ` <br> <img src="${iconLink}">
                                 Address:                              
                                <br> ${venuePrefix.location.address}
                                <br> ${venuePrefix.location.postalCode} ${venuePrefix.location.city}
                                `;
        
        div2.classList.add('resultCard');
    }
  
    section.append(cityName);
    section.append(div1);            
    main.append(section);
    
    cityName.innerText = `Top Attractions in ${city.response.headerFullLocation}`;

    div1.classList.add('resultPanel');
    section.classList.add('result');
    cityName.classList.add('cityName');    
}

// Rensar utifrån ingående parameter
function clearResults(input) {   
    for (let i = 0; i < input.length; i++) {
        input[i].remove();
    }    
}
