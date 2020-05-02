
window.onload = function(){
	
	function mainClock() {
		let clock = document.getElementById("main-clock");
		clock.innerHTML = new Date().toLocaleTimeString();
	}
	function updateDayView(){

	}
	function updateWeekView(){

		week = document.getElementById("calendar-root").children[0];
		let date = dateFns.startOfWeek(currDate);
		
		for (let i = 0; i < 7; i++) {
			let day = week.children[i];
			day.style.opacity = 1;
			day.innerHTML = dateFns.getDate(date);
			date = dateFns.addDays(date, 1);
			day.style.display = "inline-block";
			day.addEventListener("click", null);
		}

		
	}

	function updateMonthView(){
		
		//Finding the first day of week to start at
		//and the number of days in the month
		let firstDay = dateFns.startOfMonth(currDate);
		let lastDay = dateFns.endOfMonth(currDate);
		firstDay = dateFns.getDay(firstDay);
		lastDay = dateFns.getDate(lastDay);
		
		let date = 1;

		//This is a loop for the weeks.
		for(let j = 0; j < 6; j++){
			
			let week = document.getElementById("calendar-root").children[j];
			
			//This is a loop for the days.
			for(let i = 0; i < 7; i++){

				let day = week.children[i];
				//Deciding to erase the block or add date.
				if (i<firstDay || date > lastDay){
					day.style.opacity = 0;
					day.innerHTML = "";
					day.removeEventListener("click", null);
				} else {
					day.innerHTML = date++;
					day.style.opacity = 1;
					day.addEventListener("click", null);
				}

			}	
			firstDay = 0;
		}
		document.getElementById("month-year").innerHTML = dateFns.format(currDate, 'MMMM, ' + dateFns.getYear(currDate));
	}
	const updateDays = x => {currDate = dateFns.addDays(currDate, x);}

	const updateMonth = x => {	
		currDate = dateFns.addMonths(currDate, x);
		updateMonthView();
	}
	const monthDisplay = displayVal => {
		let month = document.getElementById("calendar-root");
		for(let i = 1; i < 6; i++) {
			month.children[i].style.display = displayVal;
		}
	}
	
	function changeView() {

		let change = document.getElementById("view-changer").value;
		
		if (change === 'monthly'){
			monthDisplay("flex");
			updateMonthView();
		} else if (change === 'weekly'){
			monthDisplay("none");
			updateWeekView();		
		} else {
			monthDisplay("none");
			updateDayView();
		}
		prevView = change;

	}

	let prevView= document.getElementById("view-changer").value;
	let currDate = new Date();

	updateMonthView();
	setInterval(mainClock,500);
	document.getElementById("left").addEventListener("click", () => {updateMonth(-1)});
	document.getElementById("right").addEventListener("click", () => {updateMonth(1)});
	document.getElementById("view-changer").addEventListener("change", changeView);

}
