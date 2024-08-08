const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("/auctions", (req, res) => {
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 6;
	const startIndex = (page - 1) * limit;
	const endIndex = startIndex + limit;

	const data = JSON.parse(fs.readFileSync(path.join(__dirname, "db.json")));
	const auctions = data.auctions.slice(startIndex, endIndex);

	res.jsonp({
		items: auctions,
		total: data.auctions.length,
	});
});

server.use(router);
server.listen(3000, () => {
	console.log("JSON Server is running");
});
