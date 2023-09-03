const express = require("express");
const app = express();

app.get("/numbers", async (req, res) => {
	let urls = req.query.url;
	let numberSet = new Set();

	//  if only single url is passed
	//  make it array
	if (!Array.isArray(urls)) {
		urls = [urls];
	}
	await urls.forEach(async (url) => {
		await fetch(url).then(async (res) => {
			(await res.json()).numbers.forEach((number) => numberSet.add(number));
		});
	});
	console.log(numberSet);
	res.send("got request");
});

app.listen(3000, () => {
	console.log("listening on port 3000");
});
