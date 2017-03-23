'use strict';

let vehiclesService = require('../services/vehicles');

class VehiclesController {

  post(req, res, next) {
    var query = req.query,
        body = req.body;

    vehiclesService.search(body, query).then(function(response) {
      res.json(response);
    });
  };

  get(req, res, next) {
    var query = req.query,
        params = req.params;

    vehiclesService.search(params, query).then(function(response) {
      res.json(response);
    });
  };

};

module.exports = new VehiclesController();
