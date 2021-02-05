/* TODO 
    * Fix the API
    * search function
    * make checkboxes work
    * Function that deletes previous results
*/
"useStrict";
document.addEventListener("DOMContentLoaded", pageLoaded);




function pageLoaded() {
    let cityUrl = new URL('https://api.foursquare.com/v2/venues/explore?client_id=UT23XCWOFEUB3EXA40EQXRVCLN1NTE1XEJLS1JUNJAWQFSYV&client_secret=WSOBYLFKSXJAJYWV1MGFW45RPIY0DRI3YDC0I0EDRRLEDTEM&v=20180323&limit=1&ll=40.7243,-74.0018&query=coffee');
    //let weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather?q={Göterborg}&appid={984e8b07157055164de5d508d1e7e094}');
    let searchBox = document.getElementById("searchBox");
    const SEARCHBUTTON = document.getElementById("searchButton");
    let cityName = document.getElementById("cityName");
    SEARCHBUTTON.onclick = () => clearResults(cityName);

    /* Test Area */
    fetchAPI(cityUrl);
    console.log(cityUrl);
}

async function fetchAPI(url) {
    try {
        let response = await fetch(url);
        if (response.ok) {
            let jsonResponse = await response.json();
            console.log(url + " loaded successful");
            return jsonResponse;
        } else {
            console.log(url + " not loaded successfully");
            alert("Network error");
        }        
    } catch (error) {
            console.log("Error");
    }
    
}

function searchAPI(searchTerm) {

}

function createSearchResult(count) {
    for (let i = 0; i < count; i++) {
        let section = document.createElement("section");
        let div = document.createElement("div");
        let paragraph = document.createElement("p");
        let CityName = document.createElement("h3");
    }
}

function clearResults(input) {   
    if (input != null){
        input.remove();
    }
}