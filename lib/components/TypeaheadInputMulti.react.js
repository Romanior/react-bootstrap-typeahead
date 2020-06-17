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

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _Input = _interopRequireDefault(require("./Input.react"));

var _utils = require("../utils");

var _hintContainer = _interopRequireDefault(require("../containers/hintContainer"));

var _withClassNames = _interopRequireDefault(require("../containers/withClassNames"));

var _constants = require("../constants");

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
var HintedInput = (0, _hintContainer["default"])(_Input["default"]);

var TypeaheadInputMulti = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(TypeaheadInputMulti, _React$Component);

  function TypeaheadInputMulti() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "wrapperRef", /*#__PURE__*/_react["default"].createRef());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_input", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getInputRef", function (input) {
      _this._input = input;

      _this.props.inputRef(input);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleContainerClickOrFocus", function (e) {
      // Don't focus the input if it's disabled.
      if (_this.props.disabled) {
        e.currentTarget.blur();
        return;
      } // Move cursor to the end if the user clicks outside the actual input.


      var inputNode = _this._input;

      if (!inputNode) {
        return;
      }

      if (e.currentTarget !== inputNode && (0, _utils.isSelectable)(inputNode)) {
        inputNode.selectionStart = inputNode.value.length;
      }

      inputNode.focus();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleKeyDown", function (e) {
      var _this$props = _this.props,
          onKeyDown = _this$props.onKeyDown,
          selected = _this$props.selected,
          value = _this$props.value;

      switch (e.keyCode) {
        case _constants.BACKSPACE:
          if (e.currentTarget === _this._input && selected.length && !value) {
            // Prevent browser from going back.
            e.preventDefault(); // If the input is selected and there is no text, focus the last
            // token when the user hits backspace.

            if (_this.wrapperRef.current) {
              var children = _this.wrapperRef.current.children;
              var lastToken = children[children.length - 2];
              lastToken && lastToken.focus();
            }
          }

          break;

        default:
          break;
      }

      onKeyDown(e);
    });
    return _this;
  }

  var _proto = TypeaheadInputMulti.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        className = _this$props2.className,
        inputClassName = _this$props2.inputClassName,
        inputRef = _this$props2.inputRef,
        placeholder = _this$props2.placeholder,
        selected = _this$props2.selected,
        props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props2, ["children", "className", "inputClassName", "inputRef", "placeholder", "selected"]);
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])('rbt-input-multi', className),
      disabled: props.disabled,
      onClick: this._handleContainerClickOrFocus,
      onFocus: this._handleContainerClickOrFocus,
      tabIndex: -1
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "rbt-input-wrapper",
      ref: this.wrapperRef
    }, children, /*#__PURE__*/_react["default"].createElement(HintedInput, (0, _extends2["default"])({}, props, {
      className: inputClassName,
      onKeyDown: this._handleKeyDown,
      placeholder: selected.length ? '' : placeholder,
      ref: this.getInputRef,
      style: {
        backgroundColor: 'transparent',
        border: 0,
        boxShadow: 'none',
        cursor: 'inherit',
        outline: 'none',
        padding: 0,
        width: '100%',
        zIndex: 1
      }
    }))));
  };

  return TypeaheadInputMulti;
}(_react["default"].Component);

var _default = (0, _withClassNames["default"])(TypeaheadInputMulti);

exports["default"] = _default;