"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeStringRegexp = escapeStringRegexp;
exports["default"] = getMatchBounds;

var _invariant = _interopRequireDefault(require("invariant"));

var _stripDiacritics = _interopRequireDefault(require("./stripDiacritics"));

var CASE_INSENSITIVE = 'i';
var COMBINING_MARKS = /[\u0300-\u036F]/;

// Export for testing.
function escapeStringRegexp(str) {
  !(typeof str === 'string') ? process.env.NODE_ENV !== "production" ? (0, _invariant["default"])(false, '`escapeStringRegexp` expected a string.') : invariant(false) : void 0; // Escape characters with special meaning either inside or outside character
  // sets. Use a simple backslash escape when it’s always valid, and a \unnnn
  // escape when the simpler form would be disallowed by Unicode patterns’
  // stricter grammar.

  return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

function getMatchBounds(subject, str) {
  var search = new RegExp(escapeStringRegexp((0, _stripDiacritics["default"])(str)), CASE_INSENSITIVE);
  var matches = search.exec((0, _stripDiacritics["default"])(subject));

  if (!matches) {
    return null;
  }

  var start = matches.index;
  var matchLength = matches[0].length; // Account for combining marks, which changes the indices.

  if (COMBINING_MARKS.test(subject)) {
    // Starting at the beginning of the subject string, check for the number of
    // combining marks and increment the start index whenever one is found.
    for (var ii = 0; ii <= start; ii++) {
      if (COMBINING_MARKS.test(subject[ii])) {
        start += 1;
      }
    } // Similarly, increment the length of the match string if it contains a
    // combining mark.


    for (var _ii = start; _ii <= start + matchLength; _ii++) {
      if (COMBINING_MARKS.test(subject[_ii])) {
        matchLength += 1;
      }
    }
  }

  return {
    end: start + matchLength,
    start: start
  };
}