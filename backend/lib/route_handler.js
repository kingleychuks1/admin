const Router = require("./RouterTable")
const DataLib = require("./datalib")

const dataLib = new DataLib("../../database")
const route = new Router()


route.get("notfound", (req, res) => {
	res(400, req)
})

/**
 * Gets specified user
 */
route.get("/user/", (req, res) => {
	res(200, "Returns User")
})

/**
 * Creates a new user
 */
route.post("/user/", (req, res) => {
	res(200, "Create User")
})

/**
 * Updates an already existing user
 */
route.put("/user/", (req, res) => {
	res(200, "Create User")
})

/**
 * Deletes an already existing user
 */
route.delete("/user/", (req, res) => {
	res(200, "Create User")
})


module.exports = route