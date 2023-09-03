const express = require("express");
const app = express();

app.get("/numbers", async (req, res) => {
	let urls = req.query.url;
	var numberSet = new Set();

	//  if only single url is passed
	//  make it array
	if (!Array.isArray(urls)) {
		urls = [urls];
	}
	try {
		for (const url of urls) {
			let numbers = await fetch(url);
			const response = await numbers.json();
			for (const number of response.numbers) {
				numberSet.add(number);
			}
		}
		let numbers = [];
		numbers = Array.from(numberSet);
		numbers.sort();
		console.log(numbers);
		res.send(numbers);
	} catch (e) {
		res.status(500).send("Service unavailable");
	}
});

app.listen(3000, () => {
	console.log("listening on port 3000");
});
