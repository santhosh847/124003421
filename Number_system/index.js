const express = require("express");
const app = express();

app.get("/", (req, res) => {
	//home page
	res.status(200).send("Welcome, explore /numbers route");
});

async function fetchUrl(url, numberSet) {
	try {
		let numbers = await fetch(url);
		const response = await numbers.json();
		for (const number of response.numbers) {
			numberSet.add(number);
		}
	} catch (e) {
		//do nothing if fetch fails
	}
}

async function fetchEverything(urls, numberSet) {
	for (const url of urls) {
		try {
			const res = fetchUrl(url, numberSet);
		} catch (e) {
			//leave if we can't get particular url
		}
	}
}

app.get("/numbers", async (req, res) => {
	let urls = req.query.url;
	var numberSet = new Set();
	if (!urls) {
		res.status(400).send("Give Url for API in query that returns number");
	}
	//  if only single url is passed
	//  make it array
	if (!Array.isArray(urls)) {
		urls = [urls];
	}
	try {
		await fetchEverything(urls, numberSet);

		//wait for 480ms after calling fetch asynchrounously
		//and then return numbers to ensure delay is not more than 500ms
		setTimeout(() => {
			let numbers = [];
			numbers = Array.from(numberSet);
			numbers = numbers.sort((a, b) => a - b);
			res.send({ numbers });
		}, 480);
	} catch (e) {
		res.status(500).send("Service unavailable, make sure url returns numbers");
		console.log(e);
	}
});

app.listen(3000, () => {
	console.log("listening on port 3000");
});
