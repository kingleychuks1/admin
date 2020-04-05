"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var API = "http://localhost:2001/";

function authenticate(_x, _x2) {
  return _authenticate.apply(this, arguments);
}

function _authenticate() {
  _authenticate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(memid, passwd) {
    var isArgValid, body, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            memid = typeof memid == "string" && memid.length >= 12 ? memid : false;
            passwd = typeof passwd == "string" && passwd.length >= 6 ? passwd : false;
            console.log(memid, passwd);
            isArgValid = memid && passwd;
            console.log(isArgValid);
            body = {
              memid: memid,
              passwd: passwd
            };

            if (!isArgValid) {
              _context.next = 16;
              break;
            }

            _context.next = 9;
            return fetch(API + "/auth/", {
              method: "post",
              body: JSON.stringify(body)
            });

          case 9:
            token = _context.sent;
            _context.next = 12;
            return token.json();

          case 12:
            token = _context.sent;
            return _context.abrupt("return", token);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _authenticate.apply(this, arguments);
}

function throwError() {}