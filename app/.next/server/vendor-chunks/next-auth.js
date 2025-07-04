exports.id = "vendor-chunks/next-auth";
exports.ids = ["vendor-chunks/next-auth"];
exports.modules = {

/***/ "(ssr)/./node_modules/next-auth/client/_utils.js":
/*!*************************************************!*\
  !*** ./node_modules/next-auth/client/_utils.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(ssr)/./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BroadcastChannel = BroadcastChannel;
exports.apiBaseUrl = apiBaseUrl;
exports.fetchData = fetchData;
exports.now = now;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "(ssr)/./node_modules/@babel/runtime/regenerator/index.js"));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "(ssr)/./node_modules/@babel/runtime/helpers/defineProperty.js"));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "(ssr)/./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function fetchData(_x, _x2, _x3) {
  return _fetchData.apply(this, arguments);
}
function _fetchData() {
  _fetchData = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(path, __NEXTAUTH, logger) {
    var _ref,
      ctx,
      _ref$req,
      req,
      url,
      _req$headers,
      options,
      res,
      data,
      _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _ref = _args.length > 3 && _args[3] !== undefined ? _args[3] : {}, ctx = _ref.ctx, _ref$req = _ref.req, req = _ref$req === void 0 ? ctx === null || ctx === void 0 ? void 0 : ctx.req : _ref$req;
          url = "".concat(apiBaseUrl(__NEXTAUTH), "/").concat(path);
          _context.prev = 2;
          options = {
            headers: _objectSpread({
              "Content-Type": "application/json"
            }, req !== null && req !== void 0 && (_req$headers = req.headers) !== null && _req$headers !== void 0 && _req$headers.cookie ? {
              cookie: req.headers.cookie
            } : {})
          };
          if (req !== null && req !== void 0 && req.body) {
            options.body = JSON.stringify(req.body);
            options.method = "POST";
          }
          _context.next = 7;
          return fetch(url, options);
        case 7:
          res = _context.sent;
          _context.next = 10;
          return res.json();
        case 10:
          data = _context.sent;
          if (res.ok) {
            _context.next = 13;
            break;
          }
          throw data;
        case 13:
          return _context.abrupt("return", Object.keys(data).length > 0 ? data : null);
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](2);
          logger.error("CLIENT_FETCH_ERROR", {
            error: _context.t0,
            url: url
          });
          return _context.abrupt("return", null);
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 16]]);
  }));
  return _fetchData.apply(this, arguments);
}
function apiBaseUrl(__NEXTAUTH) {
  if (typeof window === "undefined") {
    return "".concat(__NEXTAUTH.baseUrlServer).concat(__NEXTAUTH.basePathServer);
  }
  return __NEXTAUTH.basePath;
}
function now() {
  return Math.floor(Date.now() / 1000);
}
function BroadcastChannel() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "nextauth.message";
  return {
    receive: function receive(onReceive) {
      var handler = function handler(event) {
        var _event$newValue;
        if (event.key !== name) return;
        var message = JSON.parse((_event$newValue = event.newValue) !== null && _event$newValue !== void 0 ? _event$newValue : "{}");
        if ((message === null || message === void 0 ? void 0 : message.event) !== "session" || !(message !== null && message !== void 0 && message.data)) return;
        onReceive(message);
      };
      window.addEventListener("storage", handler);
      return function () {
        return window.removeEventListener("storage", handler);
      };
    },
    post: function post(message) {
      if (typeof window === "undefined") return;
      try {
        localStorage.setItem(name, JSON.stringify(_objectSpread(_objectSpread({}, message), {}, {
          timestamp: now()
        })));
      } catch (_unused) {}
    }
  };
}

/***/ }),

/***/ "(ssr)/./node_modules/next-auth/core/errors.js":
/*!***********************************************!*\
  !*** ./node_modules/next-auth/core/errors.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(ssr)/./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.UnsupportedStrategy = exports.UnknownError = exports.OAuthCallbackError = exports.MissingSecret = exports.MissingAuthorize = exports.MissingAdapterMethods = exports.MissingAdapter = exports.MissingAPIRoute = exports.InvalidCallbackUrl = exports.AccountNotLinkedError = void 0;
exports.adapterErrorHandler = adapterErrorHandler;
exports.capitalize = capitalize;
exports.eventsErrorHandler = eventsErrorHandler;
exports.upperSnake = upperSnake;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "(ssr)/./node_modules/@babel/runtime/regenerator/index.js"));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "(ssr)/./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "(ssr)/./node_modules/@babel/runtime/helpers/defineProperty.js"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "(ssr)/./node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "(ssr)/./node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "(ssr)/./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "(ssr)/./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "(ssr)/./node_modules/@babel/runtime/helpers/inherits.js"));
var _wrapNativeSuper2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "(ssr)/./node_modules/@babel/runtime/helpers/wrapNativeSuper.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var UnknownError = exports.UnknownError = function (_Error) {
  function UnknownError(error) {
    var _message;
    var _this;
    (0, _classCallCheck2.default)(this, UnknownError);
    _this = _callSuper(this, UnknownError, [(_message = error === null || error === void 0 ? void 0 : error.message) !== null && _message !== void 0 ? _message : error]);
    _this.name = "UnknownError";
    _this.code = error.code;
    if (error instanceof Error) {
      _this.stack = error.stack;
    }
    return _this;
  }
  (0, _inherits2.default)(UnknownError, _Error);
  return (0, _createClass2.default)(UnknownError, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        name: this.name,
        message: this.message,
        stack: this.stack
      };
    }
  }]);
}((0, _wrapNativeSuper2.default)(Error));
var OAuthCallbackError = exports.OAuthCallbackError = function (_UnknownError) {
  function OAuthCallbackError() {
    var _this2;
    (0, _classCallCheck2.default)(this, OAuthCallbackError);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _callSuper(this, OAuthCallbackError, [].concat(args));
    (0, _defineProperty2.default)(_this2, "name", "OAuthCallbackError");
    return _this2;
  }
  (0, _inherits2.default)(OAuthCallbackError, _UnknownError);
  return (0, _createClass2.default)(OAuthCallbackError);
}(UnknownError);
var AccountNotLinkedError = exports.AccountNotLinkedError = function (_UnknownError2) {
  function AccountNotLinkedError() {
    var _this3;
    (0, _classCallCheck2.default)(this, AccountNotLinkedError);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this3 = _callSuper(this, AccountNotLinkedError, [].concat(args));
    (0, _defineProperty2.default)(_this3, "name", "AccountNotLinkedError");
    return _this3;
  }
  (0, _inherits2.default)(AccountNotLinkedError, _UnknownError2);
  return (0, _createClass2.default)(AccountNotLinkedError);
}(UnknownError);
var MissingAPIRoute = exports.MissingAPIRoute = function (_UnknownError3) {
  function MissingAPIRoute() {
    var _this4;
    (0, _classCallCheck2.default)(this, MissingAPIRoute);
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    _this4 = _callSuper(this, MissingAPIRoute, [].concat(args));
    (0, _defineProperty2.default)(_this4, "name", "MissingAPIRouteError");
    (0, _defineProperty2.default)(_this4, "code", "MISSING_NEXTAUTH_API_ROUTE_ERROR");
    return _this4;
  }
  (0, _inherits2.default)(MissingAPIRoute, _UnknownError3);
  return (0, _createClass2.default)(MissingAPIRoute);
}(UnknownError);
var MissingSecret = exports.MissingSecret = function (_UnknownError4) {
  function MissingSecret() {
    var _this5;
    (0, _classCallCheck2.default)(this, MissingSecret);
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    _this5 = _callSuper(this, MissingSecret, [].concat(args));
    (0, _defineProperty2.default)(_this5, "name", "MissingSecretError");
    (0, _defineProperty2.default)(_this5, "code", "NO_SECRET");
    return _this5;
  }
  (0, _inherits2.default)(MissingSecret, _UnknownError4);
  return (0, _createClass2.default)(MissingSecret);
}(UnknownError);
var MissingAuthorize = exports.MissingAuthorize = function (_UnknownError5) {
  function MissingAuthorize() {
    var _this6;
    (0, _classCallCheck2.default)(this, MissingAuthorize);
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    _this6 = _callSuper(this, MissingAuthorize, [].concat(args));
    (0, _defineProperty2.default)(_this6, "name", "MissingAuthorizeError");
    (0, _defineProperty2.default)(_this6, "code", "CALLBACK_CREDENTIALS_HANDLER_ERROR");
    return _this6;
  }
  (0, _inherits2.default)(MissingAuthorize, _UnknownError5);
  return (0, _createClass2.default)(MissingAuthorize);
}(UnknownError);
var MissingAdapter = exports.MissingAdapter = function (_UnknownError6) {
  function MissingAdapter() {
    var _this7;
    (0, _classCallCheck2.default)(this, MissingAdapter);
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }
    _this7 = _callSuper(this, MissingAdapter, [].concat(args));
    (0, _defineProperty2.default)(_this7, "name", "MissingAdapterError");
    (0, _defineProperty2.default)(_this7, "code", "EMAIL_REQUIRES_ADAPTER_ERROR");
    return _this7;
  }
  (0, _inherits2.default)(MissingAdapter, _UnknownError6);
  return (0, _createClass2.default)(MissingAdapter);
}(UnknownError);
var MissingAdapterMethods = exports.MissingAdapterMethods = function (_UnknownError7) {
  function MissingAdapterMethods() {
    var _this8;
    (0, _classCallCheck2.default)(this, MissingAdapterMethods);
    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }
    _this8 = _callSuper(this, MissingAdapterMethods, [].concat(args));
    (0, _defineProperty2.default)(_this8, "name", "MissingAdapterMethodsError");
    (0, _defineProperty2.default)(_this8, "code", "MISSING_ADAPTER_METHODS_ERROR");
    return _this8;
  }
  (0, _inherits2.default)(MissingAdapterMethods, _UnknownError7);
  return (0, _createClass2.default)(MissingAdapterMethods);
}(UnknownError);
var UnsupportedStrategy = exports.UnsupportedStrategy = function (_UnknownError8) {
  function UnsupportedStrategy() {
    var _this9;
    (0, _classCallCheck2.default)(this, UnsupportedStrategy);
    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }
    _this9 = _callSuper(this, UnsupportedStrategy, [].concat(args));
    (0, _defineProperty2.default)(_this9, "name", "UnsupportedStrategyError");
    (0, _defineProperty2.default)(_this9, "code", "CALLBACK_CREDENTIALS_JWT_ERROR");
    return _this9;
  }
  (0, _inherits2.default)(UnsupportedStrategy, _UnknownError8);
  return (0, _createClass2.default)(UnsupportedStrategy);
}(UnknownError);
var InvalidCallbackUrl = exports.InvalidCallbackUrl = function (_UnknownError9) {
  function InvalidCallbackUrl() {
    var _this10;
    (0, _classCallCheck2.default)(this, InvalidCallbackUrl);
    for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }
    _this10 = _callSuper(this, InvalidCallbackUrl, [].concat(args));
    (0, _defineProperty2.default)(_this10, "name", "InvalidCallbackUrl");
    (0, _defineProperty2.default)(_this10, "code", "INVALID_CALLBACK_URL_ERROR");
    return _this10;
  }
  (0, _inherits2.default)(InvalidCallbackUrl, _UnknownError9);
  return (0, _createClass2.default)(InvalidCallbackUrl);
}(UnknownError);
function upperSnake(s) {
  return s.replace(/([A-Z])/g, "_$1").toUpperCase();
}
function capitalize(s) {
  return "".concat(s[0].toUpperCase()).concat(s.slice(1));
}
function eventsErrorHandler(methods, logger) {
  return Object.keys(methods).reduce(function (acc, name) {
    acc[name] = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
      var method,
        _args = arguments;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            method = methods[name];
            _context.next = 4;
            return method.apply(void 0, _args);
          case 4:
            return _context.abrupt("return", _context.sent);
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            logger.error("".concat(upperSnake(name), "_EVENT_ERROR"), _context.t0);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }));
    return acc;
  }, {});
}
function adapterErrorHandler(adapter, logger) {
  if (!adapter) return;
  return Object.keys(adapter).reduce(function (acc, name) {
    acc[name] = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
      var _len10,
        args,
        _key10,
        method,
        e,
        _args2 = arguments;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            for (_len10 = _args2.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
              args[_key10] = _args2[_key10];
            }
            logger.debug("adapter_".concat(name), {
              args: args
            });
            method = adapter[name];
            _context2.next = 6;
            return method.apply(void 0, args);
          case 6:
            return _context2.abrupt("return", _context2.sent);
          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            logger.error("adapter_error_".concat(name), _context2.t0);
            e = new UnknownError(_context2.t0);
            e.name = "".concat(capitalize(name), "Error");
            throw e;
          case 15:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 9]]);
    }));
    return acc;
  }, {});
}

/***/ }),

/***/ "(ssr)/./node_modules/next-auth/react/index.js":
/*!***********************************************!*\
  !*** ./node_modules/next-auth/react/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(ssr)/./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "(ssr)/./node_modules/@babel/runtime/helpers/typeof.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _exportNames = {
  SessionContext: true,
  useSession: true,
  getSession: true,
  getCsrfToken: true,
  getProviders: true,
  signIn: true,
  signOut: true,
  SessionProvider: true
};
exports.SessionContext = void 0;
exports.SessionProvider = SessionProvider;
exports.getCsrfToken = getCsrfToken;
exports.getProviders = getProviders;
exports.getSession = getSession;
exports.signIn = signIn;
exports.signOut = signOut;
exports.useSession = useSession;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "(ssr)/./node_modules/@babel/runtime/regenerator/index.js"));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "(ssr)/./node_modules/@babel/runtime/helpers/defineProperty.js"));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "(ssr)/./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "(ssr)/./node_modules/@babel/runtime/helpers/slicedToArray.js"));
var React = _interopRequireWildcard(__webpack_require__(/*! react */ "(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js"));
var _logger2 = _interopRequireWildcard(__webpack_require__(/*! ../utils/logger */ "(ssr)/./node_modules/next-auth/utils/logger.js"));
var _parseUrl = _interopRequireDefault(__webpack_require__(/*! ../utils/parse-url */ "(ssr)/./node_modules/next-auth/utils/parse-url.js"));
var _utils = __webpack_require__(/*! ../client/_utils */ "(ssr)/./node_modules/next-auth/client/_utils.js");
var _jsxRuntime = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
var _types = __webpack_require__(/*! ./types */ "(ssr)/./node_modules/next-auth/react/types.js");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});
var _process$env$NEXTAUTH, _ref, _process$env$NEXTAUTH2, _process$env$NEXTAUTH3, _React$createContext;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var __NEXTAUTH = {
  baseUrl: (0, _parseUrl.default)((_process$env$NEXTAUTH = process.env.NEXTAUTH_URL) !== null && _process$env$NEXTAUTH !== void 0 ? _process$env$NEXTAUTH : process.env.VERCEL_URL).origin,
  basePath: (0, _parseUrl.default)(process.env.NEXTAUTH_URL).path,
  baseUrlServer: (0, _parseUrl.default)((_ref = (_process$env$NEXTAUTH2 = process.env.NEXTAUTH_URL_INTERNAL) !== null && _process$env$NEXTAUTH2 !== void 0 ? _process$env$NEXTAUTH2 : process.env.NEXTAUTH_URL) !== null && _ref !== void 0 ? _ref : process.env.VERCEL_URL).origin,
  basePathServer: (0, _parseUrl.default)((_process$env$NEXTAUTH3 = process.env.NEXTAUTH_URL_INTERNAL) !== null && _process$env$NEXTAUTH3 !== void 0 ? _process$env$NEXTAUTH3 : process.env.NEXTAUTH_URL).path,
  _lastSync: 0,
  _session: undefined,
  _getSession: function _getSession() {}
};
var broadcast = (0, _utils.BroadcastChannel)();
var logger = (0, _logger2.proxyLogger)(_logger2.default, __NEXTAUTH.basePath);
function useOnline() {
  var _React$useState = React.useState(typeof navigator !== "undefined" ? navigator.onLine : false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    isOnline = _React$useState2[0],
    setIsOnline = _React$useState2[1];
  var setOnline = function setOnline() {
    return setIsOnline(true);
  };
  var setOffline = function setOffline() {
    return setIsOnline(false);
  };
  React.useEffect(function () {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);
    return function () {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);
  return isOnline;
}
var SessionContext = exports.SessionContext = (_React$createContext = React.createContext) === null || _React$createContext === void 0 ? void 0 : _React$createContext.call(React, undefined);
function useSession(options) {
  if (!SessionContext) {
    throw new Error("React Context is unavailable in Server Components");
  }
  var value = React.useContext(SessionContext);
  if (!value && "development" !== "production") {
    throw new Error("[next-auth]: `useSession` must be wrapped in a <SessionProvider />");
  }
  var _ref2 = options !== null && options !== void 0 ? options : {},
    required = _ref2.required,
    onUnauthenticated = _ref2.onUnauthenticated;
  var requiredAndNotLoading = required && value.status === "unauthenticated";
  React.useEffect(function () {
    if (requiredAndNotLoading) {
      var url = "/api/auth/signin?".concat(new URLSearchParams({
        error: "SessionRequired",
        callbackUrl: window.location.href
      }));
      if (onUnauthenticated) onUnauthenticated();else window.location.href = url;
    }
  }, [requiredAndNotLoading, onUnauthenticated]);
  if (requiredAndNotLoading) {
    return {
      data: value.data,
      update: value.update,
      status: "loading"
    };
  }
  return value;
}
function getSession(_x) {
  return _getSession2.apply(this, arguments);
}
function _getSession2() {
  _getSession2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(params) {
    var _params$broadcast;
    var session;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _utils.fetchData)("session", __NEXTAUTH, logger, params);
        case 2:
          session = _context3.sent;
          if ((_params$broadcast = params === null || params === void 0 ? void 0 : params.broadcast) !== null && _params$broadcast !== void 0 ? _params$broadcast : true) {
            broadcast.post({
              event: "session",
              data: {
                trigger: "getSession"
              }
            });
          }
          return _context3.abrupt("return", session);
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getSession2.apply(this, arguments);
}
function getCsrfToken(_x2) {
  return _getCsrfToken.apply(this, arguments);
}
function _getCsrfToken() {
  _getCsrfToken = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(params) {
    var response;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _utils.fetchData)("csrf", __NEXTAUTH, logger, params);
        case 2:
          response = _context4.sent;
          return _context4.abrupt("return", response === null || response === void 0 ? void 0 : response.csrfToken);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getCsrfToken.apply(this, arguments);
}
function getProviders() {
  return _getProviders.apply(this, arguments);
}
function _getProviders() {
  _getProviders = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5() {
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _utils.fetchData)("providers", __NEXTAUTH, logger);
        case 2:
          return _context5.abrupt("return", _context5.sent);
        case 3:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _getProviders.apply(this, arguments);
}
function signIn(_x3, _x4, _x5) {
  return _signIn.apply(this, arguments);
}
function _signIn() {
  _signIn = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(provider, options, authorizationParams) {
    var _ref5, _ref5$callbackUrl, callbackUrl, _ref5$redirect, redirect, baseUrl, providers, isCredentials, isEmail, isSupportingReturn, signInUrl, _signInUrl, res, data, _data$url, url, error;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _ref5 = options !== null && options !== void 0 ? options : {}, _ref5$callbackUrl = _ref5.callbackUrl, callbackUrl = _ref5$callbackUrl === void 0 ? window.location.href : _ref5$callbackUrl, _ref5$redirect = _ref5.redirect, redirect = _ref5$redirect === void 0 ? true : _ref5$redirect;
          baseUrl = (0, _utils.apiBaseUrl)(__NEXTAUTH);
          _context6.next = 4;
          return getProviders();
        case 4:
          providers = _context6.sent;
          if (providers) {
            _context6.next = 8;
            break;
          }
          window.location.href = "".concat(baseUrl, "/error");
          return _context6.abrupt("return");
        case 8:
          if (!(!provider || !(provider in providers))) {
            _context6.next = 11;
            break;
          }
          window.location.href = "".concat(baseUrl, "/signin?").concat(new URLSearchParams({
            callbackUrl: callbackUrl
          }));
          return _context6.abrupt("return");
        case 11:
          isCredentials = providers[provider].type === "credentials";
          isEmail = providers[provider].type === "email";
          isSupportingReturn = isCredentials || isEmail;
          signInUrl = "".concat(baseUrl, "/").concat(isCredentials ? "callback" : "signin", "/").concat(provider);
          _signInUrl = "".concat(signInUrl).concat(authorizationParams ? "?".concat(new URLSearchParams(authorizationParams)) : "");
          _context6.t0 = fetch;
          _context6.t1 = _signInUrl;
          _context6.t2 = {
            "Content-Type": "application/x-www-form-urlencoded"
          };
          _context6.t3 = URLSearchParams;
          _context6.t4 = _objectSpread;
          _context6.t5 = _objectSpread({}, options);
          _context6.t6 = {};
          _context6.next = 25;
          return getCsrfToken();
        case 25:
          _context6.t7 = _context6.sent;
          _context6.t8 = callbackUrl;
          _context6.t9 = {
            csrfToken: _context6.t7,
            callbackUrl: _context6.t8,
            json: true
          };
          _context6.t10 = (0, _context6.t4)(_context6.t5, _context6.t6, _context6.t9);
          _context6.t11 = new _context6.t3(_context6.t10);
          _context6.t12 = {
            method: "post",
            headers: _context6.t2,
            body: _context6.t11
          };
          _context6.next = 33;
          return (0, _context6.t0)(_context6.t1, _context6.t12);
        case 33:
          res = _context6.sent;
          _context6.next = 36;
          return res.json();
        case 36:
          data = _context6.sent;
          if (!(redirect || !isSupportingReturn)) {
            _context6.next = 42;
            break;
          }
          url = (_data$url = data.url) !== null && _data$url !== void 0 ? _data$url : callbackUrl;
          window.location.href = url;
          if (url.includes("#")) window.location.reload();
          return _context6.abrupt("return");
        case 42:
          error = new URL(data.url).searchParams.get("error");
          if (!res.ok) {
            _context6.next = 46;
            break;
          }
          _context6.next = 46;
          return __NEXTAUTH._getSession({
            event: "storage"
          });
        case 46:
          return _context6.abrupt("return", {
            error: error,
            status: res.status,
            ok: res.ok,
            url: error ? null : data.url
          });
        case 47:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _signIn.apply(this, arguments);
}
function signOut(_x6) {
  return _signOut.apply(this, arguments);
}
function _signOut() {
  _signOut = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(options) {
    var _options$redirect;
    var _ref6, _ref6$callbackUrl, callbackUrl, baseUrl, fetchOptions, res, data, _data$url2, url;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _ref6 = options !== null && options !== void 0 ? options : {}, _ref6$callbackUrl = _ref6.callbackUrl, callbackUrl = _ref6$callbackUrl === void 0 ? window.location.href : _ref6$callbackUrl;
          baseUrl = (0, _utils.apiBaseUrl)(__NEXTAUTH);
          _context7.t0 = {
            "Content-Type": "application/x-www-form-urlencoded"
          };
          _context7.t1 = URLSearchParams;
          _context7.next = 6;
          return getCsrfToken();
        case 6:
          _context7.t2 = _context7.sent;
          _context7.t3 = callbackUrl;
          _context7.t4 = {
            csrfToken: _context7.t2,
            callbackUrl: _context7.t3,
            json: true
          };
          _context7.t5 = new _context7.t1(_context7.t4);
          fetchOptions = {
            method: "post",
            headers: _context7.t0,
            body: _context7.t5
          };
          _context7.next = 13;
          return fetch("".concat(baseUrl, "/signout"), fetchOptions);
        case 13:
          res = _context7.sent;
          _context7.next = 16;
          return res.json();
        case 16:
          data = _context7.sent;
          broadcast.post({
            event: "session",
            data: {
              trigger: "signout"
            }
          });
          if (!((_options$redirect = options === null || options === void 0 ? void 0 : options.redirect) !== null && _options$redirect !== void 0 ? _options$redirect : true)) {
            _context7.next = 23;
            break;
          }
          url = (_data$url2 = data.url) !== null && _data$url2 !== void 0 ? _data$url2 : callbackUrl;
          window.location.href = url;
          if (url.includes("#")) window.location.reload();
          return _context7.abrupt("return");
        case 23:
          _context7.next = 25;
          return __NEXTAUTH._getSession({
            event: "storage"
          });
        case 25:
          return _context7.abrupt("return", data);
        case 26:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _signOut.apply(this, arguments);
}
function SessionProvider(props) {
  if (!SessionContext) {
    throw new Error("React Context is unavailable in Server Components");
  }
  var children = props.children,
    basePath = props.basePath,
    refetchInterval = props.refetchInterval,
    refetchWhenOffline = props.refetchWhenOffline;
  if (basePath) __NEXTAUTH.basePath = basePath;
  var hasInitialSession = props.session !== undefined;
  __NEXTAUTH._lastSync = hasInitialSession ? (0, _utils.now)() : 0;
  var _React$useState3 = React.useState(function () {
      if (hasInitialSession) __NEXTAUTH._session = props.session;
      return props.session;
    }),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    session = _React$useState4[0],
    setSession = _React$useState4[1];
  var _React$useState5 = React.useState(!hasInitialSession),
    _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
    loading = _React$useState6[0],
    setLoading = _React$useState6[1];
  React.useEffect(function () {
    __NEXTAUTH._getSession = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
      var _ref4,
        event,
        storageEvent,
        _args = arguments;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _ref4 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, event = _ref4.event;
            _context.prev = 1;
            storageEvent = event === "storage";
            if (!(storageEvent || __NEXTAUTH._session === undefined)) {
              _context.next = 10;
              break;
            }
            __NEXTAUTH._lastSync = (0, _utils.now)();
            _context.next = 7;
            return getSession({
              broadcast: !storageEvent
            });
          case 7:
            __NEXTAUTH._session = _context.sent;
            setSession(__NEXTAUTH._session);
            return _context.abrupt("return");
          case 10:
            if (!(!event || __NEXTAUTH._session === null || (0, _utils.now)() < __NEXTAUTH._lastSync)) {
              _context.next = 12;
              break;
            }
            return _context.abrupt("return");
          case 12:
            __NEXTAUTH._lastSync = (0, _utils.now)();
            _context.next = 15;
            return getSession();
          case 15:
            __NEXTAUTH._session = _context.sent;
            setSession(__NEXTAUTH._session);
            _context.next = 22;
            break;
          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](1);
            logger.error("CLIENT_SESSION_ERROR", _context.t0);
          case 22:
            _context.prev = 22;
            setLoading(false);
            return _context.finish(22);
          case 25:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 19, 22, 25]]);
    }));
    __NEXTAUTH._getSession();
    return function () {
      __NEXTAUTH._lastSync = 0;
      __NEXTAUTH._session = undefined;
      __NEXTAUTH._getSession = function () {};
    };
  }, []);
  React.useEffect(function () {
    var unsubscribe = broadcast.receive(function () {
      return __NEXTAUTH._getSession({
        event: "storage"
      });
    });
    return function () {
      return unsubscribe();
    };
  }, []);
  React.useEffect(function () {
    var _props$refetchOnWindo = props.refetchOnWindowFocus,
      refetchOnWindowFocus = _props$refetchOnWindo === void 0 ? true : _props$refetchOnWindo;
    var visibilityHandler = function visibilityHandler() {
      if (refetchOnWindowFocus && document.visibilityState === "visible") __NEXTAUTH._getSession({
        event: "visibilitychange"
      });
    };
    document.addEventListener("visibilitychange", visibilityHandler, false);
    return function () {
      return document.removeEventListener("visibilitychange", visibilityHandler, false);
    };
  }, [props.refetchOnWindowFocus]);
  var isOnline = useOnline();
  var shouldRefetch = refetchWhenOffline !== false || isOnline;
  React.useEffect(function () {
    if (refetchInterval && shouldRefetch) {
      var refetchIntervalTimer = setInterval(function () {
        if (__NEXTAUTH._session) {
          __NEXTAUTH._getSession({
            event: "poll"
          });
        }
      }, refetchInterval * 1000);
      return function () {
        return clearInterval(refetchIntervalTimer);
      };
    }
  }, [refetchInterval, shouldRefetch]);
  var value = React.useMemo(function () {
    return {
      data: session,
      status: loading ? "loading" : session ? "authenticated" : "unauthenticated",
      update: function update(data) {
        return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
          var newSession;
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                if (!(loading || !session)) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                setLoading(true);
                _context2.t0 = _utils.fetchData;
                _context2.t1 = __NEXTAUTH;
                _context2.t2 = logger;
                _context2.next = 8;
                return getCsrfToken();
              case 8:
                _context2.t3 = _context2.sent;
                _context2.t4 = data;
                _context2.t5 = {
                  csrfToken: _context2.t3,
                  data: _context2.t4
                };
                _context2.t6 = {
                  body: _context2.t5
                };
                _context2.t7 = {
                  req: _context2.t6
                };
                _context2.next = 15;
                return (0, _context2.t0)("session", _context2.t1, _context2.t2, _context2.t7);
              case 15:
                newSession = _context2.sent;
                setLoading(false);
                if (newSession) {
                  setSession(newSession);
                  broadcast.post({
                    event: "session",
                    data: {
                      trigger: "getSession"
                    }
                  });
                }
                return _context2.abrupt("return", newSession);
              case 19:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      }
    };
  }, [session, loading]);
  return (0, _jsxRuntime.jsx)(SessionContext.Provider, {
    value: value,
    children: children
  });
}

/***/ }),

/***/ "(ssr)/./node_modules/next-auth/react/types.js":
/*!***********************************************!*\
  !*** ./node_modules/next-auth/react/types.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "(ssr)/./node_modules/next-auth/utils/logger.js":
/*!************************************************!*\
  !*** ./node_modules/next-auth/utils/logger.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(ssr)/./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
exports.proxyLogger = proxyLogger;
exports.setLogger = setLogger;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "(ssr)/./node_modules/@babel/runtime/regenerator/index.js"));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "(ssr)/./node_modules/@babel/runtime/helpers/defineProperty.js"));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "(ssr)/./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));
var _errors = __webpack_require__(/*! ../core/errors */ "(ssr)/./node_modules/next-auth/core/errors.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function formatError(o) {
  if (o instanceof Error && !(o instanceof _errors.UnknownError)) {
    return {
      message: o.message,
      stack: o.stack,
      name: o.name
    };
  }
  if (hasErrorProperty(o)) {
    var _o$message;
    o.error = formatError(o.error);
    o.message = (_o$message = o.message) !== null && _o$message !== void 0 ? _o$message : o.error.message;
  }
  return o;
}
function hasErrorProperty(x) {
  return !!(x !== null && x !== void 0 && x.error);
}
var _logger = {
  error: function error(code, metadata) {
    metadata = formatError(metadata);
    console.error("[next-auth][error][".concat(code, "]"), "\nhttps://next-auth.js.org/errors#".concat(code.toLowerCase()), metadata.message, metadata);
  },
  warn: function warn(code) {
    console.warn("[next-auth][warn][".concat(code, "]"), "\nhttps://next-auth.js.org/warnings#".concat(code.toLowerCase()));
  },
  debug: function debug(code, metadata) {
    console.log("[next-auth][debug][".concat(code, "]"), metadata);
  }
};
function setLogger() {
  var newLogger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var debug = arguments.length > 1 ? arguments[1] : undefined;
  if (!debug) _logger.debug = function () {};
  if (newLogger.error) _logger.error = newLogger.error;
  if (newLogger.warn) _logger.warn = newLogger.warn;
  if (newLogger.debug) _logger.debug = newLogger.debug;
}
var _default = exports["default"] = _logger;
function proxyLogger() {
  var logger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _logger;
  var basePath = arguments.length > 1 ? arguments[1] : undefined;
  try {
    if (typeof window === "undefined") {
      return logger;
    }
    var clientLogger = {};
    var _loop = function _loop(level) {
      clientLogger[level] = function () {
        var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(code, metadata) {
          var url, body;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _logger[level](code, metadata);
                if (level === "error") {
                  metadata = formatError(metadata);
                }
                ;
                metadata.client = true;
                url = "".concat(basePath, "/_log");
                body = new URLSearchParams(_objectSpread({
                  level: level,
                  code: code
                }, metadata));
                if (!navigator.sendBeacon) {
                  _context.next = 8;
                  break;
                }
                return _context.abrupt("return", navigator.sendBeacon(url, body));
              case 8:
                _context.next = 10;
                return fetch(url, {
                  method: "POST",
                  body: body,
                  keepalive: true
                });
              case 10:
                return _context.abrupt("return", _context.sent);
              case 11:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }();
    };
    for (var level in logger) {
      _loop(level);
    }
    return clientLogger;
  } catch (_unused) {
    return _logger;
  }
}

/***/ }),

/***/ "(ssr)/./node_modules/next-auth/utils/parse-url.js":
/*!***************************************************!*\
  !*** ./node_modules/next-auth/utils/parse-url.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = parseUrl;
function parseUrl(url) {
  var _url2;
  const defaultUrl = new URL("http://localhost:3000/api/auth");
  if (url && !url.startsWith("http")) {
    url = `https://${url}`;
  }
  const _url = new URL((_url2 = url) !== null && _url2 !== void 0 ? _url2 : defaultUrl);
  const path = (_url.pathname === "/" ? defaultUrl.pathname : _url.pathname).replace(/\/$/, "");
  const base = `${_url.origin}${path}`;
  return {
    origin: _url.origin,
    host: _url.host,
    path,
    base,
    toString: () => base
  };
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/errors.js":
/*!***********************************************!*\
  !*** ./node_modules/next-auth/core/errors.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(rsc)/./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.UnsupportedStrategy = exports.UnknownError = exports.OAuthCallbackError = exports.MissingSecret = exports.MissingAuthorize = exports.MissingAdapterMethods = exports.MissingAdapter = exports.MissingAPIRoute = exports.InvalidCallbackUrl = exports.AccountNotLinkedError = void 0;
exports.adapterErrorHandler = adapterErrorHandler;
exports.capitalize = capitalize;
exports.eventsErrorHandler = eventsErrorHandler;
exports.upperSnake = upperSnake;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "(rsc)/./node_modules/@babel/runtime/regenerator/index.js"));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "(rsc)/./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "(rsc)/./node_modules/@babel/runtime/helpers/defineProperty.js"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "(rsc)/./node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "(rsc)/./node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "(rsc)/./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "(rsc)/./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "(rsc)/./node_modules/@babel/runtime/helpers/inherits.js"));
var _wrapNativeSuper2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "(rsc)/./node_modules/@babel/runtime/helpers/wrapNativeSuper.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var UnknownError = exports.UnknownError = function (_Error) {
  function UnknownError(error) {
    var _message;
    var _this;
    (0, _classCallCheck2.default)(this, UnknownError);
    _this = _callSuper(this, UnknownError, [(_message = error === null || error === void 0 ? void 0 : error.message) !== null && _message !== void 0 ? _message : error]);
    _this.name = "UnknownError";
    _this.code = error.code;
    if (error instanceof Error) {
      _this.stack = error.stack;
    }
    return _this;
  }
  (0, _inherits2.default)(UnknownError, _Error);
  return (0, _createClass2.default)(UnknownError, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        name: this.name,
        message: this.message,
        stack: this.stack
      };
    }
  }]);
}((0, _wrapNativeSuper2.default)(Error));
var OAuthCallbackError = exports.OAuthCallbackError = function (_UnknownError) {
  function OAuthCallbackError() {
    var _this2;
    (0, _classCallCheck2.default)(this, OAuthCallbackError);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _callSuper(this, OAuthCallbackError, [].concat(args));
    (0, _defineProperty2.default)(_this2, "name", "OAuthCallbackError");
    return _this2;
  }
  (0, _inherits2.default)(OAuthCallbackError, _UnknownError);
  return (0, _createClass2.default)(OAuthCallbackError);
}(UnknownError);
var AccountNotLinkedError = exports.AccountNotLinkedError = function (_UnknownError2) {
  function AccountNotLinkedError() {
    var _this3;
    (0, _classCallCheck2.default)(this, AccountNotLinkedError);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this3 = _callSuper(this, AccountNotLinkedError, [].concat(args));
    (0, _defineProperty2.default)(_this3, "name", "AccountNotLinkedError");
    return _this3;
  }
  (0, _inherits2.default)(AccountNotLinkedError, _UnknownError2);
  return (0, _createClass2.default)(AccountNotLinkedError);
}(UnknownError);
var MissingAPIRoute = exports.MissingAPIRoute = function (_UnknownError3) {
  function MissingAPIRoute() {
    var _this4;
    (0, _classCallCheck2.default)(this, MissingAPIRoute);
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    _this4 = _callSuper(this, MissingAPIRoute, [].concat(args));
    (0, _defineProperty2.default)(_this4, "name", "MissingAPIRouteError");
    (0, _defineProperty2.default)(_this4, "code", "MISSING_NEXTAUTH_API_ROUTE_ERROR");
    return _this4;
  }
  (0, _inherits2.default)(MissingAPIRoute, _UnknownError3);
  return (0, _createClass2.default)(MissingAPIRoute);
}(UnknownError);
var MissingSecret = exports.MissingSecret = function (_UnknownError4) {
  function MissingSecret() {
    var _this5;
    (0, _classCallCheck2.default)(this, MissingSecret);
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    _this5 = _callSuper(this, MissingSecret, [].concat(args));
    (0, _defineProperty2.default)(_this5, "name", "MissingSecretError");
    (0, _defineProperty2.default)(_this5, "code", "NO_SECRET");
    return _this5;
  }
  (0, _inherits2.default)(MissingSecret, _UnknownError4);
  return (0, _createClass2.default)(MissingSecret);
}(UnknownError);
var MissingAuthorize = exports.MissingAuthorize = function (_UnknownError5) {
  function MissingAuthorize() {
    var _this6;
    (0, _classCallCheck2.default)(this, MissingAuthorize);
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    _this6 = _callSuper(this, MissingAuthorize, [].concat(args));
    (0, _defineProperty2.default)(_this6, "name", "MissingAuthorizeError");
    (0, _defineProperty2.default)(_this6, "code", "CALLBACK_CREDENTIALS_HANDLER_ERROR");
    return _this6;
  }
  (0, _inherits2.default)(MissingAuthorize, _UnknownError5);
  return (0, _createClass2.default)(MissingAuthorize);
}(UnknownError);
var MissingAdapter = exports.MissingAdapter = function (_UnknownError6) {
  function MissingAdapter() {
    var _this7;
    (0, _classCallCheck2.default)(this, MissingAdapter);
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }
    _this7 = _callSuper(this, MissingAdapter, [].concat(args));
    (0, _defineProperty2.default)(_this7, "name", "MissingAdapterError");
    (0, _defineProperty2.default)(_this7, "code", "EMAIL_REQUIRES_ADAPTER_ERROR");
    return _this7;
  }
  (0, _inherits2.default)(MissingAdapter, _UnknownError6);
  return (0, _createClass2.default)(MissingAdapter);
}(UnknownError);
var MissingAdapterMethods = exports.MissingAdapterMethods = function (_UnknownError7) {
  function MissingAdapterMethods() {
    var _this8;
    (0, _classCallCheck2.default)(this, MissingAdapterMethods);
    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }
    _this8 = _callSuper(this, MissingAdapterMethods, [].concat(args));
    (0, _defineProperty2.default)(_this8, "name", "MissingAdapterMethodsError");
    (0, _defineProperty2.default)(_this8, "code", "MISSING_ADAPTER_METHODS_ERROR");
    return _this8;
  }
  (0, _inherits2.default)(MissingAdapterMethods, _UnknownError7);
  return (0, _createClass2.default)(MissingAdapterMethods);
}(UnknownError);
var UnsupportedStrategy = exports.UnsupportedStrategy = function (_UnknownError8) {
  function UnsupportedStrategy() {
    var _this9;
    (0, _classCallCheck2.default)(this, UnsupportedStrategy);
    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }
    _this9 = _callSuper(this, UnsupportedStrategy, [].concat(args));
    (0, _defineProperty2.default)(_this9, "name", "UnsupportedStrategyError");
    (0, _defineProperty2.default)(_this9, "code", "CALLBACK_CREDENTIALS_JWT_ERROR");
    return _this9;
  }
  (0, _inherits2.default)(UnsupportedStrategy, _UnknownError8);
  return (0, _createClass2.default)(UnsupportedStrategy);
}(UnknownError);
var InvalidCallbackUrl = exports.InvalidCallbackUrl = function (_UnknownError9) {
  function InvalidCallbackUrl() {
    var _this10;
    (0, _classCallCheck2.default)(this, InvalidCallbackUrl);
    for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }
    _this10 = _callSuper(this, InvalidCallbackUrl, [].concat(args));
    (0, _defineProperty2.default)(_this10, "name", "InvalidCallbackUrl");
    (0, _defineProperty2.default)(_this10, "code", "INVALID_CALLBACK_URL_ERROR");
    return _this10;
  }
  (0, _inherits2.default)(InvalidCallbackUrl, _UnknownError9);
  return (0, _createClass2.default)(InvalidCallbackUrl);
}(UnknownError);
function upperSnake(s) {
  return s.replace(/([A-Z])/g, "_$1").toUpperCase();
}
function capitalize(s) {
  return "".concat(s[0].toUpperCase()).concat(s.slice(1));
}
function eventsErrorHandler(methods, logger) {
  return Object.keys(methods).reduce(function (acc, name) {
    acc[name] = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
      var method,
        _args = arguments;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            method = methods[name];
            _context.next = 4;
            return method.apply(void 0, _args);
          case 4:
            return _context.abrupt("return", _context.sent);
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            logger.error("".concat(upperSnake(name), "_EVENT_ERROR"), _context.t0);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }));
    return acc;
  }, {});
}
function adapterErrorHandler(adapter, logger) {
  if (!adapter) return;
  return Object.keys(adapter).reduce(function (acc, name) {
    acc[name] = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
      var _len10,
        args,
        _key10,
        method,
        e,
        _args2 = arguments;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            for (_len10 = _args2.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
              args[_key10] = _args2[_key10];
            }
            logger.debug("adapter_".concat(name), {
              args: args
            });
            method = adapter[name];
            _context2.next = 6;
            return method.apply(void 0, args);
          case 6:
            return _context2.abrupt("return", _context2.sent);
          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            logger.error("adapter_error_".concat(name), _context2.t0);
            e = new UnknownError(_context2.t0);
            e.name = "".concat(capitalize(name), "Error");
            throw e;
          case 15:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 9]]);
    }));
    return acc;
  }, {});
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/index.js":
/*!**********************************************!*\
  !*** ./node_modules/next-auth/core/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(rsc)/./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AuthHandler = AuthHandler;
var _logger = _interopRequireWildcard(__webpack_require__(/*! ../utils/logger */ "(rsc)/./node_modules/next-auth/utils/logger.js"));
var _detectOrigin = __webpack_require__(/*! ../utils/detect-origin */ "(rsc)/./node_modules/next-auth/utils/detect-origin.js");
var routes = _interopRequireWildcard(__webpack_require__(/*! ./routes */ "(rsc)/./node_modules/next-auth/core/routes/index.js"));
var _pages = _interopRequireDefault(__webpack_require__(/*! ./pages */ "(rsc)/./node_modules/next-auth/core/pages/index.js"));
var _init = __webpack_require__(/*! ./init */ "(rsc)/./node_modules/next-auth/core/init.js");
var _assert = __webpack_require__(/*! ./lib/assert */ "(rsc)/./node_modules/next-auth/core/lib/assert.js");
var _cookie = __webpack_require__(/*! ./lib/cookie */ "(rsc)/./node_modules/next-auth/core/lib/cookie.js");
var _cookie2 = __webpack_require__(/*! cookie */ "(rsc)/./node_modules/next-auth/node_modules/cookie/index.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
async function getBody(req) {
  try {
    return await req.json();
  } catch (_unused) {}
}
async function toInternalRequest(req) {
  var _headers$xForwarded2;
  if (req instanceof Request) {
    var _req$headers$get, _url$searchParams$get, _headers$xForwarded;
    const url = new URL(req.url);
    const nextauth = url.pathname.split("/").slice(3);
    const headers = Object.fromEntries(req.headers);
    const query = Object.fromEntries(url.searchParams);
    query.nextauth = nextauth;
    return {
      action: nextauth[0],
      method: req.method,
      headers,
      body: await getBody(req),
      cookies: (0, _cookie2.parse)((_req$headers$get = req.headers.get("cookie")) !== null && _req$headers$get !== void 0 ? _req$headers$get : ""),
      providerId: nextauth[1],
      error: (_url$searchParams$get = url.searchParams.get("error")) !== null && _url$searchParams$get !== void 0 ? _url$searchParams$get : nextauth[1],
      origin: (0, _detectOrigin.detectOrigin)((_headers$xForwarded = headers["x-forwarded-host"]) !== null && _headers$xForwarded !== void 0 ? _headers$xForwarded : headers.host, headers["x-forwarded-proto"]),
      query
    };
  }
  const {
    headers
  } = req;
  const host = (_headers$xForwarded2 = headers === null || headers === void 0 ? void 0 : headers["x-forwarded-host"]) !== null && _headers$xForwarded2 !== void 0 ? _headers$xForwarded2 : headers === null || headers === void 0 ? void 0 : headers.host;
  req.origin = (0, _detectOrigin.detectOrigin)(host, headers === null || headers === void 0 ? void 0 : headers["x-forwarded-proto"]);
  return req;
}
async function AuthHandler(params) {
  var _req$body$callbackUrl, _req$body, _req$query2, _req$body2;
  const {
    options: authOptions,
    req: incomingRequest
  } = params;
  const req = await toInternalRequest(incomingRequest);
  (0, _logger.setLogger)(authOptions.logger, authOptions.debug);
  const assertionResult = (0, _assert.assertConfig)({
    options: authOptions,
    req
  });
  if (Array.isArray(assertionResult)) {
    assertionResult.forEach(_logger.default.warn);
  } else if (assertionResult instanceof Error) {
    var _req$query;
    _logger.default.error(assertionResult.code, assertionResult);
    const htmlPages = ["signin", "signout", "error", "verify-request"];
    if (!htmlPages.includes(req.action) || req.method !== "GET") {
      const message = `There is a problem with the server configuration. Check the server logs for more information.`;
      return {
        status: 500,
        headers: [{
          key: "Content-Type",
          value: "application/json"
        }],
        body: {
          message
        }
      };
    }
    const {
      pages,
      theme
    } = authOptions;
    const authOnErrorPage = (pages === null || pages === void 0 ? void 0 : pages.error) && ((_req$query = req.query) === null || _req$query === void 0 || (_req$query = _req$query.callbackUrl) === null || _req$query === void 0 ? void 0 : _req$query.startsWith(pages.error));
    if (!(pages !== null && pages !== void 0 && pages.error) || authOnErrorPage) {
      if (authOnErrorPage) {
        _logger.default.error("AUTH_ON_ERROR_PAGE_ERROR", new Error(`The error page ${pages === null || pages === void 0 ? void 0 : pages.error} should not require authentication`));
      }
      const render = (0, _pages.default)({
        theme
      });
      return render.error({
        error: "configuration"
      });
    }
    return {
      redirect: `${pages.error}?error=Configuration`
    };
  }
  const {
    action,
    providerId,
    error,
    method = "GET"
  } = req;
  const {
    options,
    cookies
  } = await (0, _init.init)({
    authOptions,
    action,
    providerId,
    origin: req.origin,
    callbackUrl: (_req$body$callbackUrl = (_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.callbackUrl) !== null && _req$body$callbackUrl !== void 0 ? _req$body$callbackUrl : (_req$query2 = req.query) === null || _req$query2 === void 0 ? void 0 : _req$query2.callbackUrl,
    csrfToken: (_req$body2 = req.body) === null || _req$body2 === void 0 ? void 0 : _req$body2.csrfToken,
    cookies: req.cookies,
    isPost: method === "POST"
  });
  const sessionStore = new _cookie.SessionStore(options.cookies.sessionToken, req, options.logger);
  if (method === "GET") {
    const render = (0, _pages.default)({
      ...options,
      query: req.query,
      cookies
    });
    const {
      pages
    } = options;
    switch (action) {
      case "providers":
        return await routes.providers(options.providers);
      case "session":
        {
          const session = await routes.session({
            options,
            sessionStore
          });
          if (session.cookies) cookies.push(...session.cookies);
          return {
            ...session,
            cookies
          };
        }
      case "csrf":
        return {
          headers: [{
            key: "Content-Type",
            value: "application/json"
          }],
          body: {
            csrfToken: options.csrfToken
          },
          cookies
        };
      case "signin":
        if (pages.signIn) {
          let signinUrl = `${pages.signIn}${pages.signIn.includes("?") ? "&" : "?"}callbackUrl=${encodeURIComponent(options.callbackUrl)}`;
          if (error) signinUrl = `${signinUrl}&error=${encodeURIComponent(error)}`;
          return {
            redirect: signinUrl,
            cookies
          };
        }
        return render.signin();
      case "signout":
        if (pages.signOut) return {
          redirect: pages.signOut,
          cookies
        };
        return render.signout();
      case "callback":
        if (options.provider) {
          const callback = await routes.callback({
            body: req.body,
            query: req.query,
            headers: req.headers,
            cookies: req.cookies,
            method,
            options,
            sessionStore
          });
          if (callback.cookies) cookies.push(...callback.cookies);
          return {
            ...callback,
            cookies
          };
        }
        break;
      case "verify-request":
        if (pages.verifyRequest) {
          return {
            redirect: pages.verifyRequest,
            cookies
          };
        }
        return render.verifyRequest();
      case "error":
        if (["Signin", "OAuthSignin", "OAuthCallback", "OAuthCreateAccount", "EmailCreateAccount", "Callback", "OAuthAccountNotLinked", "EmailSignin", "CredentialsSignin", "SessionRequired"].includes(error)) {
          return {
            redirect: `${options.url}/signin?error=${error}`,
            cookies
          };
        }
        if (pages.error) {
          return {
            redirect: `${pages.error}${pages.error.includes("?") ? "&" : "?"}error=${error}`,
            cookies
          };
        }
        return render.error({
          error: error
        });
      default:
    }
  } else if (method === "POST") {
    switch (action) {
      case "signin":
        if (options.csrfTokenVerified && options.provider) {
          const signin = await routes.signin({
            query: req.query,
            body: req.body,
            options
          });
          if (signin.cookies) cookies.push(...signin.cookies);
          return {
            ...signin,
            cookies
          };
        }
        return {
          redirect: `${options.url}/signin?csrf=true`,
          cookies
        };
      case "signout":
        if (options.csrfTokenVerified) {
          const signout = await routes.signout({
            options,
            sessionStore
          });
          if (signout.cookies) cookies.push(...signout.cookies);
          return {
            ...signout,
            cookies
          };
        }
        return {
          redirect: `${options.url}/signout?csrf=true`,
          cookies
        };
      case "callback":
        if (options.provider) {
          if (options.provider.type === "credentials" && !options.csrfTokenVerified) {
            return {
              redirect: `${options.url}/signin?csrf=true`,
              cookies
            };
          }
          const callback = await routes.callback({
            body: req.body,
            query: req.query,
            headers: req.headers,
            cookies: req.cookies,
            method,
            options,
            sessionStore
          });
          if (callback.cookies) cookies.push(...callback.cookies);
          return {
            ...callback,
            cookies
          };
        }
        break;
      case "_log":
        {
          if (authOptions.logger) {
            try {
              var _req$body3;
              const {
                code,
                level,
                ...metadata
              } = (_req$body3 = req.body) !== null && _req$body3 !== void 0 ? _req$body3 : {};
              _logger.default[level](code, metadata);
            } catch (error) {
              _logger.default.error("LOGGER_ERROR", error);
            }
          }
          return {};
        }
      case "session":
        {
          if (options.csrfTokenVerified) {
            var _req$body4;
            const session = await routes.session({
              options,
              sessionStore,
              newSession: (_req$body4 = req.body) === null || _req$body4 === void 0 ? void 0 : _req$body4.data,
              isUpdate: true
            });
            if (session.cookies) cookies.push(...session.cookies);
            return {
              ...session,
              cookies
            };
          }
          return {
            status: 400,
            body: {},
            cookies
          };
        }
      default:
    }
  }
  return {
    status: 400,
    body: `Error: This action with HTTP ${method} is not supported by NextAuth.js`
  };
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/init.js":
/*!*********************************************!*\
  !*** ./node_modules/next-auth/core/init.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(rsc)/./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.init = init;
var _crypto = __webpack_require__(/*! crypto */ "crypto");
var _logger = _interopRequireDefault(__webpack_require__(/*! ../utils/logger */ "(rsc)/./node_modules/next-auth/utils/logger.js"));
var _errors = __webpack_require__(/*! ./errors */ "(rsc)/./node_modules/next-auth/core/errors.js");
var _providers = _interopRequireDefault(__webpack_require__(/*! ./lib/providers */ "(rsc)/./node_modules/next-auth/core/lib/providers.js"));
var _utils = __webpack_require__(/*! ./lib/utils */ "(rsc)/./node_modules/next-auth/core/lib/utils.js");
var cookie = _interopRequireWildcard(__webpack_require__(/*! ./lib/cookie */ "(rsc)/./node_modules/next-auth/core/lib/cookie.js"));
var jwt = _interopRequireWildcard(__webpack_require__(/*! ../jwt */ "(rsc)/./node_modules/next-auth/jwt/index.js"));
var _defaultCallbacks = __webpack_require__(/*! ./lib/default-callbacks */ "(rsc)/./node_modules/next-auth/core/lib/default-callbacks.js");
var _csrfToken = __webpack_require__(/*! ./lib/csrf-token */ "(rsc)/./node_modules/next-auth/core/lib/csrf-token.js");
var _callbackUrl = __webpack_require__(/*! ./lib/callback-url */ "(rsc)/./node_modules/next-auth/core/lib/callback-url.js");
var _parseUrl = _interopRequireDefault(__webpack_require__(/*! ../utils/parse-url */ "(rsc)/./node_modules/next-auth/utils/parse-url.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
async function init({
  authOptions,
  providerId,
  action,
  origin,
  cookies: reqCookies,
  callbackUrl: reqCallbackUrl,
  csrfToken: reqCsrfToken,
  isPost
}) {
  var _authOptions$useSecur, _authOptions$events;
  const url = (0, _parseUrl.default)(origin);
  const secret = (0, _utils.createSecret)({
    authOptions,
    url
  });
  const {
    providers,
    provider
  } = (0, _providers.default)({
    providers: authOptions.providers,
    url,
    providerId
  });
  const maxAge = 30 * 24 * 60 * 60;
  const options = {
    debug: false,
    pages: {},
    theme: {
      colorScheme: "auto",
      logo: "",
      brandColor: "",
      buttonText: ""
    },
    ...authOptions,
    url,
    action,
    provider,
    cookies: {
      ...cookie.defaultCookies((_authOptions$useSecur = authOptions.useSecureCookies) !== null && _authOptions$useSecur !== void 0 ? _authOptions$useSecur : url.base.startsWith("https://")),
      ...authOptions.cookies
    },
    secret,
    providers,
    session: {
      strategy: authOptions.adapter ? "database" : "jwt",
      maxAge,
      updateAge: 24 * 60 * 60,
      generateSessionToken: () => {
        var _randomUUID;
        return (_randomUUID = _crypto.randomUUID === null || _crypto.randomUUID === void 0 ? void 0 : (0, _crypto.randomUUID)()) !== null && _randomUUID !== void 0 ? _randomUUID : (0, _crypto.randomBytes)(32).toString("hex");
      },
      ...authOptions.session
    },
    jwt: {
      secret,
      maxAge,
      encode: jwt.encode,
      decode: jwt.decode,
      ...authOptions.jwt
    },
    events: (0, _errors.eventsErrorHandler)((_authOptions$events = authOptions.events) !== null && _authOptions$events !== void 0 ? _authOptions$events : {}, _logger.default),
    adapter: (0, _errors.adapterErrorHandler)(authOptions.adapter, _logger.default),
    callbacks: {
      ..._defaultCallbacks.defaultCallbacks,
      ...authOptions.callbacks
    },
    logger: _logger.default,
    callbackUrl: url.origin
  };
  const cookies = [];
  const {
    csrfToken,
    cookie: csrfCookie,
    csrfTokenVerified
  } = (0, _csrfToken.createCSRFToken)({
    options,
    cookieValue: reqCookies === null || reqCookies === void 0 ? void 0 : reqCookies[options.cookies.csrfToken.name],
    isPost,
    bodyValue: reqCsrfToken
  });
  options.csrfToken = csrfToken;
  options.csrfTokenVerified = csrfTokenVerified;
  if (csrfCookie) {
    cookies.push({
      name: options.cookies.csrfToken.name,
      value: csrfCookie,
      options: options.cookies.csrfToken.options
    });
  }
  const {
    callbackUrl,
    callbackUrlCookie
  } = await (0, _callbackUrl.createCallbackUrl)({
    options,
    cookieValue: reqCookies === null || reqCookies === void 0 ? void 0 : reqCookies[options.cookies.callbackUrl.name],
    paramValue: reqCallbackUrl
  });
  options.callbackUrl = callbackUrl;
  if (callbackUrlCookie) {
    cookies.push({
      name: options.cookies.callbackUrl.name,
      value: callbackUrlCookie,
      options: options.cookies.callbackUrl.options
    });
  }
  return {
    options,
    cookies
  };
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/lib/assert.js":
/*!***************************************************!*\
  !*** ./node_modules/next-auth/core/lib/assert.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(rsc)/./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.assertConfig = assertConfig;
var _errors = __webpack_require__(/*! ../errors */ "(rsc)/./node_modules/next-auth/core/errors.js");
var _parseUrl = _interopRequireDefault(__webpack_require__(/*! ../../utils/parse-url */ "(rsc)/./node_modules/next-auth/utils/parse-url.js"));
var _cookie = __webpack_require__(/*! ./cookie */ "(rsc)/./node_modules/next-auth/core/lib/cookie.js");
let warned = false;
function isValidHttpUrl(url, baseUrl) {
  try {
    return /^https?:/.test(new URL(url, url.startsWith("/") ? baseUrl : undefined).protocol);
  } catch (_unused) {
    return false;
  }
}
function assertConfig(params) {
  var _req$query, _req$query2, _options$useSecureCoo, _req$cookies, _options$cookies$call, _options$cookies;
  const {
    options,
    req
  } = params;
  const warnings = [];
  if (!warned) {
    if (!req.origin) warnings.push("NEXTAUTH_URL");
    if (!options.secret && "development" !== "production") warnings.push("NO_SECRET");
    if (options.debug) warnings.push("DEBUG_ENABLED");
  }
  if (!options.secret && "development" === "production") {}
  if (!((_req$query = req.query) !== null && _req$query !== void 0 && _req$query.nextauth) && !req.action) {
    return new _errors.MissingAPIRoute("Cannot find [...nextauth].{js,ts} in `/pages/api/auth`. Make sure the filename is written correctly.");
  }
  const callbackUrlParam = (_req$query2 = req.query) === null || _req$query2 === void 0 ? void 0 : _req$query2.callbackUrl;
  const url = (0, _parseUrl.default)(req.origin);
  if (callbackUrlParam && !isValidHttpUrl(callbackUrlParam, url.base)) {
    return new _errors.InvalidCallbackUrl(`Invalid callback URL. Received: ${callbackUrlParam}`);
  }
  const {
    callbackUrl: defaultCallbackUrl
  } = (0, _cookie.defaultCookies)((_options$useSecureCoo = options.useSecureCookies) !== null && _options$useSecureCoo !== void 0 ? _options$useSecureCoo : url.base.startsWith("https://"));
  const callbackUrlCookie = (_req$cookies = req.cookies) === null || _req$cookies === void 0 ? void 0 : _req$cookies[(_options$cookies$call = (_options$cookies = options.cookies) === null || _options$cookies === void 0 || (_options$cookies = _options$cookies.callbackUrl) === null || _options$cookies === void 0 ? void 0 : _options$cookies.name) !== null && _options$cookies$call !== void 0 ? _options$cookies$call : defaultCallbackUrl.name];
  if (callbackUrlCookie && !isValidHttpUrl(callbackUrlCookie, url.base)) {
    return new _errors.InvalidCallbackUrl(`Invalid callback URL. Received: ${callbackUrlCookie}`);
  }
  let hasCredentials, hasEmail;
  let hasTwitterOAuth2;
  for (const provider of options.providers) {
    if (provider.type === "credentials") hasCredentials = true;else if (provider.type === "email") hasEmail = true;else if (provider.id === "twitter" && provider.version === "2.0") hasTwitterOAuth2 = true;
  }
  if (hasCredentials) {
    var _options$session;
    const dbStrategy = ((_options$session = options.session) === null || _options$session === void 0 ? void 0 : _options$session.strategy) === "database";
    const onlyCredentials = !options.providers.some(p => p.type !== "credentials");
    if (dbStrategy && onlyCredentials) {
      return new _errors.UnsupportedStrategy("Signin in with credentials only supported if JWT strategy is enabled");
    }
    const credentialsNoAuthorize = options.providers.some(p => p.type === "credentials" && !p.authorize);
    if (credentialsNoAuthorize) {
      return new _errors.MissingAuthorize("Must define an authorize() handler to use credentials authentication provider");
    }
  }
  if (hasEmail) {
    const {
      adapter
    } = options;
    if (!adapter) {
      return new _errors.MissingAdapter("E-mail login requires an adapter.");
    }
    const missingMethods = ["createVerificationToken", "useVerificationToken", "getUserByEmail"].filter(method => !adapter[method]);
    if (missingMethods.length) {
      return new _errors.MissingAdapterMethods(`Required adapter methods were missing: ${missingMethods.join(", ")}`);
    }
  }
  if (!warned) {
    if (hasTwitterOAuth2) warnings.push("TWITTER_OAUTH_2_BETA");
    warned = true;
  }
  return warnings;
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/lib/callback-handler.js":
/*!*************************************************************!*\
  !*** ./node_modules/next-auth/core/lib/callback-handler.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = callbackHandler;
var _errors = __webpack_require__(/*! ../errors */ "(rsc)/./node_modules/next-auth/core/errors.js");
var _utils = __webpack_require__(/*! ./utils */ "(rsc)/./node_modules/next-auth/core/lib/utils.js");
async function callbackHandler(params) {
  const {
    sessionToken,
    profile: _profile,
    account,
    options
  } = params;
  if (!(account !== null && account !== void 0 && account.providerAccountId) || !account.type) throw new Error("Missing or invalid provider account");
  if (!["email", "oauth"].includes(account.type)) throw new Error("Provider not supported");
  const {
    adapter,
    jwt,
    events,
    session: {
      strategy: sessionStrategy,
      generateSessionToken
    }
  } = options;
  if (!adapter) {
    return {
      user: _profile,
      account
    };
  }
  const profile = _profile;
  const {
    createUser,
    updateUser,
    getUser,
    getUserByAccount,
    getUserByEmail,
    linkAccount,
    createSession,
    getSessionAndUser,
    deleteSession
  } = adapter;
  let session = null;
  let user = null;
  let isNewUser = false;
  const useJwtSession = sessionStrategy === "jwt";
  if (sessionToken) {
    if (useJwtSession) {
      try {
        session = await jwt.decode({
          ...jwt,
          token: sessionToken
        });
        if (session && "sub" in session && session.sub) {
          user = await getUser(session.sub);
        }
      } catch (_unused) {}
    } else {
      const userAndSession = await getSessionAndUser(sessionToken);
      if (userAndSession) {
        session = userAndSession.session;
        user = userAndSession.user;
      }
    }
  }
  if (account.type === "email") {
    const userByEmail = await getUserByEmail(profile.email);
    if (userByEmail) {
      var _user, _events$updateUser;
      if (((_user = user) === null || _user === void 0 ? void 0 : _user.id) !== userByEmail.id && !useJwtSession && sessionToken) {
        await deleteSession(sessionToken);
      }
      user = await updateUser({
        id: userByEmail.id,
        emailVerified: new Date()
      });
      await ((_events$updateUser = events.updateUser) === null || _events$updateUser === void 0 ? void 0 : _events$updateUser.call(events, {
        user
      }));
    } else {
      var _events$createUser;
      const {
        id: _,
        ...newUser
      } = {
        ...profile,
        emailVerified: new Date()
      };
      user = await createUser(newUser);
      await ((_events$createUser = events.createUser) === null || _events$createUser === void 0 ? void 0 : _events$createUser.call(events, {
        user
      }));
      isNewUser = true;
    }
    session = useJwtSession ? {} : await createSession({
      sessionToken: await generateSessionToken(),
      userId: user.id,
      expires: (0, _utils.fromDate)(options.session.maxAge)
    });
    return {
      session,
      user,
      isNewUser
    };
  } else if (account.type === "oauth") {
    const userByAccount = await getUserByAccount({
      providerAccountId: account.providerAccountId,
      provider: account.provider
    });
    if (userByAccount) {
      if (user) {
        if (userByAccount.id === user.id) {
          return {
            session,
            user,
            isNewUser
          };
        }
        throw new _errors.AccountNotLinkedError("The account is already associated with another user");
      }
      session = useJwtSession ? {} : await createSession({
        sessionToken: await generateSessionToken(),
        userId: userByAccount.id,
        expires: (0, _utils.fromDate)(options.session.maxAge)
      });
      return {
        session,
        user: userByAccount,
        isNewUser
      };
    } else {
      var _events$createUser2, _events$linkAccount2;
      if (user) {
        var _events$linkAccount;
        await linkAccount({
          ...account,
          userId: user.id
        });
        await ((_events$linkAccount = events.linkAccount) === null || _events$linkAccount === void 0 ? void 0 : _events$linkAccount.call(events, {
          user,
          account,
          profile
        }));
        return {
          session,
          user,
          isNewUser
        };
      }
      const userByEmail = profile.email ? await getUserByEmail(profile.email) : null;
      if (userByEmail) {
        const provider = options.provider;
        if (provider !== null && provider !== void 0 && provider.allowDangerousEmailAccountLinking) {
          user = userByEmail;
        } else {
          throw new _errors.AccountNotLinkedError("Another account already exists with the same e-mail address");
        }
      } else {
        const {
          id: _,
          ...newUser
        } = {
          ...profile,
          emailVerified: null
        };
        user = await createUser(newUser);
      }
      await ((_events$createUser2 = events.createUser) === null || _events$createUser2 === void 0 ? void 0 : _events$createUser2.call(events, {
        user
      }));
      await linkAccount({
        ...account,
        userId: user.id
      });
      await ((_events$linkAccount2 = events.linkAccount) === null || _events$linkAccount2 === void 0 ? void 0 : _events$linkAccount2.call(events, {
        user,
        account,
        profile
      }));
      session = useJwtSession ? {} : await createSession({
        sessionToken: await generateSessionToken(),
        userId: user.id,
        expires: (0, _utils.fromDate)(options.session.maxAge)
      });
      return {
        session,
        user,
        isNewUser: true
      };
    }
  }
  throw new Error("Unsupported account type");
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/lib/callback-url.js":
/*!*********************************************************!*\
  !*** ./node_modules/next-auth/core/lib/callback-url.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createCallbackUrl = createCallbackUrl;
async function createCallbackUrl({
  options,
  paramValue,
  cookieValue
}) {
  const {
    url,
    callbacks
  } = options;
  let callbackUrl = url.origin;
  if (paramValue) {
    callbackUrl = await callbacks.redirect({
      url: paramValue,
      baseUrl: url.origin
    });
  } else if (cookieValue) {
    callbackUrl = await callbacks.redirect({
      url: cookieValue,
      baseUrl: url.origin
    });
  }
  return {
    callbackUrl,
    callbackUrlCookie: callbackUrl !== cookieValue ? callbackUrl : undefined
  };
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/lib/cookie.js":
/*!***************************************************!*\
  !*** ./node_modules/next-auth/core/lib/cookie.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SessionStore = void 0;
exports.defaultCookies = defaultCookies;
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
const ALLOWED_COOKIE_SIZE = 4096;
const ESTIMATED_EMPTY_COOKIE_SIZE = 163;
const CHUNK_SIZE = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;
function defaultCookies(useSecureCookies) {
  const cookiePrefix = useSecureCookies ? "__Secure-" : "";
  return {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies
      }
    },
    callbackUrl: {
      name: `${cookiePrefix}next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies
      }
    },
    csrfToken: {
      name: `${useSecureCookies ? "__Host-" : ""}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies
      }
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 60 * 15
      }
    },
    state: {
      name: `${cookiePrefix}next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 60 * 15
      }
    },
    nonce: {
      name: `${cookiePrefix}next-auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies
      }
    }
  };
}
var _chunks = new WeakMap();
var _option = new WeakMap();
var _logger = new WeakMap();
var _SessionStore_brand = new WeakSet();
class SessionStore {
  constructor(option, req, logger) {
    _classPrivateMethodInitSpec(this, _SessionStore_brand);
    _classPrivateFieldInitSpec(this, _chunks, {});
    _classPrivateFieldInitSpec(this, _option, void 0);
    _classPrivateFieldInitSpec(this, _logger, void 0);
    _classPrivateFieldSet(_logger, this, logger);
    _classPrivateFieldSet(_option, this, option);
    const {
      cookies: _cookies
    } = req;
    const {
      name: cookieName
    } = option;
    if (typeof (_cookies === null || _cookies === void 0 ? void 0 : _cookies.getAll) === "function") {
      for (const {
        name,
        value
      } of _cookies.getAll()) {
        if (name.startsWith(cookieName)) {
          _classPrivateFieldGet(_chunks, this)[name] = value;
        }
      }
    } else if (_cookies instanceof Map) {
      for (const name of _cookies.keys()) {
        if (name.startsWith(cookieName)) _classPrivateFieldGet(_chunks, this)[name] = _cookies.get(name);
      }
    } else {
      for (const name in _cookies) {
        if (name.startsWith(cookieName)) _classPrivateFieldGet(_chunks, this)[name] = _cookies[name];
      }
    }
  }
  get value() {
    const sortedKeys = Object.keys(_classPrivateFieldGet(_chunks, this)).sort((a, b) => {
      var _a$split$pop, _b$split$pop;
      const aSuffix = parseInt((_a$split$pop = a.split(".").pop()) !== null && _a$split$pop !== void 0 ? _a$split$pop : "0");
      const bSuffix = parseInt((_b$split$pop = b.split(".").pop()) !== null && _b$split$pop !== void 0 ? _b$split$pop : "0");
      return aSuffix - bSuffix;
    });
    return sortedKeys.map(key => _classPrivateFieldGet(_chunks, this)[key]).join("");
  }
  chunk(value, options) {
    const cookies = _assertClassBrand(_SessionStore_brand, this, _clean).call(this);
    const chunked = _assertClassBrand(_SessionStore_brand, this, _chunk).call(this, {
      name: _classPrivateFieldGet(_option, this).name,
      value,
      options: {
        ..._classPrivateFieldGet(_option, this).options,
        ...options
      }
    });
    for (const chunk of chunked) {
      cookies[chunk.name] = chunk;
    }
    return Object.values(cookies);
  }
  clean() {
    return Object.values(_assertClassBrand(_SessionStore_brand, this, _clean).call(this));
  }
}
exports.SessionStore = SessionStore;
function _chunk(cookie) {
  const chunkCount = Math.ceil(cookie.value.length / CHUNK_SIZE);
  if (chunkCount === 1) {
    _classPrivateFieldGet(_chunks, this)[cookie.name] = cookie.value;
    return [cookie];
  }
  const cookies = [];
  for (let i = 0; i < chunkCount; i++) {
    const name = `${cookie.name}.${i}`;
    const value = cookie.value.substr(i * CHUNK_SIZE, CHUNK_SIZE);
    cookies.push({
      ...cookie,
      name,
      value
    });
    _classPrivateFieldGet(_chunks, this)[name] = value;
  }
  _classPrivateFieldGet(_logger, this).debug("CHUNKING_SESSION_COOKIE", {
    message: `Session cookie exceeds allowed ${ALLOWED_COOKIE_SIZE} bytes.`,
    emptyCookieSize: ESTIMATED_EMPTY_COOKIE_SIZE,
    valueSize: cookie.value.length,
    chunks: cookies.map(c => c.value.length + ESTIMATED_EMPTY_COOKIE_SIZE)
  });
  return cookies;
}
function _clean() {
  const cleanedChunks = {};
  for (const name in _classPrivateFieldGet(_chunks, this)) {
    var _classPrivateFieldGet2;
    (_classPrivateFieldGet2 = _classPrivateFieldGet(_chunks, this)) === null || _classPrivateFieldGet2 === void 0 || delete _classPrivateFieldGet2[name];
    cleanedChunks[name] = {
      name,
      value: "",
      options: {
        ..._classPrivateFieldGet(_option, this).options,
        maxAge: 0
      }
    };
  }
  return cleanedChunks;
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/lib/csrf-token.js":
/*!*******************************************************!*\
  !*** ./node_modules/next-auth/core/lib/csrf-token.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createCSRFToken = createCSRFToken;
var _crypto = __webpack_require__(/*! crypto */ "crypto");
function createCSRFToken({
  options,
  cookieValue,
  isPost,
  bodyValue
}) {
  if (cookieValue) {
    const [csrfToken, csrfTokenHash] = cookieValue.split("|");
    const expectedCsrfTokenHash = (0, _crypto.createHash)("sha256").update(`${csrfToken}${options.secret}`).digest("hex");
    if (csrfTokenHash === expectedCsrfTokenHash) {
      const csrfTokenVerified = isPost && csrfToken === bodyValue;
      return {
        csrfTokenVerified,
        csrfToken
      };
    }
  }
  const csrfToken = (0, _crypto.randomBytes)(32).toString("hex");
  const csrfTokenHash = (0, _crypto.createHash)("sha256").update(`${csrfToken}${options.secret}`).digest("hex");
  const cookie = `${csrfToken}|${csrfTokenHash}`;
  return {
    cookie,
    csrfToken
  };
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/lib/default-callbacks.js":
/*!**************************************************************!*\
  !*** ./node_modules/next-auth/core/lib/default-callbacks.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.defaultCallbacks = void 0;
const defaultCallbacks = exports.defaultCallbacks = {
  signIn() {
    return true;
  },
  redirect({
    url,
    baseUrl
  }) {
    if (url.startsWith("/")) return `${baseUrl}${url}`;else if (new URL(url).origin === baseUrl) return url;
    return baseUrl;
  },
  session({
    session
  }) {
    return session;
  },
  jwt({
    token
  }) {
    return token;
  }
};

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/lib/email/getUserFromEmail.js":
/*!*******************************************************************!*\
  !*** ./node_modules/next-auth/core/lib/email/getUserFromEmail.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getAdapterUserFromEmail;
async function getAdapterUserFromEmail({
  email,
  adapter
}) {
  const {
    getUserByEmail
  } = adapter;
  const adapterUser = email ? await getUserByEmail(email) : null;
  if (adapterUser) return adapterUser;
  return {
    id: email,
    email,
    emailVerified: null
  };
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/lib/email/signin.js":
/*!*********************************************************!*\
  !*** ./node_modules/next-auth/core/lib/email/signin.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = email;
var _crypto = __webpack_require__(/*! crypto */ "crypto");
var _utils = __webpack_require__(/*! ../utils */ "(rsc)/./node_modules/next-auth/core/lib/utils.js");
async function email(identifier, options) {
  var _await$provider$gener, _provider$generateVer, _provider$maxAge, _adapter$createVerifi;
  const {
    url,
    adapter,
    provider,
    callbackUrl,
    theme
  } = options;
  const token = (_await$provider$gener = await ((_provider$generateVer = provider.generateVerificationToken) === null || _provider$generateVer === void 0 ? void 0 : _provider$generateVer.call(provider))) !== null && _await$provider$gener !== void 0 ? _await$provider$gener : (0, _crypto.randomBytes)(32).toString("hex");
  const ONE_DAY_IN_SECONDS = 86400;
  const expires = new Date(Date.now() + ((_provider$maxAge = provider.maxAge) !== null && _provider$maxAge !== void 0 ? _provider$maxAge : ONE_DAY_IN_SECONDS) * 1000);
  const params = new URLSearchParams({
    callbackUrl,
    token,
    email: identifier
  });
  const _url = `${url}/callback/${provider.id}?${params}`;
  await Promise.all([provider.sendVerificationRequest({
    identifier,
    token,
    expires,
    url: _url,
    provider,
    theme
  }), (_adapter$createVerifi = adapter.createVerificationToken) === null || _adapter$createVerifi === void 0 ? void 0 : _adapter$createVerifi.call(adapter, {
    identifier,
    token: (0, _utils.hashToken)(token, options),
    expires
  })]);
  return `${url}/verify-request?${new URLSearchParams({
    provider: provider.id,
    type: provider.type
  })}`;
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/lib/oauth/authorization-url.js":
/*!********************************************************************!*\
  !*** ./node_modules/next-auth/core/lib/oauth/authorization-url.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getAuthorizationUrl;
var _client = __webpack_require__(/*! ./client */ "(rsc)/./node_modules/next-auth/core/lib/oauth/client.js");
var _clientLegacy = __webpack_require__(/*! ./client-legacy */ "(rsc)/./node_modules/next-auth/core/lib/oauth/client-legacy.js");
var checks = _interopRequireWildcard(__webpack_require__(/*! ./checks */ "(rsc)/./node_modules/next-auth/core/lib/oauth/checks.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
async function getAuthorizationUrl({
  options,
  query
}) {
  var _provider$version;
  const {
    logger,
    provider
  } = options;
  let params = {};
  if (typeof provider.authorization === "string") {
    const parsedUrl = new URL(provider.authorization);
    const parsedParams = Object.fromEntries(parsedUrl.searchParams);
    params = {
      ...params,
      ...parsedParams
    };
  } else {
    var _provider$authorizati;
    params = {
      ...params,
      ...((_provider$authorizati = provider.authorization) === null || _provider$authorizati === void 0 ? void 0 : _provider$authorizati.params)
    };
  }
  params = {
    ...params,
    ...query
  };
  if ((_provider$version = provider.version) !== null && _provider$version !== void 0 && _provider$version.startsWith("1.")) {
    var _provider$authorizati2;
    const client = (0, _clientLegacy.oAuth1Client)(options);
    const tokens = await client.getOAuthRequestToken(params);
    const url = `${(_provider$authorizati2 = provider.authorization) === null || _provider$authorizati2 === void 0 ? void 0 : _provider$authorizati2.url}?${new URLSearchParams({
      oauth_token: tokens.oauth_token,
      oauth_token_secret: tokens.oauth_token_secret,
      ...tokens.params
    })}`;
    _clientLegacy.oAuth1TokenStore.set(tokens.oauth_token, tokens.oauth_token_secret);
    logger.debug("GET_AUTHORIZATION_URL", {
      url,
      provider
    });
    return {
      redirect: url
    };
  }
  const client = await (0, _client.openidClient)(options);
  const authorizationParams = params;
  const cookies = [];
  await checks.state.create(options, cookies, authorizationParams);
  await checks.pkce.create(options, cookies, authorizationParams);
  await checks.nonce.create(options, cookies, authorizationParams);
  const url = client.authorizationUrl(authorizationParams);
  logger.debug("GET_AUTHORIZATION_URL", {
    url,
    cookies,
    provider
  });
  return {
    redirect: url,
    cookies
  };
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/lib/oauth/callback.js":
/*!***********************************************************!*\
  !*** ./node_modules/next-auth/core/lib/oauth/callback.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = oAuthCallback;
var _openidClient = __webpack_require__(/*! openid-client */ "(rsc)/./node_modules/openid-client/lib/index.js");
var _client = __webpack_require__(/*! ./client */ "(rsc)/./node_modules/next-auth/core/lib/oauth/client.js");
var _clientLegacy = __webpack_require__(/*! ./client-legacy */ "(rsc)/./node_modules/next-auth/core/lib/oauth/client-legacy.js");
var _checks = _interopRequireWildcard(__webpack_require__(/*! ./checks */ "(rsc)/./node_modules/next-auth/core/lib/oauth/checks.js"));
var _errors = __webpack_require__(/*! ../../errors */ "(rsc)/./node_modules/next-auth/core/errors.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
async function oAuthCallback(params) {
  var _body$error, _provider$version;
  const {
    options,
    query,
    body,
    method,
    cookies
  } = params;
  const {
    logger,
    provider
  } = options;
  const errorMessage = (_body$error = body === null || body === void 0 ? void 0 : body.error) !== null && _body$error !== void 0 ? _body$error : query === null || query === void 0 ? void 0 : query.error;
  if (errorMessage) {
    const error = new Error(errorMessage);
    logger.error("OAUTH_CALLBACK_HANDLER_ERROR", {
      error,
      error_description: query === null || query === void 0 ? void 0 : query.error_description,
      providerId: provider.id
    });
    logger.debug("OAUTH_CALLBACK_HANDLER_ERROR", {
      body
    });
    throw error;
  }
  if ((_provider$version = provider.version) !== null && _provider$version !== void 0 && _provider$version.startsWith("1.")) {
    try {
      const client = await (0, _clientLegacy.oAuth1Client)(options);
      const {
        oauth_token,
        oauth_verifier
      } = query !== null && query !== void 0 ? query : {};
      const tokens = await client.getOAuthAccessToken(oauth_token, _clientLegacy.oAuth1TokenStore.get(oauth_token), oauth_verifier);
      let profile = await client.get(provider.profileUrl, tokens.oauth_token, tokens.oauth_token_secret);
      if (typeof profile === "string") {
        profile = JSON.parse(profile);
      }
      const newProfile = await getProfile({
        profile,
        tokens,
        provider,
        logger
      });
      return {
        ...newProfile,
        cookies: []
      };
    } catch (error) {
      logger.error("OAUTH_V1_GET_ACCESS_TOKEN_ERROR", error);
      throw error;
    }
  }
  if (query !== null && query !== void 0 && query.oauth_token) _clientLegacy.oAuth1TokenStore.delete(query.oauth_token);
  try {
    var _provider$token, _provider$token2, _provider$userinfo;
    const client = await (0, _client.openidClient)(options);
    let tokens;
    const checks = {};
    const resCookies = [];
    await _checks.state.use(cookies, resCookies, options, checks);
    await _checks.pkce.use(cookies, resCookies, options, checks);
    await _checks.nonce.use(cookies, resCookies, options, checks);
    const params = {
      ...client.callbackParams({
        url: `http://n?${new URLSearchParams(query)}`,
        body,
        method
      }),
      ...((_provider$token = provider.token) === null || _provider$token === void 0 ? void 0 : _provider$token.params)
    };
    if ((_provider$token2 = provider.token) !== null && _provider$token2 !== void 0 && _provider$token2.request) {
      const response = await provider.token.request({
        provider,
        params,
        checks,
        client
      });
      tokens = new _openidClient.TokenSet(response.tokens);
    } else if (provider.idToken) {
      tokens = await client.callback(provider.callbackUrl, params, checks);
    } else {
      tokens = await client.oauthCallback(provider.callbackUrl, params, checks);
    }
    if (Array.isArray(tokens.scope)) {
      tokens.scope = tokens.scope.join(" ");
    }
    let profile;
    if ((_provider$userinfo = provider.userinfo) !== null && _provider$userinfo !== void 0 && _provider$userinfo.request) {
      profile = await provider.userinfo.request({
        provider,
        tokens,
        client
      });
    } else if (provider.idToken) {
      profile = tokens.claims();
    } else {
      var _provider$userinfo2;
      profile = await client.userinfo(tokens, {
        params: (_provider$userinfo2 = provider.userinfo) === null || _provider$userinfo2 === void 0 ? void 0 : _provider$userinfo2.params
      });
    }
    const profileResult = await getProfile({
      profile,
      provider,
      tokens,
      logger
    });
    return {
      ...profileResult,
      cookies: resCookies
    };
  } catch (error) {
    throw new _errors.OAuthCallbackError(error);
  }
}
async function getProfile({
  profile: OAuthProfile,
  tokens,
  provider,
  logger
}) {
  try {
    var _profile$email;
    logger.debug("PROFILE_DATA", {
      OAuthProfile
    });
    const profile = await provider.profile(OAuthProfile, tokens);
    profile.email = (_profile$email = profile.email) === null || _profile$email === void 0 ? void 0 : _profile$email.toLowerCase();
    if (!profile.id) throw new TypeError(`Profile id is missing in ${provider.name} OAuth profile response`);
    return {
      profile,
      account: {
        provider: provider.id,
        type: provider.type,
        providerAccountId: profile.id.toString(),
        ...tokens
      },
      OAuthProfile
    };
  } catch (error) {
    logger.error("OAUTH_PARSE_PROFILE_ERROR", {
      error: error,
      OAuthProfile
    });
  }
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/lib/oauth/checks.js":
/*!*********************************************************!*\
  !*** ./node_modules/next-auth/core/lib/oauth/checks.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.pkce = exports.nonce = exports.PKCE_CODE_CHALLENGE_METHOD = void 0;
exports.signCookie = signCookie;
exports.state = void 0;
var _openidClient = __webpack_require__(/*! openid-client */ "(rsc)/./node_modules/openid-client/lib/index.js");
var jwt = _interopRequireWildcard(__webpack_require__(/*! ../../../jwt */ "(rsc)/./node_modules/next-auth/jwt/index.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
async function signCookie(type, value, maxAge, options) {
  const {
    cookies,
    logger
  } = options;
  logger.debug(`CREATE_${type.toUpperCase()}`, {
    value,
    maxAge
  });
  const {
    name
  } = cookies[type];
  const expires = new Date();
  expires.setTime(expires.getTime() + maxAge * 1000);
  return {
    name,
    value: await jwt.encode({
      ...options.jwt,
      maxAge,
      token: {
        value
      },
      salt: name
    }),
    options: {
      ...cookies[type].options,
      expires
    }
  };
}
const PKCE_MAX_AGE = 60 * 15;
const PKCE_CODE_CHALLENGE_METHOD = exports.PKCE_CODE_CHALLENGE_METHOD = "S256";
const pkce = exports.pkce = {
  async create(options, cookies, resParams) {
    var _options$provider, _options$cookies$pkce;
    if (!((_options$provider = options.provider) !== null && _options$provider !== void 0 && (_options$provider = _options$provider.checks) !== null && _options$provider !== void 0 && _options$provider.includes("pkce"))) return;
    const code_verifier = _openidClient.generators.codeVerifier();
    const value = _openidClient.generators.codeChallenge(code_verifier);
    resParams.code_challenge = value;
    resParams.code_challenge_method = PKCE_CODE_CHALLENGE_METHOD;
    const maxAge = (_options$cookies$pkce = options.cookies.pkceCodeVerifier.options.maxAge) !== null && _options$cookies$pkce !== void 0 ? _options$cookies$pkce : PKCE_MAX_AGE;
    cookies.push(await signCookie("pkceCodeVerifier", code_verifier, maxAge, options));
  },
  async use(cookies, resCookies, options, checks) {
    var _options$provider2;
    if (!((_options$provider2 = options.provider) !== null && _options$provider2 !== void 0 && (_options$provider2 = _options$provider2.checks) !== null && _options$provider2 !== void 0 && _options$provider2.includes("pkce"))) return;
    const codeVerifier = cookies === null || cookies === void 0 ? void 0 : cookies[options.cookies.pkceCodeVerifier.name];
    if (!codeVerifier) throw new TypeError("PKCE code_verifier cookie was missing.");
    const {
      name
    } = options.cookies.pkceCodeVerifier;
    const value = await jwt.decode({
      ...options.jwt,
      token: codeVerifier,
      salt: name
    });
    if (!(value !== null && value !== void 0 && value.value)) throw new TypeError("PKCE code_verifier value could not be parsed.");
    resCookies.push({
      name,
      value: "",
      options: {
        ...options.cookies.pkceCodeVerifier.options,
        maxAge: 0
      }
    });
    checks.code_verifier = value.value;
  }
};
const STATE_MAX_AGE = 60 * 15;
const state = exports.state = {
  async create(options, cookies, resParams) {
    var _options$provider$che, _options$cookies$stat;
    if (!((_options$provider$che = options.provider.checks) !== null && _options$provider$che !== void 0 && _options$provider$che.includes("state"))) return;
    const value = _openidClient.generators.state();
    resParams.state = value;
    const maxAge = (_options$cookies$stat = options.cookies.state.options.maxAge) !== null && _options$cookies$stat !== void 0 ? _options$cookies$stat : STATE_MAX_AGE;
    cookies.push(await signCookie("state", value, maxAge, options));
  },
  async use(cookies, resCookies, options, checks) {
    var _options$provider$che2;
    if (!((_options$provider$che2 = options.provider.checks) !== null && _options$provider$che2 !== void 0 && _options$provider$che2.includes("state"))) return;
    const state = cookies === null || cookies === void 0 ? void 0 : cookies[options.cookies.state.name];
    if (!state) throw new TypeError("State cookie was missing.");
    const {
      name
    } = options.cookies.state;
    const value = await jwt.decode({
      ...options.jwt,
      token: state,
      salt: name
    });
    if (!(value !== null && value !== void 0 && value.value)) throw new TypeError("State value could not be parsed.");
    resCookies.push({
      name,
      value: "",
      options: {
        ...options.cookies.state.options,
        maxAge: 0
      }
    });
    checks.state = value.value;
  }
};
const NONCE_MAX_AGE = 60 * 15;
const nonce = exports.nonce = {
  async create(options, cookies, resParams) {
    var _options$provider$che3, _options$cookies$nonc;
    if (!((_options$provider$che3 = options.provider.checks) !== null && _options$provider$che3 !== void 0 && _options$provider$che3.includes("nonce"))) return;
    const value = _openidClient.generators.nonce();
    resParams.nonce = value;
    const maxAge = (_options$cookies$nonc = options.cookies.nonce.options.maxAge) !== null && _options$cookies$nonc !== void 0 ? _options$cookies$nonc : NONCE_MAX_AGE;
    cookies.push(await signCookie("nonce", value, maxAge, options));
  },
  async use(cookies, resCookies, options, checks) {
    var _options$provider3;
    if (!((_options$provider3 = options.provider) !== null && _options$provider3 !== void 0 && (_options$provider3 = _options$provider3.checks) !== null && _options$provider3 !== void 0 && _options$provider3.includes("nonce"))) return;
    const nonce = cookies === null || cookies === void 0 ? void 0 : cookies[options.cookies.nonce.name];
    if (!nonce) throw new TypeError("Nonce cookie was missing.");
    const {
      name
    } = options.cookies.nonce;
    const value = await jwt.decode({
      ...options.jwt,
      token: nonce,
      salt: name
    });
    if (!(value !== null && value !== void 0 && value.value)) throw new TypeError("Nonce value could not be parsed.");
    resCookies.push({
      name,
      value: "",
      options: {
        ...options.cookies.nonce.options,
        maxAge: 0
      }
    });
    checks.nonce = value.value;
  }
};

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/lib/oauth/client-legacy.js":
/*!****************************************************************!*\
  !*** ./node_modules/next-auth/core/lib/oauth/client-legacy.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.oAuth1Client = oAuth1Client;
exports.oAuth1TokenStore = void 0;
var _oauth = __webpack_require__(/*! oauth */ "(rsc)/./node_modules/oauth/index.js");
function oAuth1Client(options) {
  var _provider$version, _provider$encoding;
  const provider = options.provider;
  const oauth1Client = new _oauth.OAuth(provider.requestTokenUrl, provider.accessTokenUrl, provider.clientId, provider.clientSecret, (_provider$version = provider.version) !== null && _provider$version !== void 0 ? _provider$version : "1.0", provider.callbackUrl, (_provider$encoding = provider.encoding) !== null && _provider$encoding !== void 0 ? _provider$encoding : "HMAC-SHA1");
  const originalGet = oauth1Client.get.bind(oauth1Client);
  oauth1Client.get = async (...args) => {
    return await new Promise((resolve, reject) => {
      originalGet(...args, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  };
  const originalGetOAuth1AccessToken = oauth1Client.getOAuthAccessToken.bind(oauth1Client);
  oauth1Client.getOAuthAccessToken = async (...args) => {
    return await new Promise((resolve, reject) => {
      originalGetOAuth1AccessToken(...args, (error, oauth_token, oauth_token_secret) => {
        if (error) {
          return reject(error);
        }
        resolve({
          oauth_token,
          oauth_token_secret
        });
      });
    });
  };
  const originalGetOAuthRequestToken = oauth1Client.getOAuthRequestToken.bind(oauth1Client);
  oauth1Client.getOAuthRequestToken = async (params = {}) => {
    return await new Promise((resolve, reject) => {
      originalGetOAuthRequestToken(params, (error, oauth_token, oauth_token_secret, params) => {
        if (error) {
          return reject(error);
        }
        resolve({
          oauth_token,
          oauth_token_secret,
          params
        });
      });
    });
  };
  return oauth1Client;
}
const oAuth1TokenStore = exports.oAuth1TokenStore = new Map();

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/lib/oauth/client.js":
/*!*********************************************************!*\
  !*** ./node_modules/next-auth/core/lib/oauth/client.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.openidClient = openidClient;
var _openidClient = __webpack_require__(/*! openid-client */ "(rsc)/./node_modules/openid-client/lib/index.js");
async function openidClient(options) {
  const provider = options.provider;
  if (provider.httpOptions) _openidClient.custom.setHttpOptionsDefaults(provider.httpOptions);
  let issuer;
  if (provider.wellKnown) {
    issuer = await _openidClient.Issuer.discover(provider.wellKnown);
  } else {
    var _provider$authorizati, _provider$token, _provider$userinfo;
    issuer = new _openidClient.Issuer({
      issuer: provider.issuer,
      authorization_endpoint: (_provider$authorizati = provider.authorization) === null || _provider$authorizati === void 0 ? void 0 : _provider$authorizati.url,
      token_endpoint: (_provider$token = provider.token) === null || _provider$token === void 0 ? void 0 : _provider$token.url,
      userinfo_endpoint: (_provider$userinfo = provider.userinfo) === null || _provider$userinfo === void 0 ? void 0 : _provider$userinfo.url,
      jwks_uri: provider.jwks_endpoint
    });
  }
  const client = new issuer.Client({
    client_id: provider.clientId,
    client_secret: provider.clientSecret,
    redirect_uris: [provider.callbackUrl],
    ...provider.client
  }, provider.jwks);
  client[_openidClient.custom.clock_tolerance] = 10;
  return client;
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/lib/providers.js":
/*!******************************************************!*\
  !*** ./node_modules/next-auth/core/lib/providers.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = parseProviders;
var _merge = __webpack_require__(/*! ../../utils/merge */ "(rsc)/./node_modules/next-auth/utils/merge.js");
function parseProviders(params) {
  const {
    url,
    providerId
  } = params;
  const providers = params.providers.map(({
    options: userOptions,
    ...rest
  }) => {
    var _ref;
    if (rest.type === "oauth") {
      var _normalizedUserOption;
      const normalizedOptions = normalizeOAuthOptions(rest);
      const normalizedUserOptions = normalizeOAuthOptions(userOptions, true);
      const id = (_normalizedUserOption = normalizedUserOptions === null || normalizedUserOptions === void 0 ? void 0 : normalizedUserOptions.id) !== null && _normalizedUserOption !== void 0 ? _normalizedUserOption : rest.id;
      return (0, _merge.merge)(normalizedOptions, {
        ...normalizedUserOptions,
        signinUrl: `${url}/signin/${id}`,
        callbackUrl: `${url}/callback/${id}`
      });
    }
    const id = (_ref = userOptions === null || userOptions === void 0 ? void 0 : userOptions.id) !== null && _ref !== void 0 ? _ref : rest.id;
    return (0, _merge.merge)(rest, {
      ...userOptions,
      signinUrl: `${url}/signin/${id}`,
      callbackUrl: `${url}/callback/${id}`
    });
  });
  return {
    providers,
    provider: providers.find(({
      id
    }) => id === providerId)
  };
}
function normalizeOAuthOptions(oauthOptions, isUserOptions = false) {
  var _normalized$version;
  if (!oauthOptions) return;
  const normalized = Object.entries(oauthOptions).reduce((acc, [key, value]) => {
    if (["authorization", "token", "userinfo"].includes(key) && typeof value === "string") {
      var _url$searchParams;
      const url = new URL(value);
      acc[key] = {
        url: `${url.origin}${url.pathname}`,
        params: Object.fromEntries((_url$searchParams = url.searchParams) !== null && _url$searchParams !== void 0 ? _url$searchParams : [])
      };
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
  if (!isUserOptions && !((_normalized$version = normalized.version) !== null && _normalized$version !== void 0 && _normalized$version.startsWith("1."))) {
    var _ref2, _normalized$idToken, _normalized$wellKnown, _normalized$authoriza;
    normalized.idToken = Boolean((_ref2 = (_normalized$idToken = normalized.idToken) !== null && _normalized$idToken !== void 0 ? _normalized$idToken : (_normalized$wellKnown = normalized.wellKnown) === null || _normalized$wellKnown === void 0 ? void 0 : _normalized$wellKnown.includes("openid-configuration")) !== null && _ref2 !== void 0 ? _ref2 : (_normalized$authoriza = normalized.authorization) === null || _normalized$authoriza === void 0 || (_normalized$authoriza = _normalized$authoriza.params) === null || _normalized$authoriza === void 0 || (_normalized$authoriza = _normalized$authoriza.scope) === null || _normalized$authoriza === void 0 ? void 0 : _normalized$authoriza.includes("openid"));
    if (!normalized.checks) normalized.checks = ["state"];
  }
  return normalized;
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/lib/utils.js":
/*!**************************************************!*\
  !*** ./node_modules/next-auth/core/lib/utils.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createSecret = createSecret;
exports.fromDate = fromDate;
exports.hashToken = hashToken;
var _crypto = __webpack_require__(/*! crypto */ "crypto");
function fromDate(time, date = Date.now()) {
  return new Date(date + time * 1000);
}
function hashToken(token, options) {
  var _provider$secret;
  const {
    provider,
    secret
  } = options;
  return (0, _crypto.createHash)("sha256").update(`${token}${(_provider$secret = provider.secret) !== null && _provider$secret !== void 0 ? _provider$secret : secret}`).digest("hex");
}
function createSecret(params) {
  var _authOptions$secret;
  const {
    authOptions,
    url
  } = params;
  return (_authOptions$secret = authOptions.secret) !== null && _authOptions$secret !== void 0 ? _authOptions$secret : (0, _crypto.createHash)("sha256").update(JSON.stringify({
    ...url,
    ...authOptions
  })).digest("hex");
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/pages/error.js":
/*!****************************************************!*\
  !*** ./node_modules/next-auth/core/pages/error.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = ErrorPage;
var _preact = __webpack_require__(/*! preact */ "(rsc)/./node_modules/preact/dist/preact.js");
function ErrorPage(props) {
  var _errors$error$toLower;
  const {
    url,
    error = "default",
    theme
  } = props;
  const signinPageUrl = `${url}/signin`;
  const errors = {
    default: {
      status: 200,
      heading: "Error",
      message: (0, _preact.h)("p", null, (0, _preact.h)("a", {
        className: "site",
        href: url === null || url === void 0 ? void 0 : url.origin
      }, url === null || url === void 0 ? void 0 : url.host))
    },
    configuration: {
      status: 500,
      heading: "Server error",
      message: (0, _preact.h)("div", null, (0, _preact.h)("p", null, "There is a problem with the server configuration."), (0, _preact.h)("p", null, "Check the server logs for more information."))
    },
    accessdenied: {
      status: 403,
      heading: "Access Denied",
      message: (0, _preact.h)("div", null, (0, _preact.h)("p", null, "You do not have permission to sign in."), (0, _preact.h)("p", null, (0, _preact.h)("a", {
        className: "button",
        href: signinPageUrl
      }, "Sign in")))
    },
    verification: {
      status: 403,
      heading: "Unable to sign in",
      message: (0, _preact.h)("div", null, (0, _preact.h)("p", null, "The sign in link is no longer valid."), (0, _preact.h)("p", null, "It may have been used already or it may have expired.")),
      signin: (0, _preact.h)("a", {
        className: "button",
        href: signinPageUrl
      }, "Sign in")
    }
  };
  const {
    status,
    heading,
    message,
    signin
  } = (_errors$error$toLower = errors[error.toLowerCase()]) !== null && _errors$error$toLower !== void 0 ? _errors$error$toLower : errors.default;
  return {
    status,
    html: (0, _preact.h)("div", {
      className: "error"
    }, (theme === null || theme === void 0 ? void 0 : theme.brandColor) && (0, _preact.h)("style", {
      dangerouslySetInnerHTML: {
        __html: `
        :root {
          --brand-color: ${theme === null || theme === void 0 ? void 0 : theme.brandColor}
        }
      `
      }
    }), (0, _preact.h)("div", {
      className: "card"
    }, (theme === null || theme === void 0 ? void 0 : theme.logo) && (0, _preact.h)("img", {
      src: theme.logo,
      alt: "Logo",
      className: "logo"
    }), (0, _preact.h)("h1", null, heading), (0, _preact.h)("div", {
      className: "message"
    }, message), signin))
  };
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/pages/index.js":
/*!****************************************************!*\
  !*** ./node_modules/next-auth/core/pages/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(rsc)/./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = renderPage;
var _preactRenderToString = _interopRequireDefault(__webpack_require__(/*! preact-render-to-string */ "(rsc)/./node_modules/preact-render-to-string/dist/index.js"));
var _signin = _interopRequireDefault(__webpack_require__(/*! ./signin */ "(rsc)/./node_modules/next-auth/core/pages/signin.js"));
var _signout = _interopRequireDefault(__webpack_require__(/*! ./signout */ "(rsc)/./node_modules/next-auth/core/pages/signout.js"));
var _verifyRequest = _interopRequireDefault(__webpack_require__(/*! ./verify-request */ "(rsc)/./node_modules/next-auth/core/pages/verify-request.js"));
var _error = _interopRequireDefault(__webpack_require__(/*! ./error */ "(rsc)/./node_modules/next-auth/core/pages/error.js"));
var _css = _interopRequireDefault(__webpack_require__(/*! ../../css */ "(rsc)/./node_modules/next-auth/css/index.js"));
function renderPage(params) {
  const {
    url,
    theme,
    query,
    cookies
  } = params;
  function send({
    html,
    title,
    status
  }) {
    var _theme$colorScheme;
    return {
      cookies,
      status,
      headers: [{
        key: "Content-Type",
        value: "text/html"
      }],
      body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${(0, _css.default)()}</style><title>${title}</title></head><body class="__next-auth-theme-${(_theme$colorScheme = theme === null || theme === void 0 ? void 0 : theme.colorScheme) !== null && _theme$colorScheme !== void 0 ? _theme$colorScheme : "auto"}"><div class="page">${(0, _preactRenderToString.default)(html)}</div></body></html>`
    };
  }
  return {
    signin(props) {
      return send({
        html: (0, _signin.default)({
          csrfToken: params.csrfToken,
          providers: params.providers,
          callbackUrl: params.callbackUrl,
          theme,
          ...query,
          ...props
        }),
        title: "Sign In"
      });
    },
    signout(props) {
      return send({
        html: (0, _signout.default)({
          csrfToken: params.csrfToken,
          url,
          theme,
          ...props
        }),
        title: "Sign Out"
      });
    },
    verifyRequest(props) {
      return send({
        html: (0, _verifyRequest.default)({
          url,
          theme,
          ...props
        }),
        title: "Verify Request"
      });
    },
    error(props) {
      return send({
        ...(0, _error.default)({
          url,
          theme,
          ...props
        }),
        title: "Error"
      });
    }
  };
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/pages/signin.js":
/*!*****************************************************!*\
  !*** ./node_modules/next-auth/core/pages/signin.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(rsc)/./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = SigninPage;
var _preact = __webpack_require__(/*! preact */ "(rsc)/./node_modules/preact/dist/preact.js");
var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "(rsc)/./node_modules/@babel/runtime/helpers/extends.js"));
function hexToRgba(hex, alpha = 1) {
  if (!hex) {
    return;
  }
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  const bigint = parseInt(hex, 16);
  const r = bigint >> 16 & 255;
  const g = bigint >> 8 & 255;
  const b = bigint & 255;
  alpha = Math.min(Math.max(alpha, 0), 1);
  const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  return rgba;
}
function SigninPage(props) {
  var _errors$errorType;
  const {
    csrfToken,
    providers,
    callbackUrl,
    theme,
    email,
    error: errorType
  } = props;
  const providersToRender = providers.filter(provider => {
    if (provider.type === "oauth" || provider.type === "email") {
      return true;
    } else if (provider.type === "credentials" && provider.credentials) {
      return true;
    }
    return false;
  });
  if (typeof document !== "undefined" && theme.buttonText) {
    document.documentElement.style.setProperty("--button-text-color", theme.buttonText);
  }
  if (typeof document !== "undefined" && theme.brandColor) {
    document.documentElement.style.setProperty("--brand-color", theme.brandColor);
  }
  const errors = {
    Signin: "Try signing in with a different account.",
    OAuthSignin: "Try signing in with a different account.",
    OAuthCallback: "Try signing in with a different account.",
    OAuthCreateAccount: "Try signing in with a different account.",
    EmailCreateAccount: "Try signing in with a different account.",
    Callback: "Try signing in with a different account.",
    OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "The e-mail could not be sent.",
    CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
    SessionRequired: "Please sign in to access this page.",
    default: "Unable to sign in."
  };
  const error = errorType && ((_errors$errorType = errors[errorType]) !== null && _errors$errorType !== void 0 ? _errors$errorType : errors.default);
  const providerLogoPath = "https://authjs.dev/img/providers";
  return (0, _preact.h)("div", {
    className: "signin"
  }, theme.brandColor && (0, _preact.h)("style", {
    dangerouslySetInnerHTML: {
      __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `
    }
  }), theme.buttonText && (0, _preact.h)("style", {
    dangerouslySetInnerHTML: {
      __html: `
        :root {
          --button-text-color: ${theme.buttonText}
        }
      `
    }
  }), (0, _preact.h)("div", {
    className: "card"
  }, theme.logo && (0, _preact.h)("img", {
    src: theme.logo,
    alt: "Logo",
    className: "logo"
  }), error && (0, _preact.h)("div", {
    className: "error"
  }, (0, _preact.h)("p", null, error)), providersToRender.map((provider, i) => {
    let bg, text, logo, logoDark, bgDark, textDark;
    if (provider.type === "oauth") {
      var _provider$style;
      ;
      ({
        bg = "",
        text = "",
        logo = "",
        bgDark = bg,
        textDark = text,
        logoDark = ""
      } = (_provider$style = provider.style) !== null && _provider$style !== void 0 ? _provider$style : {});
      logo = logo.startsWith("/") ? `${providerLogoPath}${logo}` : logo;
      logoDark = logoDark.startsWith("/") ? `${providerLogoPath}${logoDark}` : logoDark || logo;
      logoDark || (logoDark = logo);
    }
    return (0, _preact.h)("div", {
      key: provider.id,
      className: "provider"
    }, provider.type === "oauth" && (0, _preact.h)("form", {
      action: provider.signinUrl,
      method: "POST"
    }, (0, _preact.h)("input", {
      type: "hidden",
      name: "csrfToken",
      value: csrfToken
    }), callbackUrl && (0, _preact.h)("input", {
      type: "hidden",
      name: "callbackUrl",
      value: callbackUrl
    }), (0, _preact.h)("button", {
      type: "submit",
      className: "button",
      style: {
        "--provider-bg": bg,
        "--provider-dark-bg": bgDark,
        "--provider-color": text,
        "--provider-dark-color": textDark,
        "--provider-bg-hover": hexToRgba(bg, 0.8),
        "--provider-dark-bg-hover": hexToRgba(bgDark, 0.8)
      }
    }, logo && (0, _preact.h)("img", {
      loading: "lazy",
      height: 24,
      width: 24,
      id: "provider-logo",
      src: `${logo.startsWith("/") ? providerLogoPath : ""}${logo}`
    }), logoDark && (0, _preact.h)("img", {
      loading: "lazy",
      height: 24,
      width: 24,
      id: "provider-logo-dark",
      src: `${logo.startsWith("/") ? providerLogoPath : ""}${logoDark}`
    }), (0, _preact.h)("span", null, "Sign in with ", provider.name))), (provider.type === "email" || provider.type === "credentials") && i > 0 && providersToRender[i - 1].type !== "email" && providersToRender[i - 1].type !== "credentials" && (0, _preact.h)("hr", null), provider.type === "email" && (0, _preact.h)("form", {
      action: provider.signinUrl,
      method: "POST"
    }, (0, _preact.h)("input", {
      type: "hidden",
      name: "csrfToken",
      value: csrfToken
    }), (0, _preact.h)("label", {
      className: "section-header",
      htmlFor: `input-email-for-${provider.id}-provider`
    }, "Email"), (0, _preact.h)("input", {
      id: `input-email-for-${provider.id}-provider`,
      autoFocus: true,
      type: "email",
      name: "email",
      value: email,
      placeholder: "email@example.com",
      required: true
    }), (0, _preact.h)("button", {
      id: "submitButton",
      type: "submit"
    }, "Sign in with ", provider.name)), provider.type === "credentials" && (0, _preact.h)("form", {
      action: provider.callbackUrl,
      method: "POST"
    }, (0, _preact.h)("input", {
      type: "hidden",
      name: "csrfToken",
      value: csrfToken
    }), Object.keys(provider.credentials).map(credential => {
      var _provider$credentials, _provider$credentials2, _provider$credentials3;
      return (0, _preact.h)("div", {
        key: `input-group-${provider.id}`
      }, (0, _preact.h)("label", {
        className: "section-header",
        htmlFor: `input-${credential}-for-${provider.id}-provider`
      }, (_provider$credentials = provider.credentials[credential].label) !== null && _provider$credentials !== void 0 ? _provider$credentials : credential), (0, _preact.h)("input", (0, _extends2.default)({
        name: credential,
        id: `input-${credential}-for-${provider.id}-provider`,
        type: (_provider$credentials2 = provider.credentials[credential].type) !== null && _provider$credentials2 !== void 0 ? _provider$credentials2 : "text",
        placeholder: (_provider$credentials3 = provider.credentials[credential].placeholder) !== null && _provider$credentials3 !== void 0 ? _provider$credentials3 : ""
      }, provider.credentials[credential])));
    }), (0, _preact.h)("button", {
      type: "submit"
    }, "Sign in with ", provider.name)), (provider.type === "email" || provider.type === "credentials") && i + 1 < providersToRender.length && (0, _preact.h)("hr", null));
  })));
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/pages/signout.js":
/*!******************************************************!*\
  !*** ./node_modules/next-auth/core/pages/signout.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = SignoutPage;
var _preact = __webpack_require__(/*! preact */ "(rsc)/./node_modules/preact/dist/preact.js");
function SignoutPage(props) {
  const {
    url,
    csrfToken,
    theme
  } = props;
  return (0, _preact.h)("div", {
    className: "signout"
  }, theme.brandColor && (0, _preact.h)("style", {
    dangerouslySetInnerHTML: {
      __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `
    }
  }), theme.buttonText && (0, _preact.h)("style", {
    dangerouslySetInnerHTML: {
      __html: `
        :root {
          --button-text-color: ${theme.buttonText}
        }
      `
    }
  }), (0, _preact.h)("div", {
    className: "card"
  }, theme.logo && (0, _preact.h)("img", {
    src: theme.logo,
    alt: "Logo",
    className: "logo"
  }), (0, _preact.h)("h1", null, "Signout"), (0, _preact.h)("p", null, "Are you sure you want to sign out?"), (0, _preact.h)("form", {
    action: `${url}/signout`,
    method: "POST"
  }, (0, _preact.h)("input", {
    type: "hidden",
    name: "csrfToken",
    value: csrfToken
  }), (0, _preact.h)("button", {
    id: "submitButton",
    type: "submit"
  }, "Sign out"))));
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/pages/verify-request.js":
/*!*************************************************************!*\
  !*** ./node_modules/next-auth/core/pages/verify-request.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = VerifyRequestPage;
var _preact = __webpack_require__(/*! preact */ "(rsc)/./node_modules/preact/dist/preact.js");
function VerifyRequestPage(props) {
  const {
    url,
    theme
  } = props;
  return (0, _preact.h)("div", {
    className: "verify-request"
  }, theme.brandColor && (0, _preact.h)("style", {
    dangerouslySetInnerHTML: {
      __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `
    }
  }), (0, _preact.h)("div", {
    className: "card"
  }, theme.logo && (0, _preact.h)("img", {
    src: theme.logo,
    alt: "Logo",
    className: "logo"
  }), (0, _preact.h)("h1", null, "Check your email"), (0, _preact.h)("p", null, "A sign in link has been sent to your email address."), (0, _preact.h)("p", null, (0, _preact.h)("a", {
    className: "site",
    href: url.origin
  }, url.host))));
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/routes/callback.js":
/*!********************************************************!*\
  !*** ./node_modules/next-auth/core/routes/callback.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(rsc)/./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = callback;
var _callback = _interopRequireDefault(__webpack_require__(/*! ../lib/oauth/callback */ "(rsc)/./node_modules/next-auth/core/lib/oauth/callback.js"));
var _callbackHandler = _interopRequireDefault(__webpack_require__(/*! ../lib/callback-handler */ "(rsc)/./node_modules/next-auth/core/lib/callback-handler.js"));
var _utils = __webpack_require__(/*! ../lib/utils */ "(rsc)/./node_modules/next-auth/core/lib/utils.js");
var _getUserFromEmail = _interopRequireDefault(__webpack_require__(/*! ../lib/email/getUserFromEmail */ "(rsc)/./node_modules/next-auth/core/lib/email/getUserFromEmail.js"));
async function callback(params) {
  const {
    options,
    query,
    body,
    method,
    headers,
    sessionStore
  } = params;
  const {
    provider,
    adapter,
    url,
    callbackUrl,
    pages,
    jwt,
    events,
    callbacks,
    session: {
      strategy: sessionStrategy,
      maxAge: sessionMaxAge
    },
    logger
  } = options;
  const cookies = [];
  const useJwtSession = sessionStrategy === "jwt";
  if (provider.type === "oauth") {
    try {
      const {
        profile,
        account,
        OAuthProfile,
        cookies: oauthCookies
      } = await (0, _callback.default)({
        query,
        body,
        method,
        options,
        cookies: params.cookies
      });
      if (oauthCookies.length) cookies.push(...oauthCookies);
      try {
        var _events$signIn;
        logger.debug("OAUTH_CALLBACK_RESPONSE", {
          profile,
          account,
          OAuthProfile
        });
        if (!profile || !account || !OAuthProfile) {
          return {
            redirect: `${url}/signin`,
            cookies
          };
        }
        let userOrProfile = profile;
        if (adapter) {
          const {
            getUserByAccount
          } = adapter;
          const userByAccount = await getUserByAccount({
            providerAccountId: account.providerAccountId,
            provider: provider.id
          });
          if (userByAccount) userOrProfile = userByAccount;
        }
        try {
          const isAllowed = await callbacks.signIn({
            user: userOrProfile,
            account,
            profile: OAuthProfile
          });
          if (!isAllowed) {
            return {
              redirect: `${url}/error?error=AccessDenied`,
              cookies
            };
          } else if (typeof isAllowed === "string") {
            return {
              redirect: isAllowed,
              cookies
            };
          }
        } catch (error) {
          return {
            redirect: `${url}/error?error=${encodeURIComponent(error.message)}`,
            cookies
          };
        }
        const {
          user,
          session,
          isNewUser
        } = await (0, _callbackHandler.default)({
          sessionToken: sessionStore.value,
          profile,
          account,
          options
        });
        if (useJwtSession) {
          var _user$id;
          const defaultToken = {
            name: user.name,
            email: user.email,
            picture: user.image,
            sub: (_user$id = user.id) === null || _user$id === void 0 ? void 0 : _user$id.toString()
          };
          const token = await callbacks.jwt({
            token: defaultToken,
            user,
            account,
            profile: OAuthProfile,
            isNewUser,
            trigger: isNewUser ? "signUp" : "signIn"
          });
          const newToken = await jwt.encode({
            ...jwt,
            token
          });
          const cookieExpires = new Date();
          cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
          const sessionCookies = sessionStore.chunk(newToken, {
            expires: cookieExpires
          });
          cookies.push(...sessionCookies);
        } else {
          cookies.push({
            name: options.cookies.sessionToken.name,
            value: session.sessionToken,
            options: {
              ...options.cookies.sessionToken.options,
              expires: session.expires
            }
          });
        }
        await ((_events$signIn = events.signIn) === null || _events$signIn === void 0 ? void 0 : _events$signIn.call(events, {
          user,
          account,
          profile,
          isNewUser
        }));
        if (isNewUser && pages.newUser) {
          return {
            redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}callbackUrl=${encodeURIComponent(callbackUrl)}`,
            cookies
          };
        }
        return {
          redirect: callbackUrl,
          cookies
        };
      } catch (error) {
        if (error.name === "AccountNotLinkedError") {
          return {
            redirect: `${url}/error?error=OAuthAccountNotLinked`,
            cookies
          };
        } else if (error.name === "CreateUserError") {
          return {
            redirect: `${url}/error?error=OAuthCreateAccount`,
            cookies
          };
        }
        logger.error("OAUTH_CALLBACK_HANDLER_ERROR", error);
        return {
          redirect: `${url}/error?error=Callback`,
          cookies
        };
      }
    } catch (error) {
      if (error.name === "OAuthCallbackError") {
        logger.error("OAUTH_CALLBACK_ERROR", {
          error: error,
          providerId: provider.id
        });
        return {
          redirect: `${url}/error?error=OAuthCallback`,
          cookies
        };
      }
      logger.error("OAUTH_CALLBACK_ERROR", error);
      return {
        redirect: `${url}/error?error=Callback`,
        cookies
      };
    }
  } else if (provider.type === "email") {
    try {
      var _events$signIn2;
      const paramToken = query === null || query === void 0 ? void 0 : query.token;
      const paramIdentifier = query === null || query === void 0 ? void 0 : query.email;
      if (!paramToken) {
        return {
          redirect: `${url}/error?error=configuration`,
          cookies
        };
      }
      const invite = await adapter.useVerificationToken({
        identifier: paramIdentifier,
        token: (0, _utils.hashToken)(paramToken, options)
      });
      const invalidInvite = !invite || invite.expires.valueOf() < Date.now() || paramIdentifier && invite.identifier !== paramIdentifier;
      if (invalidInvite) {
        return {
          redirect: `${url}/error?error=Verification`,
          cookies
        };
      }
      const profile = await (0, _getUserFromEmail.default)({
        email: invite.identifier,
        adapter
      });
      const account = {
        providerAccountId: profile.email,
        type: "email",
        provider: provider.id
      };
      try {
        const signInCallbackResponse = await callbacks.signIn({
          user: profile,
          account
        });
        if (!signInCallbackResponse) {
          return {
            redirect: `${url}/error?error=AccessDenied`,
            cookies
          };
        } else if (typeof signInCallbackResponse === "string") {
          return {
            redirect: signInCallbackResponse,
            cookies
          };
        }
      } catch (error) {
        return {
          redirect: `${url}/error?error=${encodeURIComponent(error.message)}`,
          cookies
        };
      }
      const {
        user,
        session,
        isNewUser
      } = await (0, _callbackHandler.default)({
        sessionToken: sessionStore.value,
        profile,
        account,
        options
      });
      if (useJwtSession) {
        var _user$id2;
        const defaultToken = {
          name: user.name,
          email: user.email,
          picture: user.image,
          sub: (_user$id2 = user.id) === null || _user$id2 === void 0 ? void 0 : _user$id2.toString()
        };
        const token = await callbacks.jwt({
          token: defaultToken,
          user,
          account,
          isNewUser,
          trigger: isNewUser ? "signUp" : "signIn"
        });
        const newToken = await jwt.encode({
          ...jwt,
          token
        });
        const cookieExpires = new Date();
        cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
        const sessionCookies = sessionStore.chunk(newToken, {
          expires: cookieExpires
        });
        cookies.push(...sessionCookies);
      } else {
        cookies.push({
          name: options.cookies.sessionToken.name,
          value: session.sessionToken,
          options: {
            ...options.cookies.sessionToken.options,
            expires: session.expires
          }
        });
      }
      await ((_events$signIn2 = events.signIn) === null || _events$signIn2 === void 0 ? void 0 : _events$signIn2.call(events, {
        user,
        account,
        isNewUser
      }));
      if (isNewUser && pages.newUser) {
        return {
          redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}callbackUrl=${encodeURIComponent(callbackUrl)}`,
          cookies
        };
      }
      return {
        redirect: callbackUrl,
        cookies
      };
    } catch (error) {
      if (error.name === "CreateUserError") {
        return {
          redirect: `${url}/error?error=EmailCreateAccount`,
          cookies
        };
      }
      logger.error("CALLBACK_EMAIL_ERROR", error);
      return {
        redirect: `${url}/error?error=Callback`,
        cookies
      };
    }
  } else if (provider.type === "credentials" && method === "POST") {
    var _user$id3, _events$signIn3;
    const credentials = body;
    let user;
    try {
      user = await provider.authorize(credentials, {
        query,
        body,
        headers,
        method
      });
      if (!user) {
        return {
          status: 401,
          redirect: `${url}/error?${new URLSearchParams({
            error: "CredentialsSignin",
            provider: provider.id
          })}`,
          cookies
        };
      }
    } catch (error) {
      return {
        status: 401,
        redirect: `${url}/error?error=${encodeURIComponent(error.message)}`,
        cookies
      };
    }
    const account = {
      providerAccountId: user.id,
      type: "credentials",
      provider: provider.id
    };
    try {
      const isAllowed = await callbacks.signIn({
        user,
        account,
        credentials
      });
      if (!isAllowed) {
        return {
          status: 403,
          redirect: `${url}/error?error=AccessDenied`,
          cookies
        };
      } else if (typeof isAllowed === "string") {
        return {
          redirect: isAllowed,
          cookies
        };
      }
    } catch (error) {
      return {
        redirect: `${url}/error?error=${encodeURIComponent(error.message)}`,
        cookies
      };
    }
    const defaultToken = {
      name: user.name,
      email: user.email,
      picture: user.image,
      sub: (_user$id3 = user.id) === null || _user$id3 === void 0 ? void 0 : _user$id3.toString()
    };
    const token = await callbacks.jwt({
      token: defaultToken,
      user,
      account,
      isNewUser: false,
      trigger: "signIn"
    });
    const newToken = await jwt.encode({
      ...jwt,
      token
    });
    const cookieExpires = new Date();
    cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
    const sessionCookies = sessionStore.chunk(newToken, {
      expires: cookieExpires
    });
    cookies.push(...sessionCookies);
    await ((_events$signIn3 = events.signIn) === null || _events$signIn3 === void 0 ? void 0 : _events$signIn3.call(events, {
      user,
      account
    }));
    return {
      redirect: callbackUrl,
      cookies
    };
  }
  return {
    status: 500,
    body: `Error: Callback for provider type ${provider.type} not supported`,
    cookies
  };
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/routes/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/next-auth/core/routes/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(rsc)/./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "callback", ({
  enumerable: true,
  get: function () {
    return _callback.default;
  }
}));
Object.defineProperty(exports, "providers", ({
  enumerable: true,
  get: function () {
    return _providers.default;
  }
}));
Object.defineProperty(exports, "session", ({
  enumerable: true,
  get: function () {
    return _session.default;
  }
}));
Object.defineProperty(exports, "signin", ({
  enumerable: true,
  get: function () {
    return _signin.default;
  }
}));
Object.defineProperty(exports, "signout", ({
  enumerable: true,
  get: function () {
    return _signout.default;
  }
}));
var _callback = _interopRequireDefault(__webpack_require__(/*! ./callback */ "(rsc)/./node_modules/next-auth/core/routes/callback.js"));
var _signin = _interopRequireDefault(__webpack_require__(/*! ./signin */ "(rsc)/./node_modules/next-auth/core/routes/signin.js"));
var _signout = _interopRequireDefault(__webpack_require__(/*! ./signout */ "(rsc)/./node_modules/next-auth/core/routes/signout.js"));
var _session = _interopRequireDefault(__webpack_require__(/*! ./session */ "(rsc)/./node_modules/next-auth/core/routes/session.js"));
var _providers = _interopRequireDefault(__webpack_require__(/*! ./providers */ "(rsc)/./node_modules/next-auth/core/routes/providers.js"));

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/routes/providers.js":
/*!*********************************************************!*\
  !*** ./node_modules/next-auth/core/routes/providers.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = providers;
function providers(providers) {
  return {
    headers: [{
      key: "Content-Type",
      value: "application/json"
    }],
    body: providers.reduce((acc, {
      id,
      name,
      type,
      signinUrl,
      callbackUrl
    }) => {
      acc[id] = {
        id,
        name,
        type,
        signinUrl,
        callbackUrl
      };
      return acc;
    }, {})
  };
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/routes/session.js":
/*!*******************************************************!*\
  !*** ./node_modules/next-auth/core/routes/session.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = session;
var _utils = __webpack_require__(/*! ../lib/utils */ "(rsc)/./node_modules/next-auth/core/lib/utils.js");
async function session(params) {
  const {
    options,
    sessionStore,
    newSession,
    isUpdate
  } = params;
  const {
    adapter,
    jwt,
    events,
    callbacks,
    logger,
    session: {
      strategy: sessionStrategy,
      maxAge: sessionMaxAge
    }
  } = options;
  const response = {
    body: {},
    headers: [{
      key: "Content-Type",
      value: "application/json"
    }],
    cookies: []
  };
  const sessionToken = sessionStore.value;
  if (!sessionToken) return response;
  if (sessionStrategy === "jwt") {
    try {
      var _response$cookies, _events$session;
      const decodedToken = await jwt.decode({
        ...jwt,
        token: sessionToken
      });
      if (!decodedToken) throw new Error("JWT invalid");
      const token = await callbacks.jwt({
        token: decodedToken,
        ...(isUpdate && {
          trigger: "update"
        }),
        session: newSession
      });
      const newExpires = (0, _utils.fromDate)(sessionMaxAge);
      const updatedSession = await callbacks.session({
        session: {
          user: {
            name: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.name,
            email: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.email,
            image: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.picture
          },
          expires: newExpires.toISOString()
        },
        token
      });
      response.body = updatedSession;
      const newToken = await jwt.encode({
        ...jwt,
        token,
        maxAge: options.session.maxAge
      });
      const sessionCookies = sessionStore.chunk(newToken, {
        expires: newExpires
      });
      (_response$cookies = response.cookies) === null || _response$cookies === void 0 || _response$cookies.push(...sessionCookies);
      await ((_events$session = events.session) === null || _events$session === void 0 ? void 0 : _events$session.call(events, {
        session: updatedSession,
        token
      }));
    } catch (error) {
      var _response$cookies2;
      logger.error("JWT_SESSION_ERROR", error);
      (_response$cookies2 = response.cookies) === null || _response$cookies2 === void 0 || _response$cookies2.push(...sessionStore.clean());
    }
  } else {
    try {
      const {
        getSessionAndUser,
        deleteSession,
        updateSession
      } = adapter;
      let userAndSession = await getSessionAndUser(sessionToken);
      if (userAndSession && userAndSession.session.expires.valueOf() < Date.now()) {
        await deleteSession(sessionToken);
        userAndSession = null;
      }
      if (userAndSession) {
        var _response$cookies3, _events$session2;
        const {
          user,
          session
        } = userAndSession;
        const sessionUpdateAge = options.session.updateAge;
        const sessionIsDueToBeUpdatedDate = session.expires.valueOf() - sessionMaxAge * 1000 + sessionUpdateAge * 1000;
        const newExpires = (0, _utils.fromDate)(sessionMaxAge);
        if (sessionIsDueToBeUpdatedDate <= Date.now()) {
          await updateSession({
            sessionToken,
            expires: newExpires
          });
        }
        const sessionPayload = await callbacks.session({
          session: {
            user: {
              name: user.name,
              email: user.email,
              image: user.image
            },
            expires: session.expires.toISOString()
          },
          user,
          newSession,
          ...(isUpdate ? {
            trigger: "update"
          } : {})
        });
        response.body = sessionPayload;
        (_response$cookies3 = response.cookies) === null || _response$cookies3 === void 0 || _response$cookies3.push({
          name: options.cookies.sessionToken.name,
          value: sessionToken,
          options: {
            ...options.cookies.sessionToken.options,
            expires: newExpires
          }
        });
        await ((_events$session2 = events.session) === null || _events$session2 === void 0 ? void 0 : _events$session2.call(events, {
          session: sessionPayload
        }));
      } else if (sessionToken) {
        var _response$cookies4;
        (_response$cookies4 = response.cookies) === null || _response$cookies4 === void 0 || _response$cookies4.push(...sessionStore.clean());
      }
    } catch (error) {
      logger.error("SESSION_ERROR", error);
    }
  }
  return response;
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/routes/signin.js":
/*!******************************************************!*\
  !*** ./node_modules/next-auth/core/routes/signin.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(rsc)/./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = signin;
var _authorizationUrl = _interopRequireDefault(__webpack_require__(/*! ../lib/oauth/authorization-url */ "(rsc)/./node_modules/next-auth/core/lib/oauth/authorization-url.js"));
var _signin = _interopRequireDefault(__webpack_require__(/*! ../lib/email/signin */ "(rsc)/./node_modules/next-auth/core/lib/email/signin.js"));
var _getUserFromEmail = _interopRequireDefault(__webpack_require__(/*! ../lib/email/getUserFromEmail */ "(rsc)/./node_modules/next-auth/core/lib/email/getUserFromEmail.js"));
async function signin(params) {
  const {
    options,
    query,
    body
  } = params;
  const {
    url,
    callbacks,
    logger,
    provider
  } = options;
  if (!provider.type) {
    return {
      status: 500,
      text: `Error: Type not specified for ${provider.name}`
    };
  }
  if (provider.type === "oauth") {
    try {
      const response = await (0, _authorizationUrl.default)({
        options,
        query
      });
      return response;
    } catch (error) {
      logger.error("SIGNIN_OAUTH_ERROR", {
        error: error,
        providerId: provider.id
      });
      return {
        redirect: `${url}/error?error=OAuthSignin`
      };
    }
  } else if (provider.type === "email") {
    var _provider$normalizeId;
    let email = body === null || body === void 0 ? void 0 : body.email;
    if (!email) return {
      redirect: `${url}/error?error=EmailSignin`
    };
    const normalizer = (_provider$normalizeId = provider.normalizeIdentifier) !== null && _provider$normalizeId !== void 0 ? _provider$normalizeId : identifier => {
      let [local, domain] = identifier.toLowerCase().trim().split("@");
      domain = domain.split(",")[0];
      return `${local}@${domain}`;
    };
    try {
      email = normalizer(body === null || body === void 0 ? void 0 : body.email);
    } catch (error) {
      logger.error("SIGNIN_EMAIL_ERROR", {
        error,
        providerId: provider.id
      });
      return {
        redirect: `${url}/error?error=EmailSignin`
      };
    }
    const user = await (0, _getUserFromEmail.default)({
      email,
      adapter: options.adapter
    });
    const account = {
      providerAccountId: email,
      userId: email,
      type: "email",
      provider: provider.id
    };
    try {
      const signInCallbackResponse = await callbacks.signIn({
        user,
        account,
        email: {
          verificationRequest: true
        }
      });
      if (!signInCallbackResponse) {
        return {
          redirect: `${url}/error?error=AccessDenied`
        };
      } else if (typeof signInCallbackResponse === "string") {
        return {
          redirect: signInCallbackResponse
        };
      }
    } catch (error) {
      return {
        redirect: `${url}/error?${new URLSearchParams({
          error: error
        })}`
      };
    }
    try {
      const redirect = await (0, _signin.default)(email, options);
      return {
        redirect
      };
    } catch (error) {
      logger.error("SIGNIN_EMAIL_ERROR", {
        error,
        providerId: provider.id
      });
      return {
        redirect: `${url}/error?error=EmailSignin`
      };
    }
  }
  return {
    redirect: `${url}/signin`
  };
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/routes/signout.js":
/*!*******************************************************!*\
  !*** ./node_modules/next-auth/core/routes/signout.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = signout;
async function signout(params) {
  const {
    options,
    sessionStore
  } = params;
  const {
    adapter,
    events,
    jwt,
    callbackUrl,
    logger,
    session
  } = options;
  const sessionToken = sessionStore === null || sessionStore === void 0 ? void 0 : sessionStore.value;
  if (!sessionToken) {
    return {
      redirect: callbackUrl
    };
  }
  if (session.strategy === "jwt") {
    try {
      var _events$signOut;
      const decodedJwt = await jwt.decode({
        ...jwt,
        token: sessionToken
      });
      await ((_events$signOut = events.signOut) === null || _events$signOut === void 0 ? void 0 : _events$signOut.call(events, {
        token: decodedJwt
      }));
    } catch (error) {
      logger.error("SIGNOUT_ERROR", error);
    }
  } else {
    try {
      var _events$signOut2;
      const session = await adapter.deleteSession(sessionToken);
      await ((_events$signOut2 = events.signOut) === null || _events$signOut2 === void 0 ? void 0 : _events$signOut2.call(events, {
        session
      }));
    } catch (error) {
      logger.error("SIGNOUT_ERROR", error);
    }
  }
  const sessionCookies = sessionStore.clean();
  return {
    redirect: callbackUrl,
    cookies: sessionCookies
  };
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/core/types.js":
/*!**********************************************!*\
  !*** ./node_modules/next-auth/core/types.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/css/index.js":
/*!*********************************************!*\
  !*** ./node_modules/next-auth/css/index.js ***!
  \*********************************************/
/***/ ((module) => {

module.exports = function() { return ":root{--border-width:1px;--border-radius:0.5rem;--color-error:#c94b4b;--color-info:#157efb;--color-info-hover:#0f6ddb;--color-info-text:#fff}.__next-auth-theme-auto,.__next-auth-theme-light{--color-background:#ececec;--color-background-hover:hsla(0,0%,93%,.8);--color-background-card:#fff;--color-text:#000;--color-primary:#444;--color-control-border:#bbb;--color-button-active-background:#f9f9f9;--color-button-active-border:#aaa;--color-separator:#ccc}.__next-auth-theme-dark{--color-background:#161b22;--color-background-hover:rgba(22,27,34,.8);--color-background-card:#0d1117;--color-text:#fff;--color-primary:#ccc;--color-control-border:#555;--color-button-active-background:#060606;--color-button-active-border:#666;--color-separator:#444}@media (prefers-color-scheme:dark){.__next-auth-theme-auto{--color-background:#161b22;--color-background-hover:rgba(22,27,34,.8);--color-background-card:#0d1117;--color-text:#fff;--color-primary:#ccc;--color-control-border:#555;--color-button-active-background:#060606;--color-button-active-border:#666;--color-separator:#444}a.button,button{background-color:var(--provider-dark-bg,var(--color-background));color:var(--provider-dark-color,var(--color-primary))}a.button:hover,button:hover{background-color:var(--provider-dark-bg-hover,var(--color-background-hover))!important}#provider-logo{display:none!important}#provider-logo-dark{display:block!important;width:25px}}html{box-sizing:border-box}*,:after,:before{box-sizing:inherit;margin:0;padding:0}body{background-color:var(--color-background);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;margin:0;padding:0}h1{font-weight:400}h1,p{color:var(--color-text);margin-bottom:1.5rem;padding:0 1rem}form{margin:0;padding:0}label{font-weight:500;margin-bottom:.25rem;text-align:left}input[type],label{color:var(--color-text);display:block}input[type]{background:var(--color-background-card);border:var(--border-width) solid var(--color-control-border);border-radius:var(--border-radius);box-sizing:border-box;font-size:1rem;padding:.5rem 1rem;width:100%}input[type]:focus{box-shadow:none}p{font-size:1.1rem;line-height:2rem}a.button{line-height:1rem;text-decoration:none}a.button:link,a.button:visited{background-color:var(--color-background);color:var(--color-primary)}button span{flex-grow:1}a.button,button{align-items:center;background-color:var(--provider-bg);border-color:rgba(0,0,0,.1);border-radius:var(--border-radius);color:var(--provider-color,var(--color-primary));display:flex;font-size:1.1rem;font-weight:500;justify-content:center;min-height:62px;padding:.75rem 1rem;position:relative;transition:all .1s ease-in-out}a.button:hover,button:hover{background-color:var(--provider-bg-hover,var(--color-background-hover));cursor:pointer}a.button:active,button:active{cursor:pointer}a.button #provider-logo,button #provider-logo{display:block;width:25px}a.button #provider-logo-dark,button #provider-logo-dark{display:none}#submitButton{background-color:var(--brand-color,var(--color-info));color:var(--button-text-color,var(--color-info-text));width:100%}#submitButton:hover{background-color:var(--button-hover-bg,var(--color-info-hover))!important}a.site{color:var(--color-primary);font-size:1rem;line-height:2rem;text-decoration:none}a.site:hover{text-decoration:underline}.page{box-sizing:border-box;display:grid;height:100%;margin:0;padding:0;place-items:center;position:absolute;width:100%}.page>div{text-align:center}.error a.button{margin-top:.5rem;padding-left:2rem;padding-right:2rem}.error .message{margin-bottom:1.5rem}.signin input[type=text]{display:block;margin-left:auto;margin-right:auto}.signin hr{border:0;border-top:1px solid var(--color-separator);display:block;margin:2rem auto 1rem;overflow:visible}.signin hr:before{background:var(--color-background-card);color:#888;content:\"or\";padding:0 .4rem;position:relative;top:-.7rem}.signin .error{background:#f5f5f5;background:var(--color-error);border-radius:.3rem;font-weight:500}.signin .error p{color:var(--color-info-text);font-size:.9rem;line-height:1.2rem;padding:.5rem 1rem;text-align:left}.signin form,.signin>div{display:block}.signin form input[type],.signin>div input[type]{margin-bottom:.5rem}.signin form button,.signin>div button{width:100%}.signin .provider+.provider{margin-top:1rem}.logo{display:inline-block;margin:1.25rem 0;max-height:70px;max-width:150px}.card{background-color:var(--color-background-card);border-radius:2rem;padding:1.25rem 2rem}.card .header{color:var(--color-primary)}.section-header{color:var(--color-text)}@media screen and (min-width:450px){.card{margin:2rem 0;width:368px}}@media screen and (max-width:450px){.card{margin:1rem 0;width:343px}}" }

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/index.js":
/*!*****************************************!*\
  !*** ./node_modules/next-auth/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _exportNames = {};
Object.defineProperty(exports, "default", ({
  enumerable: true,
  get: function () {
    return _next.default;
  }
}));
var _types = __webpack_require__(/*! ./core/types */ "(rsc)/./node_modules/next-auth/core/types.js");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
var _next = _interopRequireWildcard(__webpack_require__(/*! ./next */ "(rsc)/./node_modules/next-auth/next/index.js"));
Object.keys(_next).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _next[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _next[key];
    }
  });
});
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/jwt/index.js":
/*!*********************************************!*\
  !*** ./node_modules/next-auth/jwt/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(rsc)/./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _exportNames = {
  encode: true,
  decode: true,
  getToken: true
};
exports.decode = decode;
exports.encode = encode;
exports.getToken = getToken;
var _jose = __webpack_require__(/*! jose */ "(rsc)/./node_modules/jose/dist/node/cjs/index.js");
var _hkdf = _interopRequireDefault(__webpack_require__(/*! @panva/hkdf */ "(rsc)/./node_modules/@panva/hkdf/dist/node/cjs/index.js"));
var _uuid = __webpack_require__(/*! uuid */ "(rsc)/./node_modules/uuid/dist/esm-node/index.js");
var _cookie = __webpack_require__(/*! ../core/lib/cookie */ "(rsc)/./node_modules/next-auth/core/lib/cookie.js");
var _types = __webpack_require__(/*! ./types */ "(rsc)/./node_modules/next-auth/jwt/types.js");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
const DEFAULT_MAX_AGE = 30 * 24 * 60 * 60;
const now = () => Date.now() / 1000 | 0;
async function encode(params) {
  const {
    token = {},
    secret,
    maxAge = DEFAULT_MAX_AGE,
    salt = ""
  } = params;
  const encryptionSecret = await getDerivedEncryptionKey(secret, salt);
  return await new _jose.EncryptJWT(token).setProtectedHeader({
    alg: "dir",
    enc: "A256GCM"
  }).setIssuedAt().setExpirationTime(now() + maxAge).setJti((0, _uuid.v4)()).encrypt(encryptionSecret);
}
async function decode(params) {
  const {
    token,
    secret,
    salt = ""
  } = params;
  if (!token) return null;
  const encryptionSecret = await getDerivedEncryptionKey(secret, salt);
  const {
    payload
  } = await (0, _jose.jwtDecrypt)(token, encryptionSecret, {
    clockTolerance: 15
  });
  return payload;
}
async function getToken(params) {
  var _process$env$NEXTAUTH, _process$env$NEXTAUTH2, _process$env$NEXTAUTH3, _req$headers;
  const {
    req,
    secureCookie = (_process$env$NEXTAUTH = (_process$env$NEXTAUTH2 = process.env.NEXTAUTH_URL) === null || _process$env$NEXTAUTH2 === void 0 ? void 0 : _process$env$NEXTAUTH2.startsWith("https://")) !== null && _process$env$NEXTAUTH !== void 0 ? _process$env$NEXTAUTH : !!process.env.VERCEL,
    cookieName = secureCookie ? "__Secure-next-auth.session-token" : "next-auth.session-token",
    raw,
    decode: _decode = decode,
    logger = console,
    secret = (_process$env$NEXTAUTH3 = process.env.NEXTAUTH_SECRET) !== null && _process$env$NEXTAUTH3 !== void 0 ? _process$env$NEXTAUTH3 : process.env.AUTH_SECRET
  } = params;
  if (!req) throw new Error("Must pass `req` to JWT getToken()");
  const sessionStore = new _cookie.SessionStore({
    name: cookieName,
    options: {
      secure: secureCookie
    }
  }, {
    cookies: req.cookies,
    headers: req.headers
  }, logger);
  let token = sessionStore.value;
  const authorizationHeader = req.headers instanceof Headers ? req.headers.get("authorization") : (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers.authorization;
  if (!token && (authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[0]) === "Bearer") {
    const urlEncodedToken = authorizationHeader.split(" ")[1];
    token = decodeURIComponent(urlEncodedToken);
  }
  if (!token) return null;
  if (raw) return token;
  try {
    return await _decode({
      token,
      secret
    });
  } catch (_unused) {
    return null;
  }
}
async function getDerivedEncryptionKey(keyMaterial, salt) {
  return await (0, _hkdf.default)("sha256", keyMaterial, salt, `NextAuth.js Generated Encryption Key${salt ? ` (${salt})` : ""}`, 32);
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/jwt/types.js":
/*!*********************************************!*\
  !*** ./node_modules/next-auth/jwt/types.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/next/index.js":
/*!**********************************************!*\
  !*** ./node_modules/next-auth/next/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
exports.getServerSession = getServerSession;
exports.unstable_getServerSession = unstable_getServerSession;
var _core = __webpack_require__(/*! ../core */ "(rsc)/./node_modules/next-auth/core/index.js");
var _utils = __webpack_require__(/*! ./utils */ "(rsc)/./node_modules/next-auth/next/utils.js");
async function NextAuthApiHandler(req, res, options) {
  var _options$secret, _ref, _options$jwt$secret, _options$jwt, _ref2, _handler$status, _handler$cookies, _handler$headers;
  const {
    nextauth,
    ...query
  } = req.query;
  (_options$secret = options.secret) !== null && _options$secret !== void 0 ? _options$secret : options.secret = (_ref = (_options$jwt$secret = (_options$jwt = options.jwt) === null || _options$jwt === void 0 ? void 0 : _options$jwt.secret) !== null && _options$jwt$secret !== void 0 ? _options$jwt$secret : process.env.NEXTAUTH_SECRET) !== null && _ref !== void 0 ? _ref : process.env.AUTH_SECRET;
  const handler = await (0, _core.AuthHandler)({
    req: {
      body: req.body,
      query,
      cookies: req.cookies,
      headers: req.headers,
      method: req.method,
      action: nextauth === null || nextauth === void 0 ? void 0 : nextauth[0],
      providerId: nextauth === null || nextauth === void 0 ? void 0 : nextauth[1],
      error: (_ref2 = req.query.error) !== null && _ref2 !== void 0 ? _ref2 : nextauth === null || nextauth === void 0 ? void 0 : nextauth[1]
    },
    options
  });
  res.status((_handler$status = handler.status) !== null && _handler$status !== void 0 ? _handler$status : 200);
  (_handler$cookies = handler.cookies) === null || _handler$cookies === void 0 || _handler$cookies.forEach(cookie => (0, _utils.setCookie)(res, cookie));
  (_handler$headers = handler.headers) === null || _handler$headers === void 0 || _handler$headers.forEach(h => res.setHeader(h.key, h.value));
  if (handler.redirect) {
    var _req$body;
    if (((_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.json) !== "true") {
      res.status(302).setHeader("Location", handler.redirect);
      res.end();
      return;
    }
    return res.json({
      url: handler.redirect
    });
  }
  return res.send(handler.body);
}
async function NextAuthRouteHandler(req, context, options) {
  var _options$secret2, _process$env$NEXTAUTH, _await$context$params, _query$error;
  (_options$secret2 = options.secret) !== null && _options$secret2 !== void 0 ? _options$secret2 : options.secret = (_process$env$NEXTAUTH = process.env.NEXTAUTH_SECRET) !== null && _process$env$NEXTAUTH !== void 0 ? _process$env$NEXTAUTH : process.env.AUTH_SECRET;
  const {
    headers,
    cookies
  } = __webpack_require__(/*! next/headers */ "(rsc)/./node_modules/next/dist/api/headers.js");
  const nextauth = (_await$context$params = await context.params) === null || _await$context$params === void 0 ? void 0 : _await$context$params.nextauth;
  const query = Object.fromEntries(req.nextUrl.searchParams);
  const body = await (0, _utils.getBody)(req);
  const internalResponse = await (0, _core.AuthHandler)({
    req: {
      body,
      query,
      cookies: Object.fromEntries((await cookies()).getAll().map(c => [c.name, c.value])),
      headers: Object.fromEntries(await headers()),
      method: req.method,
      action: nextauth === null || nextauth === void 0 ? void 0 : nextauth[0],
      providerId: nextauth === null || nextauth === void 0 ? void 0 : nextauth[1],
      error: (_query$error = query.error) !== null && _query$error !== void 0 ? _query$error : nextauth === null || nextauth === void 0 ? void 0 : nextauth[1]
    },
    options
  });
  const response = (0, _utils.toResponse)(internalResponse);
  const redirect = response.headers.get("Location");
  if ((body === null || body === void 0 ? void 0 : body.json) === "true" && redirect) {
    response.headers.delete("Location");
    response.headers.set("Content-Type", "application/json");
    return new Response(JSON.stringify({
      url: redirect
    }), {
      status: internalResponse.status,
      headers: response.headers
    });
  }
  return response;
}
function NextAuth(...args) {
  var _args$;
  if (args.length === 1) {
    return async (req, res) => {
      if (res !== null && res !== void 0 && res.params) {
        return await NextAuthRouteHandler(req, res, args[0]);
      }
      return await NextAuthApiHandler(req, res, args[0]);
    };
  }
  if ((_args$ = args[1]) !== null && _args$ !== void 0 && _args$.params) {
    return NextAuthRouteHandler(...args);
  }
  return NextAuthApiHandler(...args);
}
var _default = exports["default"] = NextAuth;
async function getServerSession(...args) {
  var _options, _options$secret3, _process$env$NEXTAUTH2;
  const isRSC = args.length === 0 || args.length === 1;
  let req, res, options;
  if (isRSC) {
    options = Object.assign({}, args[0], {
      providers: []
    });
    const {
      headers,
      cookies
    } = __webpack_require__(/*! next/headers */ "(rsc)/./node_modules/next/dist/api/headers.js");
    req = {
      headers: Object.fromEntries(await headers()),
      cookies: Object.fromEntries((await cookies()).getAll().map(c => [c.name, c.value]))
    };
    res = {
      getHeader() {},
      setCookie() {},
      setHeader() {}
    };
  } else {
    req = args[0];
    res = args[1];
    options = Object.assign({}, args[2], {
      providers: []
    });
  }
  (_options$secret3 = (_options = options).secret) !== null && _options$secret3 !== void 0 ? _options$secret3 : _options.secret = (_process$env$NEXTAUTH2 = process.env.NEXTAUTH_SECRET) !== null && _process$env$NEXTAUTH2 !== void 0 ? _process$env$NEXTAUTH2 : process.env.AUTH_SECRET;
  const session = await (0, _core.AuthHandler)({
    options,
    req: {
      action: "session",
      method: "GET",
      cookies: req.cookies,
      headers: req.headers
    }
  });
  const {
    body,
    cookies,
    status = 200
  } = session;
  cookies === null || cookies === void 0 || cookies.forEach(cookie => (0, _utils.setCookie)(res, cookie));
  if (body && typeof body !== "string" && Object.keys(body).length) {
    if (status === 200) {
      if (isRSC) delete body.expires;
      return body;
    }
    throw new Error(body.message);
  }
  return null;
}
let deprecatedWarningShown = false;
async function unstable_getServerSession(...args) {
  if (!deprecatedWarningShown && "development" !== "production") {
    console.warn("`unstable_getServerSession` has been renamed to `getServerSession`.");
    deprecatedWarningShown = true;
  }
  return await getServerSession(...args);
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/next/utils.js":
/*!**********************************************!*\
  !*** ./node_modules/next-auth/next/utils.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getBody = getBody;
exports.setCookie = setCookie;
exports.toResponse = toResponse;
var _cookie = __webpack_require__(/*! cookie */ "(rsc)/./node_modules/next-auth/node_modules/cookie/index.js");
function setCookie(res, cookie) {
  var _res$getHeader;
  let setCookieHeader = (_res$getHeader = res.getHeader("Set-Cookie")) !== null && _res$getHeader !== void 0 ? _res$getHeader : [];
  if (!Array.isArray(setCookieHeader)) {
    setCookieHeader = [setCookieHeader];
  }
  const {
    name,
    value,
    options
  } = cookie;
  const cookieHeader = (0, _cookie.serialize)(name, value, options);
  setCookieHeader.push(cookieHeader);
  res.setHeader("Set-Cookie", setCookieHeader);
}
async function getBody(req) {
  if (!("body" in req) || !req.body || req.method !== "POST") return;
  const contentType = req.headers.get("content-type");
  if (contentType !== null && contentType !== void 0 && contentType.includes("application/json")) {
    return await req.json();
  } else if (contentType !== null && contentType !== void 0 && contentType.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams(await req.text());
    return Object.fromEntries(params);
  }
}
function toResponse(res) {
  var _res$headers, _res$cookies, _res$status;
  const headers = new Headers((_res$headers = res.headers) === null || _res$headers === void 0 ? void 0 : _res$headers.reduce((acc, {
    key,
    value
  }) => {
    acc[key] = value;
    return acc;
  }, {}));
  (_res$cookies = res.cookies) === null || _res$cookies === void 0 || _res$cookies.forEach(cookie => {
    const {
      name,
      value,
      options
    } = cookie;
    const cookieHeader = (0, _cookie.serialize)(name, value, options);
    if (headers.has("Set-Cookie")) headers.append("Set-Cookie", cookieHeader);else headers.set("Set-Cookie", cookieHeader);
  });
  let body = res.body;
  if (headers.get("content-type") === "application/json") body = JSON.stringify(res.body);else if (headers.get("content-type") === "application/x-www-form-urlencoded") body = new URLSearchParams(res.body).toString();
  const status = res.redirect ? 302 : (_res$status = res.status) !== null && _res$status !== void 0 ? _res$status : 200;
  const response = new Response(body, {
    headers,
    status
  });
  if (res.redirect) response.headers.set("Location", res.redirect);
  return response;
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/node_modules/cookie/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/next-auth/node_modules/cookie/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

exports.parse = parse;
exports.serialize = serialize;

/**
 * Module variables.
 * @private
 */

var __toString = Object.prototype.toString
var __hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * RegExp to match cookie-name in RFC 6265 sec 4.1.1
 * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
 * which has been replaced by the token definition in RFC 7230 appendix B.
 *
 * cookie-name       = token
 * token             = 1*tchar
 * tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
 *                     "*" / "+" / "-" / "." / "^" / "_" /
 *                     "`" / "|" / "~" / DIGIT / ALPHA
 */

var cookieNameRegExp = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;

/**
 * RegExp to match cookie-value in RFC 6265 sec 4.1.1
 *
 * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
 * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
 *                     ; US-ASCII characters excluding CTLs,
 *                     ; whitespace DQUOTE, comma, semicolon,
 *                     ; and backslash
 */

var cookieValueRegExp = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/;

/**
 * RegExp to match domain-value in RFC 6265 sec 4.1.1
 *
 * domain-value      = <subdomain>
 *                     ; defined in [RFC1034], Section 3.5, as
 *                     ; enhanced by [RFC1123], Section 2.1
 * <subdomain>       = <label> | <subdomain> "." <label>
 * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
 *                     Labels must be 63 characters or less.
 *                     'let-dig' not 'letter' in the first char, per RFC1123
 * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
 * <let-dig-hyp>     = <let-dig> | "-"
 * <let-dig>         = <letter> | <digit>
 * <letter>          = any one of the 52 alphabetic characters A through Z in
 *                     upper case and a through z in lower case
 * <digit>           = any one of the ten digits 0 through 9
 *
 * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
 *
 * > (Note that a leading %x2E ("."), if present, is ignored even though that
 * character is not permitted, but a trailing %x2E ("."), if present, will
 * cause the user agent to ignore the attribute.)
 */

var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;

/**
 * RegExp to match path-value in RFC 6265 sec 4.1.1
 *
 * path-value        = <any CHAR except CTLs or ";">
 * CHAR              = %x01-7F
 *                     ; defined in RFC 5234 appendix B.1
 */

var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [opt]
 * @return {object}
 * @public
 */

function parse(str, opt) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var len = str.length;
  // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
  if (len < 2) return obj;

  var dec = (opt && opt.decode) || decode;
  var index = 0;
  var eqIdx = 0;
  var endIdx = 0;

  do {
    eqIdx = str.indexOf('=', index);
    if (eqIdx === -1) break; // No more cookie pairs.

    endIdx = str.indexOf(';', index);

    if (endIdx === -1) {
      endIdx = len;
    } else if (eqIdx > endIdx) {
      // backtrack on prior semicolon
      index = str.lastIndexOf(';', eqIdx - 1) + 1;
      continue;
    }

    var keyStartIdx = startIndex(str, index, eqIdx);
    var keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
    var key = str.slice(keyStartIdx, keyEndIdx);

    // only assign once
    if (!__hasOwnProperty.call(obj, key)) {
      var valStartIdx = startIndex(str, eqIdx + 1, endIdx);
      var valEndIdx = endIndex(str, endIdx, valStartIdx);

      if (str.charCodeAt(valStartIdx) === 0x22 /* " */ && str.charCodeAt(valEndIdx - 1) === 0x22 /* " */) {
        valStartIdx++;
        valEndIdx--;
      }

      var val = str.slice(valStartIdx, valEndIdx);
      obj[key] = tryDecode(val, dec);
    }

    index = endIdx + 1
  } while (index < len);

  return obj;
}

function startIndex(str, index, max) {
  do {
    var code = str.charCodeAt(index);
    if (code !== 0x20 /*   */ && code !== 0x09 /* \t */) return index;
  } while (++index < max);
  return max;
}

function endIndex(str, index, min) {
  while (index > min) {
    var code = str.charCodeAt(--index);
    if (code !== 0x20 /*   */ && code !== 0x09 /* \t */) return index + 1;
  }
  return min;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize a name value pair into a cookie string suitable for
 * http headers. An optional options object specifies cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [opt]
 * @return {string}
 * @public
 */

function serialize(name, val, opt) {
  var enc = (opt && opt.encode) || encodeURIComponent;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!cookieNameRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (!cookieValueRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;
  if (!opt) return str;

  if (null != opt.maxAge) {
    var maxAge = Math.floor(opt.maxAge);

    if (!isFinite(maxAge)) {
      throw new TypeError('option maxAge is invalid')
    }

    str += '; Max-Age=' + maxAge;
  }

  if (opt.domain) {
    if (!domainValueRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!pathValueRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    var expires = opt.expires

    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + expires.toUTCString()
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.partitioned) {
    str += '; Partitioned'
  }

  if (opt.priority) {
    var priority = typeof opt.priority === 'string'
      ? opt.priority.toLowerCase() : opt.priority;

    switch (priority) {
      case 'low':
        str += '; Priority=Low'
        break
      case 'medium':
        str += '; Priority=Medium'
        break
      case 'high':
        str += '; Priority=High'
        break
      default:
        throw new TypeError('option priority is invalid')
    }
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * URL-decode string value. Optimized to skip native call when no %.
 *
 * @param {string} str
 * @returns {string}
 */

function decode (str) {
  return str.indexOf('%') !== -1
    ? decodeURIComponent(str)
    : str
}

/**
 * Determine if value is a Date.
 *
 * @param {*} val
 * @private
 */

function isDate (val) {
  return __toString.call(val) === '[object Date]';
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}


/***/ }),

/***/ "(rsc)/./node_modules/next-auth/providers/credentials.js":
/*!*********************************************************!*\
  !*** ./node_modules/next-auth/providers/credentials.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = Credentials;
function Credentials(options) {
  return {
    id: "credentials",
    name: "Credentials",
    type: "credentials",
    credentials: {},
    authorize: () => null,
    options
  };
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/utils/detect-origin.js":
/*!*******************************************************!*\
  !*** ./node_modules/next-auth/utils/detect-origin.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.detectOrigin = detectOrigin;
function detectOrigin(forwardedHost, protocol) {
  var _process$env$VERCEL;
  if ((_process$env$VERCEL = process.env.VERCEL) !== null && _process$env$VERCEL !== void 0 ? _process$env$VERCEL : process.env.AUTH_TRUST_HOST) return `${protocol === "http" ? "http" : "https"}://${forwardedHost}`;
  return process.env.NEXTAUTH_URL;
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/utils/logger.js":
/*!************************************************!*\
  !*** ./node_modules/next-auth/utils/logger.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(rsc)/./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
exports.proxyLogger = proxyLogger;
exports.setLogger = setLogger;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "(rsc)/./node_modules/@babel/runtime/regenerator/index.js"));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "(rsc)/./node_modules/@babel/runtime/helpers/defineProperty.js"));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "(rsc)/./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));
var _errors = __webpack_require__(/*! ../core/errors */ "(rsc)/./node_modules/next-auth/core/errors.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function formatError(o) {
  if (o instanceof Error && !(o instanceof _errors.UnknownError)) {
    return {
      message: o.message,
      stack: o.stack,
      name: o.name
    };
  }
  if (hasErrorProperty(o)) {
    var _o$message;
    o.error = formatError(o.error);
    o.message = (_o$message = o.message) !== null && _o$message !== void 0 ? _o$message : o.error.message;
  }
  return o;
}
function hasErrorProperty(x) {
  return !!(x !== null && x !== void 0 && x.error);
}
var _logger = {
  error: function error(code, metadata) {
    metadata = formatError(metadata);
    console.error("[next-auth][error][".concat(code, "]"), "\nhttps://next-auth.js.org/errors#".concat(code.toLowerCase()), metadata.message, metadata);
  },
  warn: function warn(code) {
    console.warn("[next-auth][warn][".concat(code, "]"), "\nhttps://next-auth.js.org/warnings#".concat(code.toLowerCase()));
  },
  debug: function debug(code, metadata) {
    console.log("[next-auth][debug][".concat(code, "]"), metadata);
  }
};
function setLogger() {
  var newLogger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var debug = arguments.length > 1 ? arguments[1] : undefined;
  if (!debug) _logger.debug = function () {};
  if (newLogger.error) _logger.error = newLogger.error;
  if (newLogger.warn) _logger.warn = newLogger.warn;
  if (newLogger.debug) _logger.debug = newLogger.debug;
}
var _default = exports["default"] = _logger;
function proxyLogger() {
  var logger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _logger;
  var basePath = arguments.length > 1 ? arguments[1] : undefined;
  try {
    if (typeof window === "undefined") {
      return logger;
    }
    var clientLogger = {};
    var _loop = function _loop(level) {
      clientLogger[level] = function () {
        var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(code, metadata) {
          var url, body;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _logger[level](code, metadata);
                if (level === "error") {
                  metadata = formatError(metadata);
                }
                ;
                metadata.client = true;
                url = "".concat(basePath, "/_log");
                body = new URLSearchParams(_objectSpread({
                  level: level,
                  code: code
                }, metadata));
                if (!navigator.sendBeacon) {
                  _context.next = 8;
                  break;
                }
                return _context.abrupt("return", navigator.sendBeacon(url, body));
              case 8:
                _context.next = 10;
                return fetch(url, {
                  method: "POST",
                  body: body,
                  keepalive: true
                });
              case 10:
                return _context.abrupt("return", _context.sent);
              case 11:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }();
    };
    for (var level in logger) {
      _loop(level);
    }
    return clientLogger;
  } catch (_unused) {
    return _logger;
  }
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/utils/merge.js":
/*!***********************************************!*\
  !*** ./node_modules/next-auth/utils/merge.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.merge = merge;
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function merge(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {
          [key]: {}
        });
        merge(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key]
        });
      }
    }
  }
  return merge(target, ...sources);
}

/***/ }),

/***/ "(rsc)/./node_modules/next-auth/utils/parse-url.js":
/*!***************************************************!*\
  !*** ./node_modules/next-auth/utils/parse-url.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = parseUrl;
function parseUrl(url) {
  var _url2;
  const defaultUrl = new URL("http://localhost:3000/api/auth");
  if (url && !url.startsWith("http")) {
    url = `https://${url}`;
  }
  const _url = new URL((_url2 = url) !== null && _url2 !== void 0 ? _url2 : defaultUrl);
  const path = (_url.pathname === "/" ? defaultUrl.pathname : _url.pathname).replace(/\/$/, "");
  const base = `${_url.origin}${path}`;
  return {
    origin: _url.origin,
    host: _url.host,
    path,
    base,
    toString: () => base
  };
}

/***/ })

};
;