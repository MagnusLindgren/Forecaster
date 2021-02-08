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
    let today = dateBuilder();

    SEARCHBUTTON.onclick = function() {
        let searchTerm = document.getElementById('searchBox').value;
        console.log("Search value = " + searchTerm);
        let url = `${cityUrl}?near=${searchTerm}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${today}&limit=10`;
        fetchAPI(url)
            .then(result => console.log(result))
    }

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