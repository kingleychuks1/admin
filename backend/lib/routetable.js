const { rmTrailingSlashes } = require("./helpers")

class RouterTable {

	constructor () {
		this._get = {}
		this._post = {}
		this._put = {}
		this._delete = {}
		this._update = {}
		this._post = {}
	}

	get(route, cb) {
		route = rmTrailingSlashes(route)
		this._get[route] = cb
	}

	put(route, cb) {
		route = rmTrailingSlashes(route)
		this._put[route] = cb
	}

	post(route, cb) {
		route = rmTrailingSlashes(route)
		this._post[route] = cb
	}

	delete(route, cb) {
		route = rmTrailingSlashes(route)
		this._delete[route] = cb
	}
}

module.exports = RouterTable