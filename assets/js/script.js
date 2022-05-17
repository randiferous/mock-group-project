var modal = document.getElementById("modal1")

var getCountryInfo = function (countryName) {
    var apiUrl = "https://disease.sh/v3/covid-19/countries/" + countryName;
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