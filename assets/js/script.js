console.log("Bye World!")

var inputFormEl = document.querySelector("#input-form")
var countryInputEl = document.querySelector("#country-name")
var modal = document.querySelector("#error-modal")
// var countryStorage = [];

var formSubmitHandler = function (event) {
    event.preventDefault();
    var countryName = countryInputEl.value.trim();
    console.log(countryName);
    
    if (countryName) {
        countryInputEl.value = "";
    } else {
        modal.style.display = "flex";

        window.onclick = function (event) {
            modal.style.display = "none";
        }
    }
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
    console.log(countryName);
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
    var continent = data[0].continents[0];
    console.log(continent);
    var subregion = data[0].subregion;
    console.log(subregion);
    var capital = data[0].capital[0];
    console.log(capital);
    var population = data[0].population;
    console.log(population);

    var flag = data[0].flags.png;
    var flagImage = document.createElement("img");
    flagImage.setAttribute("src", flag)
    flagPlaceholder.appendChild(flagImage);

    var languagesObject = data[0].languages;
    var languagesValue = Object.values(languagesObject)
    var primaryLanguage = languagesValue[0]
    console.log(primaryLanguage);

    var currencies = data[0].currencies;
    var currencyObject = Object.values(currencies)
    var currencyName = currencyObject[0].name
    console.log(currencyName);
}

// var saveCountry = function (countryName) {
//     countryStorage.push(countryName);
//     localStorage.setItem("countries", JSON.stringify(countryStorage));
//     console.log(countryStorage);
// };

inputFormEl.addEventListener("submit",formSubmitHandler);