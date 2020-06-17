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

var _scrollIntoViewIfNeeded = _interopRequireDefault(require("scroll-into-view-if-needed"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Context = require("../core/Context");

var _utils = require("../utils");

var propTypes = {
  option: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].string]).isRequired,
  position: _propTypes["default"].number
};

var menuItemContainer = function menuItemContainer(Component) {
  var WrappedMenuItem = /*#__PURE__*/function (_React$Component) {
    (0, _inheritsLoose2["default"])(WrappedMenuItem, _React$Component);

    function WrappedMenuItem() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "itemRef", /*#__PURE__*/_react["default"].createRef());
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleClick", function (e) {
        var _this$props = _this.props,
            onMenuItemClick = _this$props.onMenuItemClick,
            option = _this$props.option,
            onClick = _this$props.onClick;
        onMenuItemClick(option, e);
        onClick && onClick(e);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_maybeUpdateItem", function () {
        var _this$props2 = _this.props,
            activeIndex = _this$props2.activeIndex,
            onActiveItemChange = _this$props2.onActiveItemChange,
            onInitialItemChange = _this$props2.onInitialItemChange,
            option = _this$props2.option,
            position = _this$props2.position;

        if (position === 0) {
          onInitialItemChange(option);
        }

        if (position === activeIndex) {
          onActiveItemChange(option); // Automatically scroll the menu as the user keys through it.

          var node = _this.itemRef.current;
          node && (0, _scrollIntoViewIfNeeded["default"])(node, {
            block: 'nearest',
            boundary: node.parentNode,
            inline: 'nearest',
            scrollMode: 'if-needed'
          });
        }
      });
      return _this;
    }

    var _proto = WrappedMenuItem.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this._maybeUpdateItem();
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      this._maybeUpdateItem();
    };

    _proto.render = function render() {
      var _this$props3 = this.props,
          activeIndex = _this$props3.activeIndex,
          id = _this$props3.id,
          isOnlyResult = _this$props3.isOnlyResult,
          label = _this$props3.label,
          onActiveItemChange = _this$props3.onActiveItemChange,
          onInitialItemChange = _this$props3.onInitialItemChange,
          onMenuItemClick = _this$props3.onMenuItemClick,
          highlightFirstResult = _this$props3.highlightFirstResult,
          option = _this$props3.option,
          position = _this$props3.position,
          setItem = _this$props3.setItem,
          props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props3, ["activeIndex", "id", "isOnlyResult", "label", "onActiveItemChange", "onInitialItemChange", "onMenuItemClick", "highlightFirstResult", "option", "position", "setItem"]);
      var active = isOnlyResult || activeIndex === position || (0, _utils.getFirstResult)(this.props); // Update the item's position in the item stack.

      setItem(option, position);
      return /*#__PURE__*/_react["default"].createElement(Component, (0, _extends2["default"])({}, props, {
        active: active,
        "aria-label": label,
        "aria-selected": active,
        id: (0, _utils.getMenuItemId)(id, position),
        onClick: this._handleClick,
        onMouseDown: _utils.preventInputBlur,
        ref: this.itemRef,
        role: "option"
      }));
    };

    return WrappedMenuItem;
  }(_react["default"].Component);

  (0, _defineProperty2["default"])(WrappedMenuItem, "displayName", "menuItemContainer(" + (0, _utils.getDisplayName)(Component) + ")");
  (0, _defineProperty2["default"])(WrappedMenuItem, "propTypes", propTypes);
  return (0, _Context.withContext)(WrappedMenuItem, ['activeIndex', 'id', 'isOnlyResult', 'items', 'onActiveItemChange', 'onInitialItemChange', 'onMenuItemClick', 'highlightFirstResult', 'setItem']);
};

var _default = menuItemContainer;
exports["default"] = _default;