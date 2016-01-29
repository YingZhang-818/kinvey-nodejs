'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Parse = function (_Middleware) {
  _inherits(Parse, _Middleware);

  function Parse() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'Kinvey Parser Middleware' : arguments[0];

    _classCallCheck(this, Parse);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Parse).call(this, name));
  }

  _createClass(Parse, [{
    key: 'handle',
    value: function handle(request) {
      return _get(Object.getPrototypeOf(Parse.prototype), 'handle', this).call(this, request).then(function () {
        var response = request.response;

        if (response && response.data) {
          var contentType = response.headers['content-type'] || response.headers['Content-Type'];

          if (contentType.indexOf('application/json') === 0) {
            try {
              response.data = JSON.parse(response.data);
            } catch (err) {
              response.data = response.data;
            }

            request.response = response;
          }
        }

        return request;
      });
    }
  }]);

  return Parse;
}(_middleware2.default);

exports.default = Parse;