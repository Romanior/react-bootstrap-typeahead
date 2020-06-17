"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _RootCloseWrapper = _interopRequireDefault(require("react-overlays/RootCloseWrapper"));

var _Overlay = _interopRequireDefault(require("../core/Overlay"));

var _Typeahead = _interopRequireDefault(require("../core/Typeahead"));

var _ClearButton = _interopRequireDefault(require("./ClearButton.react"));

var _Loader = _interopRequireDefault(require("./Loader.react"));

var _Token = _interopRequireDefault(require("./Token.react"));

var _TypeaheadInputMulti = _interopRequireDefault(require("./TypeaheadInputMulti.react"));

var _TypeaheadInputSingle = _interopRequireDefault(require("./TypeaheadInputSingle.react"));

var _TypeaheadMenu = _interopRequireDefault(require("./TypeaheadMenu.react"));

var _utils = require("../utils");

var _propTypes2 = require("../propTypes");

var propTypes = {
  /**
   * Specifies the size of the input.
   */
  bsSize: (0, _propTypes2.deprecated)(_propTypes2.sizeType, 'Use the `size` prop instead.'),

  /**
   * Displays a button to clear the input when there are selections.
   */
  clearButton: _propTypes["default"].bool,

  /**
   * Props to be applied directly to the input. `onBlur`, `onChange`,
   * `onFocus`, and `onKeyDown` are ignored.
   */
  inputProps: (0, _propTypes2.checkPropType)(_propTypes["default"].object, _propTypes2.inputPropsType),

  /**
   * Bootstrap 4 only. Adds the `is-invalid` classname to the `form-control`.
   */
  isInvalid: _propTypes["default"].bool,

  /**
   * Indicate whether an asynchronous data fetch is happening.
   */
  isLoading: _propTypes["default"].bool,

  /**
   * Bootstrap 4 only. Adds the `is-valid` classname to the `form-control`.
   */
  isValid: _propTypes["default"].bool,

  /**
   * Callback for custom input rendering.
   */
  renderInput: _propTypes["default"].func,

  /**
   * Callback for custom menu rendering.
   */
  renderMenu: _propTypes["default"].func,

  /**
   * Callback for custom menu rendering.
   */
  renderToken: _propTypes["default"].func,

  /**
   * Specifies the size of the input.
   */
  size: _propTypes2.sizeType
};
var defaultProps = {
  clearButton: false,
  inputProps: {},
  isInvalid: false,
  isLoading: false,
  isValid: false,
  renderMenu: function renderMenu(results, menuProps, props) {
    return /*#__PURE__*/_react["default"].createElement(_TypeaheadMenu["default"], (0, _extends2["default"])({}, menuProps, {
      labelKey: props.labelKey,
      options: results,
      text: props.text
    }));
  },
  renderToken: function renderToken(option, props, idx) {
    return /*#__PURE__*/_react["default"].createElement(_Token["default"], {
      disabled: props.disabled,
      key: idx,
      onRemove: props.onRemove,
      option: option,
      tabIndex: props.tabIndex
    }, (0, _utils.getOptionLabel)(option, props.labelKey));
  }
};

function getOverlayProps(props) {
  return (0, _utils.pick)(props, ['align', 'dropup', 'flip', 'positionFixed']);
}

var TypeaheadComponent = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(TypeaheadComponent, _React$Component);

  function TypeaheadComponent() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_referenceElement", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "referenceElementRef", function (element) {
      // Use `findDOMNode` here because it's easier and less fragile than
      // forwarding refs to the input's container.

      /* eslint-disable react/no-find-dom-node */
      // $FlowFixMe: `findDOMNode` could return Text or an Element.
      _this._referenceElement = (0, _reactDom.findDOMNode)(element);
      /* eslint-enable react/no-find-dom-node */
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderInput", function (inputProps, props) {
      var _this$props = _this.props,
          bsSize = _this$props.bsSize,
          isInvalid = _this$props.isInvalid,
          isValid = _this$props.isValid,
          multiple = _this$props.multiple,
          renderInput = _this$props.renderInput,
          renderToken = _this$props.renderToken,
          size = _this$props.size;

      if ((0, _utils.isFunction)(renderInput)) {
        return renderInput(inputProps, props);
      }

      var commonProps = (0, _extends2["default"])({}, inputProps, {
        isInvalid: isInvalid,
        isValid: isValid,
        size: bsSize || size
      });

      if (!multiple) {
        return /*#__PURE__*/_react["default"].createElement(_TypeaheadInputSingle["default"], commonProps);
      }

      var labelKey = props.labelKey,
          onRemove = props.onRemove,
          selected = props.selected;
      return /*#__PURE__*/_react["default"].createElement(_TypeaheadInputMulti["default"], (0, _extends2["default"])({}, commonProps, {
        selected: selected
      }), selected.map(function (option, idx) {
        return renderToken(option, (0, _extends2["default"])({}, commonProps, {
          labelKey: labelKey,
          onRemove: onRemove
        }), idx);
      }));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderMenu", function (results, menuProps, props) {
      var _this$props2 = _this.props,
          emptyLabel = _this$props2.emptyLabel,
          id = _this$props2.id,
          maxHeight = _this$props2.maxHeight,
          newSelectionPrefix = _this$props2.newSelectionPrefix,
          paginationText = _this$props2.paginationText,
          renderMenu = _this$props2.renderMenu,
          renderMenuItemChildren = _this$props2.renderMenuItemChildren;
      return renderMenu(results, (0, _extends2["default"])({}, menuProps, {
        emptyLabel: emptyLabel,
        id: id,
        maxHeight: maxHeight,
        newSelectionPrefix: newSelectionPrefix,
        paginationText: paginationText,
        renderMenuItemChildren: renderMenuItemChildren
      }), props);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderAux", function (_ref) {
      var onClear = _ref.onClear,
          selected = _ref.selected;
      var _this$props3 = _this.props,
          bsSize = _this$props3.bsSize,
          clearButton = _this$props3.clearButton,
          disabled = _this$props3.disabled,
          isLoading = _this$props3.isLoading,
          size = _this$props3.size;
      var content;

      if (isLoading) {
        content = /*#__PURE__*/_react["default"].createElement(_Loader["default"], {
          size: bsSize || size
        });
      } else if (clearButton && !disabled && selected.length) {
        content = /*#__PURE__*/_react["default"].createElement(_ClearButton["default"], {
          size: bsSize || size,
          onClick: onClear,
          onFocus: function onFocus(e) {
            // Prevent the main input from auto-focusing again.
            e.stopPropagation();
          },
          onMouseDown: _utils.preventInputBlur
        });
      }

      return content ? /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])('rbt-aux', {
          'rbt-aux-lg': (0, _utils.isSizeLarge)(bsSize)
        })
      }, content) : null;
    });
    return _this;
  }

  var _proto = TypeaheadComponent.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props4 = this.props,
        children = _this$props4.children,
        className = _this$props4.className,
        instanceRef = _this$props4.instanceRef,
        open = _this$props4.open,
        options = _this$props4.options,
        style = _this$props4.style;
    return /*#__PURE__*/_react["default"].createElement(_Typeahead["default"], (0, _extends2["default"])({}, this.props, {
      options: options,
      ref: instanceRef
    }), function (_ref2) {
      var getInputProps = _ref2.getInputProps,
          props = (0, _objectWithoutPropertiesLoose2["default"])(_ref2, ["getInputProps"]);
      var hideMenu = props.hideMenu,
          isMenuShown = props.isMenuShown,
          results = props.results;

      var auxContent = _this2._renderAux(props);

      return /*#__PURE__*/_react["default"].createElement(_RootCloseWrapper["default"], {
        disabled: open || !isMenuShown,
        onRootClose: hideMenu
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])('rbt', {
          'has-aux': !!auxContent
        }, className),
        style: (0, _extends2["default"])({}, style, {
          outline: 'none',
          position: 'relative'
        }),
        tabIndex: -1
      }, _this2._renderInput((0, _extends2["default"])({}, getInputProps(_this2.props.inputProps), {
        ref: _this2.referenceElementRef
      }), props), /*#__PURE__*/_react["default"].createElement(_Overlay["default"], (0, _extends2["default"])({}, getOverlayProps(_this2.props), {
        isMenuShown: isMenuShown,
        referenceElement: _this2._referenceElement
      }), function (menuProps) {
        return _this2._renderMenu(results, menuProps, props);
      }), auxContent, (0, _utils.isFunction)(children) ? children(props) : children));
    });
  };

  return TypeaheadComponent;
}(_react["default"].Component);

(0, _defineProperty2["default"])(TypeaheadComponent, "propTypes", propTypes);
(0, _defineProperty2["default"])(TypeaheadComponent, "defaultProps", defaultProps);

var _default = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  return /*#__PURE__*/_react["default"].createElement(TypeaheadComponent, (0, _extends2["default"])({}, props, {
    instanceRef: ref
  }));
});

exports["default"] = _default;