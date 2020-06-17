"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BaseMenuItem = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _menuItemContainer = _interopRequireDefault(require("../containers/menuItemContainer"));

var BaseMenuItem = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var active = _ref.active,
      children = _ref.children,
      className = _ref.className,
      disabled = _ref.disabled,
      _onClick = _ref.onClick,
      onMouseDown = _ref.onMouseDown,
      props = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["active", "children", "className", "disabled", "onClick", "onMouseDown"]);
  var conditionalClassNames = {
    active: active,
    disabled: disabled
  };
  return (
    /*#__PURE__*/

    /* eslint-disable jsx-a11y/anchor-is-valid */
    _react["default"].createElement("li", (0, _extends2["default"])({}, props, {
      className: (0, _classnames["default"])(conditionalClassNames, className),
      ref: ref
    }), /*#__PURE__*/_react["default"].createElement("a", {
      className: (0, _classnames["default"])('dropdown-item', conditionalClassNames),
      href: "#",
      onClick: function onClick(e) {
        e.preventDefault();
        !disabled && _onClick && _onClick(e);
      },
      onMouseDown: onMouseDown
    }, children))
    /* eslint-enable jsx-a11y/anchor-is-valid */

  );
});

exports.BaseMenuItem = BaseMenuItem;

var _default = (0, _menuItemContainer["default"])(BaseMenuItem);

exports["default"] = _default;