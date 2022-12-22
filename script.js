async function getData() {

    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=London&APPID=[private key]");
    const data = await response.json();
    console.log(data['name']);
    printData(data);
}

async function printData(data) {
    const moreInfo = document.getElementById('moreInfo');
    const city = document.getElementById('city');
    const getDate = new Date();
    const date = document.getElementById('date');
    const desc = document.getElementById('desc');
    const card = document.createElement('div');

    city.textContent = data['name'];
    date.textContent = getDate.getUTCFullYear();
    desc.textContent = data['weather'][0].description;

    card.appendChild(createInfo("Feels like: ", data['main'].feels_like, 'moreInfo'));
    card.appendChild(createInfo("Min temp: ", data['main'].temp_min, 'moreInfoSmall'));
    card.appendChild(createInfo("Max temp: ", data['main'].temp_max, 'moreInfoSmall'));
    card.appendChild(createInfo("Pressure: ", data['main'].pressure, 'moreInfo'));
    card.appendChild(createInfo("Humidity: ", data['main'].humidity, 'moreInfo'));

    moreInfo.appendChild(card);
}

function createInfo(intro, name, c) {
    const newInfo = document.createElement('div');
    newInfo.textContent = intro + name;
    newInfo.classList.add(c);

    return newInfo;
}

getData();
















