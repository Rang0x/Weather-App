let ourHttp = new XMLHttpRequest();
let ourData = {};
let thisDayData = document.querySelector(".thisDayData");
let hourlyDegreeDiv = document.querySelector(".hourlyDegree");
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let thisDay = document.querySelector(".thisDay");
let nextDaysId = document.querySelector(".nextDays");

let searchId = document.querySelector("#searchId");



async function getData(cityName)
{
    ourHttp = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=02257c9509cc4f23ac5224902232907&q=${cityName}&days=5`);
    ourData = await ourHttp.json();
    console.log(ourData);
    currentDayDetails();
    nextDays();
}

getData("cairo");


function currentDayDetails()
{
    thisDayData.innerHTML = `
        <div class="thisDayInfo pt-5 ms-4">
            <h1 class="whitetext fw-bold display-5">${ourData.location.name}</h1>
            <h1 class="whitetext fw-bold display-5"></h1>
            <p class="whitetext">Weather forecast</p>
            <h2 class="my-2 whitetext">${ourData.current.condition.text}</h2>
            <h2 class="my-2 whitetext fs-1">${ourData.current.temp_c}°C
                <span>
                    <img src="${ourData.current.condition.icon}">
                </span>
            </h2>
            <span class="whitetext fs-5"><i class="fa-solid fa-wind fs-5 mx-1"></i>${Math.round(ourData.current.wind_kph)}<small> Km/h</small></span>
            <span class="whitetext fs-5 mx-3"><i class="fa-solid fa-umbrella fs-5 mx-1"></i>${Math.round(ourData.forecast.forecastday[0].hour[0].will_it_rain)}<small> %</small></span>
        </div>
    `
    switch(ourData.current.condition.text)
    {
        case "Sunny" : thisDay.style.backgroundImage = "url('../animations/sunny.gif')";
        break;
        case "Light rain" :
        case "Light rain shower" :
        case "Moderate rain" :
        case "Torrential rain shower" :
        case "Patchy light rain" :
        case "Moderate rain" :
            thisDay.style.backgroundImage = "url('../animations/rainnny.gif')";
        break;
        case "Cloudy" :
        case "Clear" :
        case "Overcast" :
        case "Partly cloudy" :
            thisDay.style.backgroundImage = "url('../animations/cloudy.gif')";
        break;
        case "Patchy snow possible" :
        case "Patchy light snow" :
        case "Light snow" :
        case "Blowing snow" :
            thisDay.style.backgroundImage = "url('../animations/snowy.gif')";
        break;
    }
    let hourlyDetails = ``;
    for (let i = 0; i < 9; i++) {
        hourlyDetails += `
            <div class="hourDegCard bg-primary-subtle">
                <h5 class=" border-bottom border-1 border-black">${ourData.forecast.forecastday[0].hour[i].time.slice(-5)}am</h5>
                <img src="${ourData.forecast.forecastday[0].hour[i].condition.icon}">
                <h5 class="mt-1">${Math.round(ourData.forecast.forecastday[0].hour[i].temp_c)}°C</h5>
            </div>
        `
    }
    hourlyDegreeDiv.innerHTML = hourlyDetails;
}



function nextDays()
{
    let nextDayDesign = ``;
    let toDayDate = new Date();
    let tommDate = toDayDate.getDay()+1;
    for (let i = 1; i < 4; i++) {
            nextDayDesign += `
                <div class="nextDay bg-white p-4 rounded-3 my-2">
                    <h2 class="mb-3">${dayNames[tommDate]}</h2>
                    <h3 class=" fs-3">${Math.round(ourData.forecast.forecastday[i].day.maxtemp_c)}°C
                    <span>
                        <img src="${ourData.forecast.forecastday[i].day.condition.icon}">
                    </span></h3>
                    <h5 style="margin-top: -30px;">${Math.round(ourData.forecast.forecastday[i].day.mintemp_c)}°C</h5>
                </div>`
                if(tommDate < 6)
                {
                    tommDate++;
                }
                else{
                    tommDate = 0;
                }
                console.log(tommDate);
    }
    nextDaysId.innerHTML = nextDayDesign;
}

// ----------------- Function for search ----------

    searchId.addEventListener("keyup", function()
    {
        let cityName = searchId.value;
        if(cityName.length > 2)
        {
            getData(cityName);
        }
        else
        {
            getData("cairo")
        }
    })

console.log(dayNames[6]);