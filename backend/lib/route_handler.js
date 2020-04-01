const Router = require("./RouterTable")
const DataLib = require("./datalib")

const dataLib = new DataLib("../../database")
const route = new Router()


route.get("notfound", (req, res) => {
	res(400, {"not found": "not found"})
})

/**
 * Retrieves a user from the database
 */
route.get("/member/", (req, res) => {
	res(200, "Returns User")
})

/**
 * Creates a new member
 */
route.post("/member/", (req, res) => {
	var fname = typeof req.body.fname == "string" ? req.body.fname : false
	var lname = typeof req.body.lname == "string" ? req.body.lname : false
	var mname = typeof req.body.mname == "string" ? req.body.mname : false
	var memid = typeof req.body.memid == "string" ? req.body.memid : false
	var email = typeof req.body.email == "string" ? req.body.email : false
	var telno = typeof req.body.telno == "string" ? req.body.telno : false
	var accno = typeof req.body.accno == "string" ? req.body.accno : false

	var accname = typeof req.body.accname == "string" ? req.body.accname : false
	var country = typeof req.body.country == "string" ? req.body.country : false
	var address = typeof req.body.address == "string" ? req.body.address : false

	
	var bankname = typeof req.body.bankname == "string" ? req.body.bankname : false

	var sfname = typeof req.body.sfname == "string" ? req.body.sfname : false
	var slname = typeof req.body.slname == "string" ? req.body.slname : false
	var smemid = typeof req.body.smemid == "string" ? req.body.smemid : false
	var saccno = typeof req.body.saccno == "string" ? req.body.saccno : false

	var saccname = typeof req.body.saccname == "string" ? req.body.saccname : false
	var saddress = typeof req.body.saddress == "string" ? req.body.saddress : false

	var sbankname = typeof req.body.sbankname == "string" ? req.body.sbankname : false


	var isArgValid = accname && country && address && fname && lname && mname && memid && email
	&& telno && accno && sfname && slname && smemid && saccno && saccname && 
	saddress && sbankname && bankname

	if(isArgValid) {
		var content = {
			first_name: fname,
			last_name: lname,
			middle_name: mname,
			member_id: memid,
			email: email,
			address: address,
			phone_number: telno,
			bank_name: bankname,
			account_number: accno,
			account_name: accname,
			country: country,
			sponsor_details: {
				first_name: sfname,
				last_name: slname,
				member_id: smemid,
				address: saddress,
				bank_name: sbankname,
				account_number: saccno,
				account_name: saccname
			}
		}

		dataLib.createNewRecord("members", memid, content, function(err) {
			if(!err) {
				res(200, content)
			} else {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up"
				})
			}
		})


	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up"
		})
	}
})

/**
 * Updates an already existing member
 */
route.put("/member/", (req, res) => {
	res(200, "Create User")
})

/**
 * Deletes an already existing member
 */
route.delete("/member/", (req, res) => {
	res(200, "Create User")
})


module.exports = route