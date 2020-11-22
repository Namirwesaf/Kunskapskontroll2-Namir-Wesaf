/*
Funktion som kör koden så fort sidan har laddats klart!
kopplar in min api key.
*/

window.onload = function() {
const apiKey = "51decb0fafe26a4ffc3a15976071b876"

/*
Gör en eventlistener för search knappen, samt ger oss 404 error på api-anropet om staden inte finns.
*/
document.querySelector('#searchBtn').addEventListener('click', async function() {
    let city = document.querySelector('#searchCity').value;
    const jsonResponse = await apiFetch(apiKey, city);

    if (jsonResponse.cod == 404) {
        displayCityNotFound();
    } else {
        displayWeather(jsonResponse);    
    }
});

/*
Hämtar information från api och skriver ut det.
*/
function displayWeather(apiJson) {
    let temperature = kelvinToCelsius(apiJson.main.temp);
    document.querySelector("#beskrivning").innerHTML = `Description: ${apiJson.weather[0].description}`;
    document.querySelector("#temperatur").innerHTML = `Temperature: ${temperature} °C`;
    document.querySelector("#vindhastighet").innerHTML = `Speed: ${apiJson.wind.speed} m/s`;
    document.querySelector("#luftfuktighet").innerHTML = `Humidity: ${apiJson.main.humidity} %`;
    document.querySelector("#weatherIcon").src = `http://openweathermap.org/img/wn/${apiJson.weather[0].icon}@2x.png`;

/*
Skriver ut olika smiley beroende på vädret
*/
    let smiley = document.querySelector("#smileyFace");
    if (temperature > 20) {
        smiley.src = "https://icons.iconarchive.com/icons/hopstarter/keriyo-emoticons/72/Smiley-cool-icon.png";
    } else if (temperature >= 7) {
        smiley.src = "https://icons.iconarchive.com/icons/hopstarter/keriyo-emoticons/72/Smiley-icon.png";
    } else if (temperature < 7 && temperature > 0) {
        smiley.src = "https://icons.iconarchive.com/icons/hopstarter/keriyo-emoticons/72/Smiley-sad-icon.png"
    } else if (temperature < 0) {
        smiley.src = "https://icons.iconarchive.com/icons/hopstarter/keriyo-emoticons/72/Smiley-teards-icon.png";
    }
}

/*
Här skriver vi ut alert-box om man matar in fel stad.
*/
function displayCityNotFound() {
    let city = document.querySelector('#searchCity').value;
    alert(`${city} is not a valid city!`);
}

/*
Hämtar information om staden med hjälp av json från api:et
*/
async function apiFetch(key, city) {
    const api = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
    const jsonResponse = await api.json();
    return jsonResponse; 
} 

/*
Funktion som omvandlar Kelvin till Celcius.
*/
function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}
}
