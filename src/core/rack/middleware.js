'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asciiTree = require('./asciiTree');

var _asciiTree2 = _interopRequireDefault(_asciiTree);

var _urlPattern = require('url-pattern');

var _urlPattern2 = _interopRequireDefault(_urlPattern);

var _errors = require('../errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Middleware = function () {
  function Middleware() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'Middleware' : arguments[0];

    _classCallCheck(this, Middleware);

    this.name = name;
  }

  _createClass(Middleware, [{
    key: 'handle',
    value: function handle() {
      var request = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return Promise.resolve(request);
    }
  }, {
    key: 'generateTree',
    value: function generateTree() {
      var level = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      var root = {
        value: this.name,
        level: level,
        nodes: []
      };
      return root;
    }
  }, {
    key: 'toString',
    value: function toString() {
      var root = this.generateTree();
      return _asciiTree2.default.generate(root);
    }
  }]);

  return Middleware;
}();

var KinveyMiddleware = function (_Middleware) {
  _inherits(KinveyMiddleware, _Middleware);

  function KinveyMiddleware() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'Kinvey Middleware' : arguments[0];

    _classCallCheck(this, KinveyMiddleware);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(KinveyMiddleware).call(this, name));
  }

  _createClass(KinveyMiddleware, [{
    key: 'handle',
    value: function handle(request) {
      return new Promise(function (resolve, reject) {
        if (request) {
          var pattern = new _urlPattern2.default('/:namespace/:appId(/)(:collection)(/)(:id)(/)');
          var matches = pattern.match(request.pathname);
          return resolve(matches);
        }

        reject(new _errors.KinveyError('Request is null. Please provide a valid request.', request));
      });
    }
  }]);

  return KinveyMiddleware;
}(Middleware);

exports.default = KinveyMiddleware;