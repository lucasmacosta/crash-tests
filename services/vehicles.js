'use strict';

let Joi = require('joi');
let _ = require('lodash');
let Promise = require('bluebird');

let config = require('../config');
let logger = require('../util/logger');
let validate = require('../util/validate');

let nhtsaService = require('./nhtsa');

let paramsSchema = Joi.object().keys({
  modelYear: Joi.number().required(),
  manufacturer: Joi.string().required(),
  model: Joi.string().required()
});

let querySchema = Joi.object().keys({
  withRating: Joi.string()
});

let mapResults = function(vehicles, ratings = []) {
  let vehicleRatings = _.keyBy(_.map(ratings, rating => {
    return _.pick(rating.Results[0], ['OverallRating', 'VehicleId']);
  }), 'VehicleId');

  return {
    Count: vehicles.Count,
    Results: _.map(vehicles.Results, (vehicle) => {
      return {
        Description: vehicle.VehicleDescription,
        VehicleId: vehicle.VehicleId,
        CrashRating: vehicleRatings[vehicle.VehicleId] && vehicleRatings[vehicle.VehicleId].OverallRating 
      }
    })
  };
};

let getRatings = function(query, vehicles) {
  return validate(query, querySchema).then(function (validQuery) {
    if (validQuery.withRating === 'true') {
      let vehicleIds = _.map(vehicles.Results, 'VehicleId');
      return Promise.map(vehicleIds, (vehicleId) => {
        return nhtsaService.getRanking(vehicleId); 
      });
    }
    return Promise.resolve([]);
  });
};

class VehiclesService {

  search(params, query) {
    let vehicles;

    return validate(params, paramsSchema).then(function (validParams) {
      return nhtsaService.searchVehicle(validParams);
    }).then(function (nhtsaResponse) {
      vehicles = nhtsaResponse;
      return getRatings(query, vehicles);
    }).then(function (nhtsaRatings) {
      return mapResults(vehicles, nhtsaRatings);
    }).catch(function (e) {
      if (e.name === 'StatusCodeError') {
        logger.warn('[VehiclesService] Error when calling NHTSA API', e);
      } else if (e.name === 'ValidationError') {
        logger.warn('[VehiclesService] Invalid params received', e.annotate());
      }
      return mapResults({ Count: 0, Results: [] });
    });

  }
}

module.exports = new VehiclesService();
