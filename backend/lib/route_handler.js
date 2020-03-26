const Router = require("./RouterTable")
const DataLib = require("./datalib")

const dataLib = new DataLib("../db")
const route = new Router()


route.get("notfound", (req, res) => {
	res(400, req)
})

route.post("", (req, res) => {
	res(200, {
		hello: "world",
		payload: req.query
	})
})

module.exports = route