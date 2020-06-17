"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInitialState = getInitialState;
exports.clearTypeahead = clearTypeahead;
exports.hideMenu = hideMenu;
exports.toggleMenu = toggleMenu;
exports["default"] = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _TypeaheadManager = _interopRequireDefault(require("./TypeaheadManager"));

var _propTypes2 = require("../propTypes");

var _utils = require("../utils");

var _constants = require("../constants");

var propTypes = {
  /**
   * Allows the creation of new selections on the fly. Note that any new items
   * will be added to the list of selections, but not the list of original
   * options unless handled as such by `Typeahead`'s parent.
   *
   * If a function is specified, it will be used to determine whether a custom
   * option should be included. The return value should be true or false.
   */
  allowNew: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].func]),

  /**
   * Autofocus the input when the component initially mounts.
   */
  autoFocus: _propTypes["default"].bool,

  /**
   * Whether or not filtering should be case-sensitive.
   */
  caseSensitive: (0, _propTypes2.checkPropType)(_propTypes["default"].bool, _propTypes2.caseSensitiveType),

  /**
   * The initial value displayed in the text input.
   */
  defaultInputValue: (0, _propTypes2.checkPropType)(_propTypes["default"].string, _propTypes2.defaultInputValueType),

  /**
   * Whether or not the menu is displayed upon initial render.
   */
  defaultOpen: _propTypes["default"].bool,

  /**
   * Specify any pre-selected options. Use only if you want the component to
   * be uncontrolled.
   */
  defaultSelected: _propTypes["default"].arrayOf(_propTypes2.optionType),

  /**
   * Either an array of fields in `option` to search, or a custom filtering
   * callback.
   */
  filterBy: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string.isRequired), _propTypes["default"].func]),
  highlightFirstResult: (0, _propTypes2.checkPropType)(_propTypes["default"].bool),

  /**
   * Highlights the menu item if there is only one result and allows selecting
   * that item by hitting enter. Does not work with `allowNew`.
   */
  highlightOnlyResult: (0, _propTypes2.checkPropType)(_propTypes["default"].bool, _propTypes2.highlightOnlyResultType),

  /**
   * An html id attribute, required for assistive technologies such as screen
   * readers.
   */
  id: (0, _propTypes2.checkPropType)(_propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]), _propTypes2.isRequiredForA11y),

  /**
   * Whether the filter should ignore accents and other diacritical marks.
   */
  ignoreDiacritics: (0, _propTypes2.checkPropType)(_propTypes["default"].bool, _propTypes2.ignoreDiacriticsType),

  /**
   * Specify the option key to use for display or a function returning the
   * display string. By default, the selector will use the `label` key.
   */
  labelKey: (0, _propTypes2.checkPropType)(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]), _propTypes2.labelKeyType),

  /**
   * Maximum number of results to display by default. Mostly done for
   * performance reasons so as not to render too many DOM nodes in the case of
   * large data sets.
   */
  maxResults: _propTypes["default"].number,

  /**
   * Number of input characters that must be entered before showing results.
   */
  minLength: _propTypes["default"].number,

  /**
   * Whether or not multiple selections are allowed.
   */
  multiple: _propTypes["default"].bool,

  /**
   * Invoked when the input is blurred. Receives an event.
   */
  onBlur: _propTypes["default"].func,

  /**
   * Invoked whenever items are added or removed. Receives an array of the
   * selected options.
   */
  onChange: _propTypes["default"].func,

  /**
   * Invoked when the input is focused. Receives an event.
   */
  onFocus: _propTypes["default"].func,

  /**
   * Invoked when the input value changes. Receives the string value of the
   * input.
   */
  onInputChange: _propTypes["default"].func,

  /**
   * Invoked when a key is pressed. Receives an event.
   */
  onKeyDown: _propTypes["default"].func,

  /**
   * Invoked when menu visibility changes.
   */
  onMenuToggle: _propTypes["default"].func,

  /**
   * Invoked when the pagination menu item is clicked. Receives an event.
   */
  onPaginate: _propTypes["default"].func,

  /**
   * Whether or not the menu should be displayed. `undefined` allows the
   * component to control visibility, while `true` and `false` show and hide
   * the menu, respectively.
   */
  open: _propTypes["default"].bool,

  /**
   * Full set of options, including pre-selected options. Must either be an
   * array of objects (recommended) or strings.
   */
  options: _propTypes["default"].arrayOf(_propTypes2.optionType).isRequired,

  /**
   * Give user the ability to display additional results if the number of
   * results exceeds `maxResults`.
   */
  paginate: _propTypes["default"].bool,

  /**
   * The selected option(s) displayed in the input. Use this prop if you want
   * to control the component via its parent.
   */
  selected: (0, _propTypes2.checkPropType)(_propTypes["default"].arrayOf(_propTypes2.optionType), _propTypes2.selectedType),

  /**
   * Allows selecting the hinted result by pressing enter.
   */
  selectHintOnEnter: _propTypes["default"].bool
};
var defaultProps = {
  allowNew: false,
  autoFocus: false,
  caseSensitive: false,
  defaultInputValue: '',
  defaultOpen: false,
  defaultSelected: [],
  filterBy: [],
  highlightFirstResult: false,
  highlightOnlyResult: false,
  ignoreDiacritics: true,
  labelKey: _constants.DEFAULT_LABELKEY,
  maxResults: 100,
  minLength: 0,
  multiple: false,
  onBlur: _utils.noop,
  onFocus: _utils.noop,
  onInputChange: _utils.noop,
  onKeyDown: _utils.noop,
  onMenuToggle: _utils.noop,
  onPaginate: _utils.noop,
  paginate: true,
  selectHintOnEnter: false
};

function getInitialState(props) {
  var defaultInputValue = props.defaultInputValue,
      defaultOpen = props.defaultOpen,
      defaultSelected = props.defaultSelected,
      maxResults = props.maxResults,
      multiple = props.multiple;
  var selected = props.selected ? props.selected.slice() : defaultSelected.slice();
  var text = defaultInputValue;

  if (!multiple && selected.length) {
    // Set the text if an initial selection is passed in.
    text = (0, _utils.getOptionLabel)((0, _utils.head)(selected), props.labelKey);

    if (selected.length > 1) {
      // Limit to 1 selection in single-select mode.
      selected = selected.slice(0, 1);
    }
  }

  return {
    activeIndex: -1,
    activeItem: null,
    initialItem: null,
    isFocused: false,
    selected: selected,
    showMenu: defaultOpen,
    shownResults: maxResults,
    text: text
  };
}

function clearTypeahead(state, props) {
  return (0, _extends2["default"])({}, getInitialState(props), {
    isFocused: state.isFocused,
    selected: [],
    text: ''
  });
}

function hideMenu(state, props) {
  var _getInitialState = getInitialState(props),
      activeIndex = _getInitialState.activeIndex,
      activeItem = _getInitialState.activeItem,
      initialItem = _getInitialState.initialItem,
      shownResults = _getInitialState.shownResults;

  return {
    activeIndex: activeIndex,
    activeItem: activeItem,
    initialItem: initialItem,
    showMenu: false,
    shownResults: shownResults
  };
}

function toggleMenu(state, props) {
  return state.showMenu ? hideMenu(state, props) : {
    showMenu: true
  };
}

var Typeahead = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(Typeahead, _React$Component);

  function Typeahead() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", getInitialState(_this.props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "inputNode", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "isMenuShown", false);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "items", []);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "blur", function () {
      _this.inputNode && _this.inputNode.blur();

      _this.hideMenu();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "clear", function () {
      _this.setState(clearTypeahead);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "focus", function () {
      _this.inputNode && _this.inputNode.focus();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getInput", function () {
      return _this.inputNode;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getInstance", function () {
      (0, _utils.warn)(false, 'The `getInstance` method is deprecated. You can now access instance ' + 'methods directly on the ref.');
      return (0, _assertThisInitialized2["default"])(_this);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "inputRef", function (inputNode) {
      _this.inputNode = inputNode;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "setItem", function (item, position) {
      _this.items[position] = item;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "hideMenu", function () {
      _this.setState(hideMenu);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "toggleMenu", function () {
      _this.setState(toggleMenu);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleActiveIndexChange", function (activeIndex) {
      _this.setState(function (state) {
        return {
          activeIndex: activeIndex,
          activeItem: activeIndex === -1 ? null : state.activeItem
        };
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleActiveItemChange", function (activeItem) {
      // Don't update the active item if it hasn't changed.
      if (!(0, _fastDeepEqual["default"])(activeItem, _this.state.activeItem)) {
        _this.setState({
          activeItem: activeItem
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleBlur", function (e) {
      e.persist();

      _this.setState({
        isFocused: false
      }, function () {
        return _this.props.onBlur(e);
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleChange", function (selected) {
      _this.props.onChange && _this.props.onChange(selected);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleClear", function () {
      _this.setState(clearTypeahead, function () {
        return _this._handleChange([]);
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleFocus", function (e) {
      e.persist();

      _this.setState({
        isFocused: true,
        showMenu: true
      }, function () {
        return _this.props.onFocus(e);
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleInitialItemChange", function (initialItem) {
      // Don't update the initial item if it hasn't changed.
      if (!(0, _fastDeepEqual["default"])(initialItem, _this.state.initialItem)) {
        _this.setState({
          initialItem: initialItem
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleInputChange", function (e) {
      e.persist();
      var text = e.currentTarget.value;
      var _this$props = _this.props,
          multiple = _this$props.multiple,
          onInputChange = _this$props.onInputChange; // Clear selections when the input value changes in single-select mode.

      var shouldClearSelections = _this.state.selected.length && !multiple;

      _this.setState(function (state, props) {
        var _getInitialState2 = getInitialState(props),
            activeIndex = _getInitialState2.activeIndex,
            activeItem = _getInitialState2.activeItem,
            shownResults = _getInitialState2.shownResults;

        return {
          activeIndex: activeIndex,
          activeItem: activeItem,
          selected: shouldClearSelections ? [] : state.selected,
          showMenu: true,
          shownResults: shownResults,
          text: text
        };
      }, function () {
        onInputChange(text, e);
        shouldClearSelections && _this._handleChange([]);
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleKeyDown", function (e) {
      var activeItem = _this.state.activeItem; // Skip most actions when the menu is hidden.

      if (!_this.isMenuShown) {
        if (e.keyCode === _constants.UP || e.keyCode === _constants.DOWN) {
          _this.setState({
            showMenu: true
          });
        }

        _this.props.onKeyDown(e);

        return;
      }

      switch (e.keyCode) {
        case _constants.UP:
        case _constants.DOWN:
          // Prevent input cursor from going to the beginning when pressing up.
          e.preventDefault();

          _this._handleActiveIndexChange((0, _utils.getUpdatedActiveIndex)(_this.state.activeIndex, e.keyCode, _this.items, _this.props.highlightFirstResult));

          break;

        case _constants.RETURN:
          // Prevent form submission while menu is open.
          e.preventDefault();
          activeItem && _this._handleMenuItemSelect(activeItem, e);
          break;

        case _constants.ESC:
        case _constants.TAB:
          // ESC simply hides the menu. TAB will blur the input and move focus to
          // the next item; hide the menu so it doesn't gain focus.
          _this.hideMenu();

          break;

        default:
          break;
      }

      _this.props.onKeyDown(e);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleMenuItemSelect", function (option, e) {
      if (option.paginationOption) {
        _this._handlePaginate(e);
      } else {
        _this._handleSelectionAdd(option);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handlePaginate", function (e) {
      e.persist();

      _this.setState(function (state, props) {
        return {
          shownResults: state.shownResults + props.maxResults
        };
      }, function () {
        return _this.props.onPaginate(e, _this.state.shownResults);
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleSelectionAdd", function (option) {
      var _this$props2 = _this.props,
          multiple = _this$props2.multiple,
          labelKey = _this$props2.labelKey;
      var selected;
      var selection = option;
      var text;

      if (!selection) {
        return;
      } // Add a unique id to the custom selection. Avoid doing this in `render` so
      // the id doesn't increment every time.


      if (!(0, _utils.isString)(selection) && selection.customOption) {
        selection = (0, _extends2["default"])({}, selection, {
          id: (0, _utils.uniqueId)('new-id-')
        });
      }

      if (multiple) {
        // If multiple selections are allowed, add the new selection to the
        // existing selections.
        selected = _this.state.selected.concat(selection);
        text = '';
      } else {
        // If only a single selection is allowed, replace the existing selection
        // with the new one.
        selected = [selection];
        text = (0, _utils.getOptionLabel)(selection, labelKey);
      }

      _this.setState(function (state, props) {
        return (0, _extends2["default"])({}, hideMenu(state, props), {
          initialItem: selection,
          selected: selected,
          text: text
        });
      }, function () {
        return _this._handleChange(selected);
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleSelectionRemove", function (selection) {
      var selected = _this.state.selected.filter(function (option) {
        return !(0, _fastDeepEqual["default"])(option, selection);
      }); // Make sure the input stays focused after the item is removed.


      _this.focus();

      _this.setState(function (state, props) {
        return (0, _extends2["default"])({}, hideMenu(state, props), {
          selected: selected
        });
      }, function () {
        return _this._handleChange(selected);
      });
    });
    return _this;
  }

  var _proto = Typeahead.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.props.autoFocus && this.focus();
  }
  /* eslint-disable-next-line camelcase */
  ;

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    var labelKey = nextProps.labelKey,
        multiple = nextProps.multiple,
        selected = nextProps.selected;
    (0, _utils.validateSelectedPropChange)(selected, this.props.selected);

    if (multiple !== this.props.multiple) {
      this.setState({
        text: ''
      });
    } // If new selections are passed via props, treat as a controlled input.


    if (selected && !(0, _fastDeepEqual["default"])(selected, this.state.selected)) {
      this.setState({
        selected: selected
      });

      if (multiple) {
        return;
      }

      this.setState({
        text: selected.length ? (0, _utils.getOptionLabel)((0, _utils.head)(selected), labelKey) : ''
      });
    } // Truncate selections when in single-select mode.


    var newSelected = selected || this.state.selected;

    if (!multiple && newSelected.length > 1) {
      newSelected = newSelected.slice(0, 1);
      this.setState({
        selected: newSelected,
        text: (0, _utils.getOptionLabel)((0, _utils.head)(newSelected), labelKey)
      });
    }
  };

  _proto.render = function render() {
    // Omit `onChange` so Flow doesn't complain.
    var _this$props3 = this.props,
        onChange = _this$props3.onChange,
        otherProps = (0, _objectWithoutPropertiesLoose2["default"])(_this$props3, ["onChange"]);
    var mergedPropsAndState = (0, _extends2["default"])({}, otherProps, this.state);
    var filterBy = mergedPropsAndState.filterBy,
        labelKey = mergedPropsAndState.labelKey,
        options = mergedPropsAndState.options,
        paginate = mergedPropsAndState.paginate,
        shownResults = mergedPropsAndState.shownResults,
        text = mergedPropsAndState.text;
    this.isMenuShown = (0, _utils.isShown)(mergedPropsAndState);
    this.items = []; // Reset items on re-render.

    var results = [];

    if (this.isMenuShown) {
      var cb = typeof filterBy === 'function' ? filterBy : _utils.defaultFilterBy;
      results = options.filter(function (option) {
        return cb(option, mergedPropsAndState);
      }); // This must come before results are truncated.

      var shouldPaginate = paginate && results.length > shownResults; // Truncate results if necessary.

      results = (0, _utils.getTruncatedOptions)(results, shownResults); // Add the custom option if necessary.

      if ((0, _utils.addCustomOption)(results, mergedPropsAndState)) {
        var _results$push;

        results.push((_results$push = {
          customOption: true
        }, _results$push[(0, _utils.getStringLabelKey)(labelKey)] = text, _results$push));
      } // Add the pagination item if necessary.


      if (shouldPaginate) {
        var _results$push2;

        results.push((_results$push2 = {}, _results$push2[(0, _utils.getStringLabelKey)(labelKey)] = '', _results$push2.paginationOption = true, _results$push2));
      }
    }

    return /*#__PURE__*/_react["default"].createElement(_TypeaheadManager["default"], (0, _extends2["default"])({}, mergedPropsAndState, {
      hideMenu: this.hideMenu,
      inputNode: this.inputNode,
      inputRef: this.inputRef,
      isMenuShown: this.isMenuShown,
      onActiveItemChange: this._handleActiveItemChange,
      onAdd: this._handleSelectionAdd,
      onBlur: this._handleBlur,
      onChange: this._handleInputChange,
      onClear: this._handleClear,
      onFocus: this._handleFocus,
      onHide: this.hideMenu,
      onInitialItemChange: this._handleInitialItemChange,
      onKeyDown: this._handleKeyDown,
      onMenuItemClick: this._handleMenuItemSelect,
      onRemove: this._handleSelectionRemove,
      results: results,
      setItem: this.setItem,
      toggleMenu: this.toggleMenu
    }));
  };

  return Typeahead;
}(_react["default"].Component);

(0, _defineProperty2["default"])(Typeahead, "propTypes", propTypes);
(0, _defineProperty2["default"])(Typeahead, "defaultProps", defaultProps);
var _default = Typeahead;
exports["default"] = _default;