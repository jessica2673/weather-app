const form = document.getElementById('form');
getData("Toronto");

form.addEventListener("submit", e => {
    e.preventDefault();

    getData(document.querySelector('input[name=search]').value);
})



async function getData(input) {
    try {
        const moreInfo = document.getElementById('moreInfo');
        const card = document.getElementById('card');
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=[private-key]`);
        const data = await response.json();
        card.parentNode.removeChild(card);
        console.log(data['weather'][0].icon);

        printData(data);
    } catch {
        moreInfo.textContent = "Sorry but that is not a valid location.";
        throw Error ("Sorry but that is not a valid location.");
    } 
}

async function printData(data) {
    try {
        const moreInfo = document.getElementById('moreInfo');
        const city = document.getElementById('city');

        const getDate = new Date();
        const date = document.getElementById('date');
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const icon = document.getElementById('icon');
        const temp = document.getElementById('temp');
        const desc = document.getElementById('desc');
        const card = document.createElement('div');
        card.setAttribute('id', 'card');

        city.textContent = data['name'];
        date.textContent = `${getDate.getDay()} ${months[getDate.getMonth()]} ${getDate.getFullYear()}, ${getDate.getHours()}:${getDate.getMinutes()}`;
        icon.src=`http://openweathermap.org/img/wn/${data['weather'][0].icon}@2x.png`;
        temp.textContent = `${data['main'].temp}F`;
        desc.textContent = data['weather'][0].description;

        card.appendChild(createInfo("Feels like: ", data['main'].feels_like, 'moreInfo'));
        card.appendChild(createInfo("Min temp: ", data['main'].temp_min, 'moreInfoSmall'));
        card.appendChild(createInfo("Max temp: ", data['main'].temp_max, 'moreInfoSmall'));
        card.appendChild(createInfo("Pressure: ", data['main'].pressure, 'moreInfo'));
        card.appendChild(createInfo("Humidity: ", data['main'].humidity, 'moreInfo'));

        moreInfo.appendChild(card);
    } catch {
        throw Error("Sorry but that is not a valid location.");
    }
    
}

function createInfo(intro, name, c) {
    const newInfo = document.createElement('div');
    newInfo.textContent = intro + name;
    newInfo.classList.add(c);

    return newInfo;
}

















