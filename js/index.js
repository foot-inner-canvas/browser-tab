// define functions
var utils = (function () {

	// update innerHTMLById
	function updateInnerHTML(id, string) {
		const elem = document.getElementById(id);
		elem.innerHTML = string;
	}

	// focus search form
	function focusElemById(id) {
		const elem = document.getElementById(id);
		elem.focus();
	}

	// retrieve local storage
	function retrieveLocalStorage() {
		return localStorage.getItem("theme");
	}

	// save to local stoage
	function saveToLocalStorage(value) {
		localStorage.setItem("theme", value)
	}

	// search
	function search() {
		const input = document.getElementById("search");
		const q = input.value;
		location = ("https://www.google.com/search?q=" + encodeURIComponent(q));
	}

	// toggle theme to body
	function toggleTheme(css) {
		const body = document.getElementsByTagName("body")[0];
		if (css === "dark-theme") {
			body.classList.remove("dark-theme");
			body.classList.add("light-theme");
		}
		if (css === "light-theme") {
			body.classList.remove("light-theme");
			body.classList.add("dark-theme");
		}
	}

	// dates module
	function getDate(timeZone) {

		// set opts
		const opts = { day: "numeric", date: "2-digit", month: "long", year: "numeric" }

		// apply region if applicable
		if (timeZone) {
			opts.timeZone = timeZone;
		}

		// return date
		return new Date().toLocaleString("en-GB", opts);
	}

	function getTime(timeZone) {

		// set opts
		const opts = { hour: "2-digit", minute: "2-digit", hour12: true, }

		// apply region if applicable
		if (timeZone) {
			opts.timeZone = timeZone;
		}

		// return with opts
		return new Date().toLocaleString("en-GB", opts);
	}

	// get timeZone difference
	function getTimeZoneDiff(regionA, regionB) {
		const regionAdate = new Date().toLocaleString("en-US", { timeZone: regionA, hour12: false });
		const regionBdate = new Date().toLocaleString("en-US", { timeZone: regionB, hour12: false });
		const asDateA = new Date(regionAdate);
		const asDateB = new Date(regionBdate);
		return asDateB.getHours() - asDateA.getHours();
	}

	// set date and times
	function updateAllDateTimes() {

		// get date, times, tz
		const chiTime = getTime("America/Chicago");
		const chiDate = getDate("America/Chicago");
		const nycTime = getTime("America/New_York");
		const nycDate = getDate("America/New_York");
		const amsTime = getTime("Europe/Amsterdam");
		const amsDate = getDate("Europe/Amsterdam");
		const sydTime = getTime("Australia/Sydney");
		const sydDate = getDate("Australia/Sydney");
		const chiTz = getTimeZoneDiff("Europe/Amsterdam", "America/Chicago");
		const nycTz = getTimeZoneDiff("Europe/Amsterdam", "America/New_York");
		const amsTz = getTimeZoneDiff("Europe/Amsterdam", "Europe/Amsterdam");
		const sydTz = getTimeZoneDiff("Australia/Sydney", "Europe/Amsterdam");

		// update date and time elements
		updateInnerHTML("chi-time", chiTime);
		updateInnerHTML("chi-date", chiDate);
		updateInnerHTML("chi-tz", chiTz + "hr");
		updateInnerHTML("nyc-time", nycTime);
		updateInnerHTML("nyc-date", nycDate);
		updateInnerHTML("nyc-tz", nycTz + "hr");
		updateInnerHTML("ams-time", amsTime);
		updateInnerHTML("ams-date", amsDate);
		updateInnerHTML("ams-tz", amsTz + "hr");
		updateInnerHTML("syd-time", sydTime);
		updateInnerHTML("syd-date", sydDate);
		updateInnerHTML("syd-tz", sydTz + "hr");
	}

	// return
	return {
		focusElemById: focusElemById,
		getDate: getDate,
		getTime: getTime,
		getTimeZoneDiff: getTimeZoneDiff,
		retrieveLocalStorage: retrieveLocalStorage,
		saveToLocalStorage: saveToLocalStorage,
		search: search,
		toggleTheme: toggleTheme,
		updateAllDateTimes: updateAllDateTimes,
		updateInnerHTML: updateInnerHTML
	}
})();


// theme toggle
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", function (event) {
	const body = document.getElementsByTagName("body")[0]
	const css = Array.from(body.classList)[0]
	utils.toggleTheme(css);
	utils.saveToLocalStorage(css);
});


// run search
const search = document.getElementById("search");
search.addEventListener("keydown", function (event) {
	if (event.which === 13) {
		utils.search("search");
	}
});

// set last saved theme
let theme = utils.retrieveLocalStorage();
utils.toggleTheme(theme);

// focus search input
utils.focusElemById("search");

// set intervals
utils.updateAllDateTimes();
let clocks = window.setInterval(utils.updateAllDateTimes, 1000);