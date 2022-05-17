var modal = document.getElementById("modal1")

var getCountryInfo = function (countryName) {
    var apiUrl = "https://disease.sh/v3/covid-19/countries/" + countryName;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
                displayCountryInfo(data);
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

var displayCountryInfo = function(data) {
    var countryName = data.country;
    console.log(countryName);
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
}

var getStateInfo = function (stateName) {
    var apiUrl = "https://disease.sh/v3/covid-19/states/" + stateName;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
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

getCountryInfo("Japan");
getStateInfo("Wyoming");
