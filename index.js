'use strict';

require("dotenv").config({silent: true});

var express = require('express');
let bodyParser = require('body-parser');

let config = require('./config');
let logger = require('./util/logger');

let app = express();

app.set('x-powered-by', false);

// Set required third party middlewares
app.use(bodyParser.json());

// Include routes
require('./routes')(app);

// If no route handled the request then this one will be used
app.use(require('./middlewares/notFound'));

// Error handlers are special cases of middlewares
app.use(require('./middlewares/errorResponse'));

// Start express server
app.listen(config.api.port, function () {
  logger.info('Started Crash Tests API server on port ' + config.api.port);
});
