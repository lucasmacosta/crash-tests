'use strict';

module.exports = function() {
  describe('Search by GET', require('./get-search'));
  describe('Search by POST', require('./post-search'));
};
