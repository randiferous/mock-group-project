var inputFormEl = document.querySelector("#input-form");
var countryInputEl = document.querySelector("#country-name");
var modal = document.querySelector("#error-modal");
var searchHistoryEl = document.querySelector("#country-list");
var countryTitleEl = document.querySelector("#country-title");
var countryFlagEl = document.querySelector("#country-flag");
var continentEl = document.querySelector("#continent-div");
var subregionEl = document.querySelector("#subregion-div");
var capitalEl = document.querySelector("#capital-div");
var populationEl = document.querySelector("#population-div");
var languageEl = document.querySelector("#language-div");
var currencyEl = document.querySelector("#currency-div");

var countryStorage = [];

var formSubmitHandler = function (event) {
    event.preventDefault();
    var countryName = countryInputEl.value.trim();
    
    if (countryName) {
        countryInputEl.value = "";
        saveCountry(countryName);
    } else {
        modal.style.display = "flex";

        window.onclick = function (event) {
            modal.style.display = "none";
        }
    }
};

var saveCountry = function (countryName) {
    countryStorage.push(countryName);
    localStorage.setItem("countries", JSON.stringify(countryStorage));
    
    searchMenu(countryName);
    getCovidInfo(countryName);
    getMainInfo(countryName);
};

var loadCountry = function () {
    var storedCountry = localStorage.getItem("countries");
    if (!storedCountry) {
        return false;
    }
    countryStorage = JSON.parse(storedCountry);

    for (var i = 0; i < countryStorage.length; i++) {
        var countryName = countryStorage[i];
        searchMenu(countryName);
    }
}

var searchMenu = function (countryName) {
    var countryListEl = document.createElement("li");
    var countryListContent = document.createElement("a");
    countryListContent.classList = "button is-dark my-2"
    countryListContent.textContent = countryName;
    countryListEl.appendChild(countryListContent);
    searchHistoryEl.appendChild(countryListEl);

    countryListContent.addEventListener("click", eventHandler);
}

var eventHandler = function (event) {
    getCovidInfo(event.target.textContent);
    getMainInfo(event.target.textContent);
}

var getCovidInfo = function (countryName) {
    var apiUrl = "https://disease.sh/v3/covid-19/countries/" + countryName;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayCovidInfo(data);
            });
        } else {
            modal.style.display = "flex";

            window.onclick = function (event) {
                modal.style.display = "none";
            }
        }
    })
        .catch(function (error) {
            modal.style.display = "flex";

            window.onclick = function (event) {
                modal.style.display = "none";
            }
        })
};

var displayCovidInfo = function (data) {
    var countryName = data.country;
    countryTitleEl.textContent = countryName;
    var active = data.active;
    console.log(active);
    var critical = data.critical;
    console.log(critical);
    var cases = data.cases;
    console.log(cases);
    var casesToday = data.todayCases;
    console.log(casesToday);
    var deaths = data.deaths;
    console.log(deaths);
    var deathsToday = data.todayDeaths;
    console.log(deathsToday);
    var recovered = data.recovered;
    console.log(recovered);
    var recoveredToday = data.todayRecovered;
    console.log(recoveredToday);
    var tests = data.tests;
    console.log(tests);
}

var getMainInfo = function (countryName) {
    var apiUrl = "https://restcountries.com/v3.1/name/" + countryName;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayMainInfo(data);
            });
        } else {
            modal.style.display = "flex";

            window.onclick = function (event) {
                modal.style.display = "none";
            }
        }
    })
        .catch(function (error) {
            modal.style.display = "flex";

            window.onclick = function (event) {
                modal.style.display = "none";
            }
        })
}

var displayMainInfo = function (data) {
    var flag = data[0].flags.png;
    countryFlagEl.setAttribute("src", flag);

    var continent = data[0].continents[0];
    continentEl.textContent = "Continent: " + continent;
    var subregion = data[0].subregion;
    subregionEl.textContent = "Subregion: " + subregion;
    var capital = data[0].capital[0];
    capitalEl.textContent = "Capital: " + capital;

    var population = data[0].population;
    populationEl.textContent = "Population: " + population;
    var languagesObject = data[0].languages;
    var languagesValue = Object.values(languagesObject)
    var primaryLanguage = languagesValue[0]
    languageEl.textContent = "Language: " + primaryLanguage
    var currencies = data[0].currencies;
    var currencyObject = Object.values(currencies)
    var currencyName = currencyObject[0].name
    currencyEl.textContent = "Currency: " + currencyName;
}

inputFormEl.addEventListener("submit",formSubmitHandler);

loadCountry();