class RouterTable {

  constructor() {
    this._get = this._post = this._put = 
    this._delete = this._update = this._post = {}
  }
  
  get(route, cb) {
    route = route.replace(/^\/+|\/+$/g, "")
    this._get[route] = cb
  }

  put(route, cb) {
    route = route.replace(/^\/+|\/+$/g, "")
    this._get[route] = cb
  }

  post(route, cb) {
    route = route.replace(/^\/+|\/+$/g, "")
    this._post[route] = cb
  }

  delete(route, cb) {
    route = route.replace(/^\/+|\/+$/g, "")
    this._delete[route] = cb
  }

  update(route, cb) {
    route = route.replace(/^\/+|\/+$/g, "")
    this._update[route] = cb
  }

  post(route, cb) {
    route = route.replace(/^\/+|\/+$/g, "")
    this._update[route] = cb
  }
}

module.exports = RouterTable