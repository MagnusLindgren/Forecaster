/* TODO 
    * Fix the API
    * search function
    * make checkboxes work
    * Function that deletes previous results
*/
"useStrict";
document.addEventListener("DOMContentLoaded", pageLoaded);

function pageLoaded() {
    let searchBox = document.getElementById("searchBox");
    const SEARCHBUTTON = document.getElementById("searchButton");
    let cityName = document.getElementById("cityName");
    SEARCHBUTTON.onclick = () => clearResults(cityName);
    
}

function searchAPI(searchWord) {

}

function createSearchResult(count) {
    for (let i = 0; i < count; i++) {
        let section = document.createElement("section");
        let div = document.createElement("div");
        let paragraph = document.createElement("p");
        let CityName = document.createElement("h5");
    }
}

function clearResults(input) {   
    if (input != null){
        input.remove();
    }
}