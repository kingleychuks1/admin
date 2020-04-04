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
		//throw error to user
	}
}

async function createOrUpdateUser(data, type) {
	if(type == "create" && data) {
		var user = await fetch(API + "/member/?token_id=" + localStorage.getItem("token_id"), {
			method: "post",
			body: JSON.stringify(data)
		})

		console.log(user)

		user = await user.json()

		return user
	} else if(type == "update" && data) {

	} else {
		// throw error
	}
}

function throwError(contents) {

}