const form = document.getElementById('form');
const moreInfo = document.getElementById('moreInfo');
const errorMssg = document.getElementById('error');
const toggleBtn = document.getElementById('toggle');
const unit = ["F", "°C"];
let selector = 0; //where 0 represents Fahrenheit
let storedCity = "Toronto";
getData("Toronto");

toggleBtn.addEventListener("click", e => {
    selector = Math.abs(1 - selector);

    if (storedCity != "") {
        getData(storedCity);
    } else {
        errorMssg.textContent = "Please enter a valid location first.";
    }
});

form.addEventListener("submit", e => {
    e.preventDefault();
    storedCity = document.querySelector('input[name=search]').value;

    if(storedCity != "") {
        getData(storedCity).catch(function (err) {
            console.log(err);
            throw new Error();
          });
    } else {
        removeCard();
        errorMssg.textContent = "Please enter a valid location."
        throw new Error();
    }
})

async function getData(input) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=${{secrets.API_KEY}}`);
        if(!response.ok) {
            throw new Error('Network response was not OK');
        } else {
            const data = await response.json();

            removeCard()
            errorMssg.textContent = "";
            printData(data);
        }
    } catch (e) {
        console.log(e);
        removeCard();
        errorMssg.textContent = "Sorry but that is not a valid location.";
        throw new Error ("Sorry but that is not a valid location.");
    } 
}

async function printData(data) {
    try {
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
        date.textContent = `${getDate.getUTCDate()} ${months[getDate.getMonth()]} ${getDate.getFullYear()}, ${getDate.getHours()}:${getDate.getMinutes()}`;
        icon.src=`http://openweathermap.org/img/wn/${data['weather'][0].icon}@2x.png`;
        
        desc.textContent = data['weather'][0].description;

        if (selector === 0) {
            temp.textContent = `${ktoF(data['main'].temp)}${unit[selector]}`;
            card.appendChild(createInfo("Feels like: ", `${ktoF(data['main'].feels_like)}${unit[selector]}`, 'moreInfo'));
            card.appendChild(createInfo("Min temp: ", `${ktoF(data['main'].temp_min)}${unit[selector]}`, 'moreInfoSmall'));
            card.appendChild(createInfo("Max temp: ", `${ktoF(data['main'].temp_max)}${unit[selector]}`, 'moreInfoSmall'));
        } else {
            temp.textContent = `${kToC(data['main'].temp)}${unit[selector]}`;
            card.appendChild(createInfo("Feels like: ",`${kToC(data['main'].feels_like)}${unit[selector]}`, 'moreInfo'));
            card.appendChild(createInfo("Min temp: ", `${kToC(data['main'].temp_min)}${unit[selector]}`, 'moreInfoSmall'));
            card.appendChild(createInfo("Max temp: ", `${kToC(data['main'].temp_max)}${unit[selector]}`, 'moreInfoSmall'));
        }

        card.appendChild(createInfo("Pressure: ", `${data['main'].pressure}Hg`, 'moreInfo'));
        card.appendChild(createInfo("Humidity: ", data['main'].humidity, 'moreInfo'));

        moreInfo.appendChild(card);
    } catch (e) {
        console.log(e); 
        removeCard()
        errorMssg.textContent = "Sorry but that is not a valid location.";
        throw new Error("Sorry but that is not a valid location.");
    }  
}

function createInfo(intro, name, c) {
    const newInfo = document.createElement('div');
    newInfo.textContent = intro + name;
    newInfo.classList.add(c);

    return newInfo;
}

function removeCard() {
    const card = document.getElementById('card');
    if (card != null) {
        card.parentNode.removeChild(card);
    }
}

function kToC(temp) {
    return (temp - 273.15).toFixed(2);
}

function ktoF(temp) {
    return ((temp - 273.15)*(9/5) + 32).toFixed(2);
}

















