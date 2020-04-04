const API = "http://localhost:2001/"

async function authenticate(memid, passwd) {
	memid = typeof memid == "string" && memid.length >= 12 ? memid : false
	passwd = typeof passwd == "string" && passwd.length >= 6 ? passwd : false

	var isArgValid = memid && passwd

	var body = {
			memid,
			passwd
	}

	if (isArgValid) {
		var token = await fetch(API + "/auth/", {
			method: "post",
			body: JSON.stringify(body)
		})

		token = await token.json()

		return token

	} else {
		throwError("Please Enter a Valid Member ID or Password")
	}
}

async function createOrUpdateUser(data, type) {
	if(type == "create" && data) {
		let url
		try {
			url = API + "/member/?token_id=" + localStorage.getItem("token_id")
		} catch (err) {
			return null
		}

		var user = await fetch(url, {
			method: "post",
			body: JSON.stringify(data)
		})

		user = await user.json()

		return user
	} else if(type == "update" && data) {
		let url
		try {
			url = API + "/member/?token_id=" + localStorage.getItem("token_id")
		} catch (err) {
			return null
		}

		var user = await fetch(url, {
			method: "put",
			body: JSON.stringify(data)
		})

		user = await user.json()

		//console.log(user)

		return user
	} else {
		throwError("Invalid data")
	}
}

async function tokenHandler() {
	let token_id
	try {
		token_id = localStorage.getItem("token_id")
	} catch (err) {
		return null
	}

	var user = await fetch(API + "/member/?token_id=" + token_id, {
		method: "get"
	})

	user = await user.json()

	return user
	
}

async function checkUserAuth() {
	var user = await tokenHandler()

	console.log("authenticated")

	if (user) {
		return
	} else {
		console.log("unauthenticated")
		window.location.href = "/signin.html"
	}
}

function throwError(contents) {

}


checkUserAuth()