'use strict';

let _ = require('lodash');
let request = require('request-promise');

let config = require('../config');
let logger = require('../util/logger');

let requestJson = request.defaults({json: true});

class NHTSAService {

  searchVehicle(params) {
    logger.info('[NHTSAService] Searching vehicles with params', params);
    return requestJson.get(`${config.nhtsa.url}/SafetyRatings/modelyear/${params.modelYear}/make/${params.manufacturer}/model/${params.model}`, {
      qs: { format: 'json' }
    });
  }

  getRanking(vehicleId) {
    logger.info('[NHTSAService] Searching vehicle rating with vehicleId', vehicleId);
    return requestJson.get(`${config.nhtsa.url}/SafetyRatings/VehicleId/${vehicleId}`, {
      qs: { format: 'json' }
    });
  }
}

module.exports = new NHTSAService();
