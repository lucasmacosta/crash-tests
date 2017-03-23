'use strict';

let Joi = require('joi');
let Promise = require('bluebird');

var validate = Promise.promisify(Joi.validate);

module.exports = validate;
