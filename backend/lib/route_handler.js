const Router = require("./routetable")
const DataLib = require("./datalib")
const helpers = require("./helpers")
const axios = require("axios")

const datalib = new DataLib("../../database")
const route = new Router()


const host = "http://localhost:2001/"
const bcrypt = require('bcrypt');
const SALTROUNDS = 10;


/**
 * todo - create a orders - post - get
 * todo - create ewallet - post - put - get
 * todo - create announcement - post - delete - get
 * todo - create message - post - delete - get - put
 */




/**
 * 
 * Not found Route Handler
 */
route.get("notfound", async (req, res) => {
	res(400, { "not found": "not found" })
})



/**
 * 
 * Users Route Handler
 * 
*/
/**
 * Retrieves a user from the database
 */
route.get("/member/", async (req, res) => {
	var token_id = typeof req.headers.token_id == "string" ? req.headers.token_id : false

	if (token_id) {
		datalib.read("tokens", token_id, function (err, token) {
			var isExpired = token.creation_time - Date.now() > 0 ? false : true;

			if (!err || !isExpired) {
				datalib.read("members", token.member_id, function (err, content) {
					if (err || !content) {
						res(400, {
							status: "1",
							error: "Haha! You Fucked Up"
						})
					} else {
						res(200, content)
					}
				})
			} else {
				res(400, {
					status: "1",
					error: "Haha! You Fucked Up"
				})
			}
		})
	}
})


/**
 * Creates a new member
 */
route.post("/member/", async (req, res) => {

	const response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var smemid = typeof response.data.member_id == "string" ? response.data.member_id : false

	var fname = typeof req.body.fname == "string" ? req.body.fname : false
	var lname = typeof req.body.lname == "string" ? req.body.lname : false
	var mname = typeof req.body.mname == "string" ? req.body.mname : false
	var memid = "member" + helpers.randomCharacter(6, "num");
	var email = typeof req.body.email == "string" ? req.body.email : false
	var telno = typeof req.body.telno == "string" ? req.body.telno : false
	var accno = typeof req.body.accno == "string" ? req.body.accno : false

	var accname = typeof req.body.accname == "string" ? req.body.accname : false
	var country = typeof req.body.country == "string" ? req.body.country : false
	var address = typeof req.body.address == "string" ? req.body.address : false


	var bankname = typeof req.body.bankname == "string" ? req.body.bankname : false

	var sfname = typeof req.body.sfname == "string" ? req.body.sfname : false
	var slname = typeof req.body.slname == "string" ? req.body.slname : false
	var saccno = typeof req.body.saccno == "string" ? req.body.saccno : false

	var saccname = typeof req.body.saccname == "string" ? req.body.saccname : false
	var saddress = typeof req.body.saddress == "string" ? req.body.saddress : false

	var sbankname = typeof req.body.sbankname == "string" ? req.body.sbankname : false


	var isArgValid = accname && country && address && fname && lname && mname && memid && email
		&& telno && accno && sfname && slname && smemid && saccno && saccname &&
		saddress && sbankname && bankname && token_is_valid

	if (isArgValid) {
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
			password: await bcrypt.hash("12345678", SALTROUNDS),
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

		datalib.create("/members/", memid, content, function (err) {
			if (!err) {
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
route.put("/member/", async (req, res) => {

	const response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var memid = typeof response.data.member_id == "string" ? response.data.member_id : false


	var fname = typeof req.body.fname == "string" ? req.body.fname : false
	var lname = typeof req.body.lname == "string" ? req.body.lname : false
	var mname = typeof req.body.mname == "string" ? req.body.mname : false
	var email = typeof req.body.email == "string" ? req.body.email : false
	var telno = typeof req.body.telno == "string" ? req.body.telno : false
	var accno = typeof req.body.accno == "string" ? req.body.accno : false

	var passwd = typeof req.body.passwd == "string" ? req.body.passwd : false

	var accname = typeof req.body.accname == "string" ? req.body.accname : false
	var country = typeof req.body.country == "string" ? req.body.country : false
	var address = typeof req.body.address == "string" ? req.body.address : false


	var bankname = typeof req.body.bankname == "string" ? req.body.bankname : false

	if (token_is_valid) {
		datalib.read("members", memid, async function (err, content) {
			if (!err && content) {
				if (fname) {
					content.first_name = fname
				}
				if (lname) {
					content.last_name = lname
				}
				if (mname) {
					content.middle_name = mname
				}
				if (email) {
					content.email = email
				}
				if (telno) {
					content.phone_number = telno
				}
				if (accno) {
					content.account_number = accno
				}
				if (accname) {
					content.account_name = accname
				}
				if (country) {
					content.country = country
				}
				if (address) {
					content.address = address
				}
				if (bankname) {
					content.bank_name = bankname
				}
				if (passwd) {
					content.password = await bcrypt.hash(passwd, SALTROUNDS)
				}

				datalib.update("members", memid, content, function (err) {
					if (err) {
						res(500, {
							status: "2",
							error: "Sorry, I Fucked Up"
						})
					} else {
						res(200, content)
					}
				})
			} else {
				res(400, {
					status: "1",
					error: "Haha! You Fucked Up"
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
 * 
 * Tokens Route Handler
 * 
*/
/**
 * creates user token
 */
route.post("token", async (req, res) => {
	var member_id = typeof req.body.memid == "string" ? req.body.memid : false
	if (member_id) {
		var token_id = helpers.randomCharacter(15, "alpha-num")

		var creation_time = Date.now()

		var content = {
			token_id,
			creation_time,
			expiration_time: creation_time + (1000 * 60 * 120),
			member_id
		}

		datalib.create("tokens", token_id, content, function (err) {
			if (err) {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up"
				})
			} else {
				res(200, content)
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
 * return user token
 */
route.get("token", async (req, res) => {
	var token_id = typeof req.params.token_id == "string" ? req.params.token_id : false

	if (token_id) {
		datalib.read("tokens", token_id, function (err, token) {
			if (err) {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up"
				})
			} else {
				res(200, token)
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
 * updates user token
 */
route.put("token", async (req, res) => {
	var token_id = typeof req.body.token_id == "string" ? req.body.token_id : false

	if (token_id) {
		datalib.read("tokens", token_id, function (err, token) {
			var creation_time = Date.now()
			token.creation_time = creation_time
			token.expiration_time = creation_time + (1000 * 60 * 120)

			datalib.update("tokens", token_id, token, function (err) {
				if (!err) {
					res(200, token)
				} else {
					res(500, {
						status: "2",
						error: "Sorry, I Fucked Up"
					})
				}
			})
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up"
		})
	}
})



/**
 * 
 * Sign In Handler
 * 
*/
route.post("auth", async (req, res) => {
	var memid = typeof req.body.memid == "string" ? req.body.memid : false
	var passwd = typeof req.body.passwd == "string" ? req.body.passwd : false

	var isArgValid = memid && passwd

	if (isArgValid) {
		datalib.read("members", memid, async function (err, data) {
			if (!err && data) {
				data.password = typeof data.password == "string" ? data.password : ""
				const password = await bcrypt.compare(passwd, data.password)

 
				if(password) {
					const token = await axios({
						method: 'post',
						url: host + "/token",
						data: {
							memid
						}
					})

					if(token) {
						res(200, token.data)
					} else {
						res(500, {
							status: "2",
							error: "Sorry, I Fucked Up",
							user: false
						})
					}

				} else {
					res(400, {
						status: "1",
						error: "Haha! You Fucked Up",
					})
				}
			} else {
				res(400, {
					status: "1",
					error: "Haha! You Fucked Up",
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
 * 
 * Reset Password Route Handler
 * 
*/
/**
 * resets password
 */
route.post("reset", (req, res) => {
	var member_id = typeof req.body.memid == "string" ? req.body.memid : false

	if(member_id) {
		datalib.read("members", member_id, async function(err, data) {
			if(err) {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up",
					user: false
				})
			} else {
				var password = helpers.randomCharacter(6, "alpha-num-sym")
				data.password = await bcrypt.hash(password, SALTROUNDS)
				
				datalib.update("members", member_id, data, async function(err) {
					if(err) {
						res(500, {
							status: "2",
							error: "Sorry, I Fucked Up",
						})
					} else {
						data.password = password
						res(200, data)
					}
				})
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})






/**
 * 
 * Products Route Handler
 * 
*/
/**
 * creates and updates product
 */
route.post("product", async (req, res) => {
	var product = typeof req.body.product == "string" ? req.body.product : false
	var price = typeof req.body.price == "number" ? req.body.price : false
	var pv = typeof req.body.pv == "number" ? req.body.pv : false

	const response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false


	var isArgValid = product && price && pv && token_is_valid && (member_id == "administrator")
	
	if (isArgValid) {
		const content = {
			product,
			price, 
			pv
		}
		datalib.create("products", product, content, function(err) {
			if(err) {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up",
				})
			} else {
				res(200, content)
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})


/**
 * delete product
 */
route.delete("product", async (req, res) => {
	const response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)

	var product = typeof req.body.product == "string" ? req.body.product : false

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false

	var isArgValid = token_is_valid && (member_id == "administrator")
	
	if(isArgValid) {
		datalib.delete("products", product, function(err) {
			if(!err) {
				res(200, {
					product
				})
			} else {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up",
				})
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})


/**
 * retrive product product
 */
route.get("product", async (req, res) => {
	const response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false

	var isArgValid = member_id && token_is_valid

	if(isArgValid) {
		var collection = datalib.read_all_sync("products")

		if (collection) {
			res(200, collection)
		} else {
			res(500, {
				status: "2",
				error: "Sorry, I Fucked Up",
			})
		}
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})






/**
 * 
 * Orders Route Handlers
 * 
*/


module.exports = route