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

var Serialize = function (_Middleware) {
  _inherits(Serialize, _Middleware);

  function Serialize() {
    _classCallCheck(this, Serialize);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Serialize).call(this, 'Kinvey Serializer Middleware'));
  }

  _createClass(Serialize, [{
    key: 'handle',
    value: function handle(request) {
      return _get(Object.getPrototypeOf(Serialize.prototype), 'handle', this).call(this, request).then(function () {
        if (request && request.data) {
          var contentType = request.headers['content-type'] || request.headers['Content-Type'];

          if (contentType.indexOf('application/json') === 0) {
            request.data = JSON.stringify(request.data);
          } else if (contentType.indexOf('application/x-www-form-urlencoded') === 0) {
            var data = request.data;
            var str = [];

            for (var p in data) {
              if (data.hasOwnProperty(p)) {
                str.push(global.encodeURIComponent(p) + '=' + global.encodeURIComponent(data[p]));
              }
            }

            request.data = str.join('&');
          }
        }

        return request;
      });
    }
  }]);

  return Serialize;
}(_middleware2.default);

exports.default = Serialize;