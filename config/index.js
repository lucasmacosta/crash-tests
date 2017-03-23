'use strict';

let path = require('path');

const config = {
  env: process.env.NODE_ENV || 'development',

  api: {
      port: process.env.API_PORT || 8888
  },

  logger: {
    file: process.env.LOGGER_FILE || path.join(__dirname, '../logs/all.log'),
    consoleLevel: process.env.LOGGER_CONSOLE_LEVEL || 'info',
    silent: process.env.LOGGER_SILENT === 'true' || false
  },

  nhtsa: {
    url: process.env.NHTSA_URL || 'https://one.nhtsa.gov/webapi/api'
  }
};

module.exports = config;
