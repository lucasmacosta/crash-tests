'use strict';

var express = require('express');

var config = require('../config');

var vehiclesController = require('../controllers/vehicles');

module.exports = function (app) {
  var vehiclesRouter = express.Router();

  // GET vehicles
  vehiclesRouter.get('/:modelYear/:manufacturer/:model', vehiclesController.get);
  // POST vehicles
  vehiclesRouter.post('/', vehiclesController.post);

  app.use('/vehicles', vehiclesRouter);
};
