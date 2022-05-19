var modal = document.getElementById("modal1")
var flagPlaceholder = document.querySelector("#flag-placeholder");
var countryStorage = [];

var getCountryCovidInfo = function (countryName) {
    var apiUrl = "https://disease.sh/v3/covid-19/countries/" + countryName;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayCountryCovidInfo(data);
            });
        }
    })
        .catch(function (error) {
            modal.style.display = "block";

            window.onclick = function (event) {
                modal.style.display = "none";
            }
        })
};

var displayCountryCovidInfo = function (data) {
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

var getCountryMainInfo = function (countryName) {
    var apiUrl = "https://restcountries.com/v3.1/name/" + countryName;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayCountryMainInfo(data);
            });
        }
    })
        .catch(function (error) {
            modal.style.display = "block";

            window.onclick = function (event) {
                modal.style.display = "none";
            }
        })
}

var displayCountryMainInfo = function (data) {
    var continent = data [0].continents[0];
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

var saveCountry = function (countryName) {
    countryStorage.push(countryName);
    localStorage.setItem("countries", JSON.stringify(countryStorage));
    console.log(countryStorage);
}

getCountryCovidInfo("South Korea");
getCountryMainInfo("South Korea")
saveCountry("South Korea");