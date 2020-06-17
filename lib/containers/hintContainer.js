"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _Context = require("../core/Context");

var _utils = require("../utils");

// IE doesn't seem to get the composite computed value (eg: 'padding',
// 'borderStyle', etc.), so generate these from the individual values.
function interpolateStyle(styles, attr, subattr) {
  if (subattr === void 0) {
    subattr = '';
  }

  // Title-case the sub-attribute.
  if (subattr) {
    /* eslint-disable-next-line no-param-reassign */
    subattr = subattr.replace(subattr[0], subattr[0].toUpperCase());
  }

  return ['Top', 'Right', 'Bottom', 'Left'].map(function (dir) {
    return styles[attr + dir + subattr];
  }).join(' ');
}

function copyStyles(inputNode, hintNode) {
  if (!inputNode || !hintNode) {
    return;
  }

  var inputStyle = window.getComputedStyle(inputNode);
  /* eslint-disable no-param-reassign */

  hintNode.style.borderStyle = interpolateStyle(inputStyle, 'border', 'style');
  hintNode.style.borderWidth = interpolateStyle(inputStyle, 'border', 'width');
  hintNode.style.fontSize = inputStyle.fontSize;
  hintNode.style.height = inputStyle.height;
  hintNode.style.lineHeight = inputStyle.lineHeight;
  hintNode.style.margin = interpolateStyle(inputStyle, 'margin');
  hintNode.style.padding = interpolateStyle(inputStyle, 'padding');
  /* eslint-enable no-param-reassign */
}

function hintContainer(Input) {
  var HintedInput = /*#__PURE__*/function (_React$Component) {
    (0, _inheritsLoose2["default"])(HintedInput, _React$Component);

    function HintedInput() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "hintRef", /*#__PURE__*/_react["default"].createRef());
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleKeyDown", function (e) {
        var _this$props = _this.props,
            initialItem = _this$props.initialItem,
            onAdd = _this$props.onAdd,
            onKeyDown = _this$props.onKeyDown;

        if ((0, _utils.shouldSelectHint)(e, _this.props)) {
          e.preventDefault(); // Prevent input from blurring on TAB.

          onAdd(initialItem);
        }

        onKeyDown(e);
      });
      return _this;
    }

    var _proto = HintedInput.prototype;

    _proto.componentDidMount = function componentDidMount() {
      copyStyles(this.props.inputNode, this.hintRef.current);
    };

    _proto.componentDidUpdate = function componentDidUpdate() {
      copyStyles(this.props.inputNode, this.hintRef.current);
    };

    _proto.render = function render() {
      var _this$props2 = this.props,
          forwardedRef = _this$props2.forwardedRef,
          hintText = _this$props2.hintText,
          initialItem = _this$props2.initialItem,
          inputNode = _this$props2.inputNode,
          onAdd = _this$props2.onAdd,
          selectHintOnEnter = _this$props2.selectHintOnEnter,
          highlightFirstResult = _this$props2.highlightFirstResult,
          isMenuShown = _this$props2.isMenuShown,
          minLength = _this$props2.minLength,
          props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props2, ["forwardedRef", "hintText", "initialItem", "inputNode", "onAdd", "selectHintOnEnter", "highlightFirstResult", "isMenuShown", "minLength"]);
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          display: 'flex',
          flex: 1,
          height: '100%',
          position: 'relative'
        }
      }, /*#__PURE__*/_react["default"].createElement(Input, (0, _extends2["default"])({}, props, {
        onKeyDown: this._handleKeyDown,
        ref: forwardedRef
      })), /*#__PURE__*/_react["default"].createElement("input", {
        "aria-hidden": true,
        className: "rbt-input-hint",
        ref: this.hintRef,
        readOnly: true,
        style: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          boxShadow: 'none',
          color: 'rgba(0, 0, 0, 0.35)',
          left: 0,
          pointerEvents: 'none',
          position: 'absolute',
          top: 0,
          width: '100%'
        },
        tabIndex: -1,
        value: hintText
      }));
    };

    return HintedInput;
  }(_react["default"].Component);

  (0, _defineProperty2["default"])(HintedInput, "displayName", "hintContainer(" + (0, _utils.getDisplayName)(Input) + ")");
  var HintedInputWithContext = (0, _Context.withContext)(HintedInput, ['hintText', 'initialItem', 'inputNode', 'onAdd', 'selectHintOnEnter', 'highlightFirstResult', 'isMenuShown', 'minLength']);
  return /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
    return /*#__PURE__*/_react["default"].createElement(HintedInputWithContext, (0, _extends2["default"])({}, props, {
      forwardedRef: ref
    }));
  });
}

var _default = hintContainer;
exports["default"] = _default;