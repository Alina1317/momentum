const time = document.getElementById('time'),
	quote = document.getElementById('quote'),
	date = document.getElementById('date'),
	greeting = document.getElementById('greeting'),
	name = document.getElementById('name'),
	tasks = document.getElementById('tasks'),
	focus = document.getElementById('focus'),
	btnRightSm = document.getElementById('btn-small-right'),
	btnLeft = document.getElementById('btn-left'),
	btnRight = document.getElementById('btn-right');
	let changeImg = 1;
	let txt = document.getElementById('quote-text'),
		autor = document.getElementById('quote-autor'),
		city = document.getElementById('city'),
		weatherIcon = document.querySelector('.weather-icon'),
		weatherTemp = document.getElementById('weather-temp'),
		weatherDesc = document.getElementById('weather-desc'),
		airHumidity = document.getElementById('air-humidity'),
		windSpeed = document.getElementById('wind-speed');

//Date and time
const showTime = () => {
	let today = new Date(),
		hour = today.getHours(),
		min = today.getMinutes(),
		sec = today.getSeconds(),
		dayOfWeek = today.getDay(),
		dateOfWeek = today.getDate(),
		monthOfYear = today.getMonth();

		if (min === 0 && sec === 0) {
			changeBgAndGreet();
		}

		switch(dayOfWeek) {
			case 0:
				dayOfWeek = 'Sunday';
				break;
			case 1:
				dayOfWeek = 'Monday';
				break;
			case 2:
				dayOfWeek = 'Tuesday';
				break;
			case 3:
				dayOfWeek = 'Wednesday';
				break;
			case 4:
				dayOfWeek = 'Thursday';
				break;
			case 5:
				dayOfWeek = 'Friday';
				break;
			case 6:
				dayOfWeek = 'Saturday';
				break;
		}

		switch(monthOfYear) {
			case 0:
				monthOfYear = 'January';
				break;
			case 1:
				monthOfYear = 'February';
				break;
			case 2:
				monthOfYear = 'March';
				break;
			case 3:
				monthOfYear = 'April';
				break;
			case 4:
				monthOfYear = 'May';
				break;
			case 5:
				monthOfYear = 'June';
				break;
			case 6:
				monthOfYear = 'July';
				break;
			case 7:
				monthOfYear = 'August';
				break;
			case 8:
				monthOfYear = 'September';
				break;
			case 9:
				monthOfYear = 'October';
				break;
			case 10:
				monthOfYear = 'November';
				break;
			case 11:
				monthOfYear = 'December';
				break;
		}

	time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
	date.innerHTML = `${dayOfWeek}, ${dateOfWeek} ${monthOfYear}`;

	setTimeout(showTime, 1000);
};

//add 0
const addZero = (n) => {
	if(n < 10) {
		return '0' + n;
	} else {
		return n;
	}
};

//change baground
const changeBgAndGreet = () => {
	let today = new Date(),
		hours = today.getHours();

	if(6 <= hours && hours < 12) {
		document.body.style.backgroundImage = `url('./assets/morning/${changeImg}.jpg')`;
		greeting.textContent = 'Good Morning,';
	} else if (12 <= hours && hours < 18) {
		document.body.style.backgroundImage = `url('./assets/day/${changeImg}.jpg')`;
		greeting.textContent = 'Good Afternoon,';
	} else if (18 <= hours && hours < 24) {
		document.body.style.backgroundImage = `url('./assets/evening/${changeImg}.jpg')`;
		greeting.textContent = 'Good Evening,';	
	} else {
		document.body.style.backgroundImage = `url('./assets/night/${changeImg}.jpg')`;
		greeting.textContent = 'Good Night,';	
	}

	if(changeImg >= 6) {
		changeImg = 1;
	} else {
		changeImg++;
	}
};

//Name
const getName = () => {
	if (localStorage.getItem('name') === null) {
	    name.textContent = '[Enter Name]';
	} else {
	    name.textContent = localStorage.getItem('name');
	}
};

//Name
const setName = (e) => {
	if (e.type == 'click') {
      	e.target.textContent = null;
    } else {
    	if (e.type === 'blur') {
	    	if (e.target.textContent == '') {
	    		if (localStorage.getItem('name') !== '' && localStorage.getItem('name') !== null) {
	    			e.target.textContent=localStorage.getItem('name');
	    		} else {
	    			e.target.textContent = '[Enter Name]';
	    		}
	    	}
		}
	}

	if (e.type === 'keypress') {
	  	if (e.which == 13 || e.keyCode == 13) {
	  		localStorage.setItem('name', e.target.innerText);
	  		name.blur();
	    }
	} else {
	  	localStorage.setItem('name', e.target.innerText);
	}
};

//Focus
const getFocus = () => {
	if (localStorage.getItem('focus') === null) {
		focus.textContent = '[Enter Focus]';
	} else {
		focus.textContent = localStorage.getItem('focus');
	}
};

//Focus
const setFocus = (e) => {
	if (e.type == 'click') {
      	e.target.textContent = null;
    } else {
    	if (e.type === 'blur') {
	    	if (e.target.textContent == '') {
	    		if (localStorage.getItem('focus') !== '' && localStorage.getItem('focus') !== null) {
	    			e.target.textContent = localStorage.getItem('focus');
	    		} else {
	    			e.target.textContent = '[Enter Name]';
	    		}
	    	}
		}
	}

	if (e.type === 'keypress') {
	    if (e.which == 13 || e.keyCode == 13) {
	    	localStorage.setItem('focus', e.target.innerText);
	    	focus.blur();
	    }
	} else {
	    localStorage.setItem('focus', e.target.innerText);
	}
};

//click for change img`s
btnRight.onclick = () => {
		changeBgAndGreet();
};
btnLeft.onclick = () => {
		if(changeImg === 1) {
			changeImg = 7
		}
		if(changeImg < 3) {
			changeImg = 8;
		} 
		changeImg -= 2;
		changeBgAndGreet();
};

//Quote
async function showQuote() {
  let response = await fetch('https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
  let word = await response.json();

  txt.innerHTML = word.quoteText;
  autor.innerHTML = word.quoteAuthor;
};
showQuote();

//Weather
async function getWeather() {  
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem('city')}&lang=en&appid=e3c57ffa6734bb968ace7f83e8a1a8a2&units=metric`);
  
  const data = await res.json();
  console.log(data); 
  console.log(data.weather[0].id, data.weather[0].description, data.main.temp);

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  airHumidity.textContent = `hum.${data.main.humidity}%`;
  windSpeed.textContent = `wind ${data.wind.speed} m/s`;
  weatherTemp.textContent = `${Math.floor(data.main.temp)}°C`;
  weatherDesc.textContent = data.weather[0].description;
};
getWeather();

//City
const getCity = () => {
  if (localStorage.getItem('city') === null) {
    city.textContent = '[Enter City]';
  } else {
    city.textContent = localStorage.getItem('city');
    getWeather();
  }
};

//City
const setCity = (e) => {
  if (e.type == 'click') {
      	e.target.textContent = null;
    } else {
    	if (e.type === 'blur') {
	    	if (e.target.textContent == '') {
	    		if (localStorage.getItem('city') !== '' && localStorage.getItem('city') !== null) {
	    			e.target.textContent = localStorage.getItem('city');
	    		} else {
	    			e.target.textContent = '[Enter City]';
	    		}
	    	}
		}
	}

	if (e.type === 'keypress') {
	    if (e.which == 13 || e.keyCode == 13) {
	    	localStorage.setItem('city', e.target.innerText);
	    	city.blur();
	    }
	} else {
	    localStorage.setItem('city', e.target.innerText);
	}
};

name.addEventListener('click', setName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
btnRightSm.addEventListener('click', showQuote);
city.addEventListener('click', setCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);


showTime();
changeBgAndGreet();
getName();
getFocus();
getCity();