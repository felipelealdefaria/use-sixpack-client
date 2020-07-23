"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _sixpackClient = require("sixpack-client");

var _sixpackClient2 = _interopRequireDefault(_sixpackClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

exports.default = function (name, variations, _ref) {
  var traffic = _ref.traffic,
      timeout = _ref.timeout,
      baseURL = _ref.baseURL;

  var _React$useState = _react2.default.useState({
    ready: false,
    variation: null,
    convert: function convert() {}
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      data = _React$useState2[0],
      setData = _React$useState2[1];

  if (typeof window === 'undefined') return data;
  var session = new _sixpackClient2.default.Session({
    base_url: baseURL || null,
    timeout: timeout || 4000
  });
  var force = getForcedVariant("force-" + name);

  _react2.default.useEffect(function () {
    session.participate(name, variations, traffic || 0.5, force, function (err, res) {
      if (!err) {
        var convert = function convert(kpi) {
          return new Promise(function (resolve, reject) {
            session.convert(name, kpi, function (err) {
              if (err) {
                console.error(err);
                return reject();
              }

              return resolve();
            });
          });
        };

        setData({
          ready: true,
          variation: res.alternative.name,
          convert: convert
        });
      } else {
        console.error('err', err);
      }
    });
  }, []);

  return data;
};

function getForcedVariant(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return null;
}