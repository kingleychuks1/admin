var helpers = {}

helpers.rmTrailingSlashes = function (string) {
  return string.replace(/^\/+|\/+$/g, "")
}


module.exports = helpers