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
		autor = document.getElementById('quote-autor');


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

const addZero = (n) => {
	if(n < 10) {
		return '0' + n;
	} else {
		return n;
	}
};

const changeBgAndGreet = () => {
	let today = new Date(),
		hours = today.getHours();

	if(6 <= hours && hours < 12) {
		document.body.style.backgroundImage = `url('./img/morning/${changeImg}.jpg')`;
		greeting.textContent = 'Good Morning,';
	} else if (12 <= hours && hours < 18) {
		document.body.style.backgroundImage = `url('./img/day/${changeImg}.jpg')`;
		greeting.textContent = 'Good Afternoon,';
	} else if (18 <= hours && hours < 24) {
		document.body.style.backgroundImage = `url('./img/evening/${changeImg}.jpg')`;
		greeting.textContent = 'Good Evening,';
		document.body.classList.toggle('active-text');
	} else {
		document.body.style.backgroundImage = `url('./img/night/${changeImg}.jpg')`;
		greeting.textContent = 'Good Night,';
		document.body.classList.toggle('active-text');
	}

	if(changeImg >= 6) {
		changeImg = 1;
	} else {
		changeImg++;
	}
};

const getName = () => {
	if (localStorage.getItem('name') === null) {
	    name.textContent = '[Enter Name]';
	} else {
	    name.textContent = localStorage.getItem('name');
	}
};

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

const getFocus = () => {
	if (localStorage.getItem('focus') === null) {
		focus.textContent = '[Enter Focus]';
	} else {
		focus.textContent = localStorage.getItem('focus');
	}
};

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

async function showQuote() {
  let response = await fetch('https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
  let word = await response.json();

  txt.innerHTML = word.quoteText;
  autor.innerHTML = word.quoteAuthor;
}
showQuote();

name.addEventListener('click', setName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
btnRightSm.addEventListener('click', showQuote)

showTime();
changeBgAndGreet();
getName();
getFocus();