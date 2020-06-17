"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _Context = require("./Context");

var _utils = require("../utils");

var _constants = require("../constants");

var inputPropKeys = ['activeIndex', 'disabled', 'id', 'inputRef', 'isFocused', 'isMenuShown', 'multiple', 'onBlur', 'onChange', 'onFocus', 'onKeyDown', 'placeholder'];
var propKeys = ['activeIndex', 'hideMenu', 'isMenuShown', 'labelKey', 'onClear', 'onHide', 'onRemove', 'results', 'selected', 'text', 'toggleMenu'];
var typeaheadContextKeys = ['activeIndex', 'id', 'initialItem', 'inputNode', 'onActiveItemChange', 'onAdd', 'onInitialItemChange', 'onMenuItemClick', 'selectHintOnEnter', 'highlightFirstResult', 'minLength', 'setItem'];

function getTypeaheadContextValue(props) {
  return (0, _extends2["default"])({}, (0, _utils.pick)(props, typeaheadContextKeys), {
    hintText: (0, _utils.getHintText)(props),
    isOnlyResult: (0, _utils.getIsOnlyResult)(props)
  });
}

var TypeaheadManager = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(TypeaheadManager, _React$Component);

  function TypeaheadManager() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleKeyDown", function (e) {
      var _this$props = _this.props,
          initialItem = _this$props.initialItem,
          onKeyDown = _this$props.onKeyDown,
          onAdd = _this$props.onAdd;

      switch (e.keyCode) {
        case _constants.RETURN:
          if (initialItem && (0, _utils.getIsOnlyResult)(_this.props)) {
            onAdd(initialItem);
          }

          break;

        default:
          break;
      }

      onKeyDown(e);
    });
    return _this;
  }

  var _proto = TypeaheadManager.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props2 = this.props,
        allowNew = _this$props2.allowNew,
        isMenuShown = _this$props2.isMenuShown,
        onInitialItemChange = _this$props2.onInitialItemChange,
        onMenuToggle = _this$props2.onMenuToggle,
        results = _this$props2.results; // Clear the initial item when there are no results.

    if (!(allowNew || results.length)) {
      onInitialItemChange(null);
    }

    if (isMenuShown !== prevProps.isMenuShown) {
      onMenuToggle(isMenuShown);
    }
  };

  _proto.render = function render() {
    var childProps = (0, _extends2["default"])({}, (0, _utils.pick)(this.props, propKeys), {
      getInputProps: (0, _utils.getInputProps)((0, _extends2["default"])({}, (0, _utils.pick)(this.props, inputPropKeys), {
        onKeyDown: this._handleKeyDown,
        value: (0, _utils.getInputText)(this.props)
      }))
    });
    return /*#__PURE__*/_react["default"].createElement(_Context.TypeaheadContext.Provider, {
      value: getTypeaheadContextValue(this.props)
    }, this.props.children(childProps));
  };

  return TypeaheadManager;
}(_react["default"].Component);

var _default = TypeaheadManager;
exports["default"] = _default;