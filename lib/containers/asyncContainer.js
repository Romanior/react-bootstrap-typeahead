"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _Typeahead = _interopRequireDefault(require("../core/Typeahead"));

var _propTypes2 = require("../propTypes");

var _utils = require("../utils");

var propTypes = {
  /**
   * Delay, in milliseconds, before performing search.
   */
  delay: _propTypes["default"].number,

  /**
   * Whether or not a request is currently pending. Necessary for the
   * container to know when new results are available.
   */
  isLoading: _propTypes["default"].bool.isRequired,

  /**
   * Number of input characters that must be entered before showing results.
   */
  minLength: _propTypes["default"].number,

  /**
   * Callback to perform when the search is executed.
   */
  onSearch: _propTypes["default"].func.isRequired,

  /**
   * Options to be passed to the typeahead. Will typically be the query
   * results, but can also be initial default options.
   */
  options: _propTypes["default"].arrayOf(_propTypes2.optionType),

  /**
   * Message displayed in the menu when there is no user input.
   */
  promptText: _propTypes["default"].node,

  /**
   * Message displayed in the menu while the request is pending.
   */
  searchText: _propTypes["default"].node,

  /**
   * Whether or not the component should cache query results.
   */
  useCache: _propTypes["default"].bool
};
var defaultProps = {
  delay: 200,
  minLength: 2,
  options: [],
  promptText: 'Type to search...',
  searchText: 'Searching...',
  useCache: true
};

/**
 * HoC that encapsulates common behavior and functionality for doing
 * asynchronous searches, including:
 *
 *  - Debouncing user input
 *  - Optional query caching
 *  - Search prompt and empty results behaviors
 */
var asyncContainer = function asyncContainer(TypeaheadComponent) {
  var AsyncTypeahead = /*#__PURE__*/function (_React$Component) {
    (0, _inheritsLoose2["default"])(AsyncTypeahead, _React$Component);

    function AsyncTypeahead() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_cache", {});
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleSearchDebounced", void 0);
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_query", _this.props.defaultInputValue || '');
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getEmptyLabel", function () {
        var _this$props = _this.props,
            emptyLabel = _this$props.emptyLabel,
            isLoading = _this$props.isLoading,
            promptText = _this$props.promptText,
            searchText = _this$props.searchText;

        if (!_this._query.length) {
          return promptText;
        }

        if (isLoading) {
          return searchText;
        }

        return emptyLabel;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleInputChange", function (query, e) {
        _this.props.onInputChange && _this.props.onInputChange(query, e);

        _this._handleSearchDebounced(query);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleSearch", function (query) {
        _this._query = query;
        var _this$props2 = _this.props,
            minLength = _this$props2.minLength,
            onSearch = _this$props2.onSearch,
            useCache = _this$props2.useCache;

        if (!query || minLength && query.length < minLength) {
          return;
        } // Use cached results, if applicable.


        if (useCache && _this._cache[query]) {
          // Re-render the component with the cached results.
          _this.forceUpdate();

          return;
        } // Perform the search.


        onSearch(query);
      });
      return _this;
    }

    var _proto = AsyncTypeahead.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this._handleSearchDebounced = (0, _lodash["default"])(this._handleSearch, this.props.delay);
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      var _this$props3 = this.props,
          isLoading = _this$props3.isLoading,
          options = _this$props3.options,
          useCache = _this$props3.useCache; // Ensure that we've gone from a loading to a completed state. Otherwise
      // an empty response could get cached if the component updates during the
      // request (eg: if the parent re-renders for some reason).

      if (!isLoading && prevProps.isLoading && useCache) {
        this._cache[this._query] = options;
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this._cache = {};
      this._query = '';
      this._handleSearchDebounced && this._handleSearchDebounced.cancel();
    };

    _proto.render = function render() {
      var _this$props4 = this.props,
          allowNew = _this$props4.allowNew,
          instanceRef = _this$props4.instanceRef,
          isLoading = _this$props4.isLoading,
          options = _this$props4.options,
          useCache = _this$props4.useCache,
          props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props4, ["allowNew", "instanceRef", "isLoading", "options", "useCache"]);
      var cachedQuery = this._cache[this._query];
      return /*#__PURE__*/_react["default"].createElement(TypeaheadComponent, (0, _extends2["default"])({}, props, {
        allowNew: // Disable custom selections during a search unless
        // `allowNew` is a function.
        (0, _utils.isFunction)(allowNew) ? allowNew : allowNew && !isLoading,
        emptyLabel: this._getEmptyLabel(),
        isLoading: isLoading,
        onInputChange: this._handleInputChange,
        options: useCache && cachedQuery ? cachedQuery : options,
        ref: instanceRef
      }));
    };

    return AsyncTypeahead;
  }(_react["default"].Component);

  (0, _defineProperty2["default"])(AsyncTypeahead, "displayName", "asyncContainer(" + (0, _utils.getDisplayName)(_Typeahead["default"]) + ")");
  (0, _defineProperty2["default"])(AsyncTypeahead, "propTypes", propTypes);
  (0, _defineProperty2["default"])(AsyncTypeahead, "defaultProps", defaultProps);
  return /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react["default"].createElement(AsyncTypeahead, (0, _extends2["default"])({}, props, {
      instanceRef: ref
    }));
  });
};

var _default = asyncContainer;
exports["default"] = _default;