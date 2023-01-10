const searchEl = document.getElementById("input");
const searchBtn = document.getElementById("searchBtn");
const historyBtns = document.querySelectorAll(".history");
const dayEl = document.getElementById("todayShell");
const weekEl = document.getElementById("daysShell");
var time = moment();
const date = time.format("l");
var key = "49c140ca59cc71ce8bf62c455f9bce8e";
function buildHistory(newCity) {
  console.log(historyBtns);
  for (var i = 0; i< 8; i++){
    localStorage.setItem(`${i+1}`,historyBtns[i].textContent)
  }
  for(i = 1; i<8;i++){
    historyBtns[i].textContent = localStorage.getItem(`${i}`)
  }
  historyBtns[0].textContent = newCity
}
// search function
function search() {
  let city = searchEl.value.trim();
  localStorage.setItem("1", city);
  searchFunction(city);
}

// history buttons
function historySearch(index) {
  let city = historyBtns[index - 1].textContent;
  getWeekly(city);
  getCurrent(city);
}

// get data for weekly
async function getWeekly(city) {
  var cityName = city;
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${key}`;
  const resp = await fetch(url);
  const respData = await resp.json();
  buildHistory(city);
  buildWeekly(respData);
}

// get data for current information
async function getCurrent(city) {
  var cityName = city;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${key}`;
  const resp = await fetch(url);
  const respData = await resp.json();
  buildCurrent(respData);
}

// build current data

function buildCurrent(data) {
  console.log(data);
  dayEl.innerHTML = `          
  <h1>${data.name} (${date})<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}"></h1>
  <p>temp:${data.main.temp}</p>
  <p>wind:${data.wind.speed}</p>
  <p>humidity:${data.main.humidity}</p>

`;
}

// build weekly forecast
function buildWeekly(data) {
  console.log(data);
  for (var i = 0; i < 5; i++) {
    let divEl = document.getElementById(`day${i + 1}`);
    divEl.innerHTML = `          
    <h1>${moment().add(i, "days").format("l")}</h1>
    <img src="http://openweathermap.org/img/wn/${
      data.list[i * 8].weather[0].icon
    }@2x.png" alt="${data.list[i * 8].weather[0].description}">
    <p>temp:${data.list[i * 8].main.temp}</p>
    <p>wind:${data.list[i * 8].wind.speed}</p>
    <p>humidity:${data.list[i * 8].main.humidity}</p>
  
  `;
  }
}

searchBtn.addEventListener("click", search);

historySearch(2);
