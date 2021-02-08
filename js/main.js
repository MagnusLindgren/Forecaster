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
    const CLIENT_ID = "UT23XCWOFEUB3EXA40EQXRVCLN1NTE1XEJLS1JUNJAWQFSYV";
    const CLIENT_SECRET = "WSOBYLFKSXJAJYWV1MGFW45RPIY0DRI3YDC0I0EDRRLEDTEM";
    const SEARCHBUTTON = document.getElementById('searchButton');
    let cityUrl = 'https://api.foursquare.com/v2/venues/explore';   
    let cityName = "helsingborg";

   

    fetch(`${cityUrl}?near=${cityName}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20210206&limit=10`)
        .then(response => response.json())
        .then(result => console.log(result))

}

async function fetchAPI(url) {
    try {
        let response = await fetch(url);
        if (response.ok) {
            let jsonResponse = await response.json();
            console.log(url + " loaded successfully");
            return jsonResponse;
        } else {
            console.log(url + " not loaded successfully");
        }        
    } catch (error) {
            console.log("Error");
    }
    
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