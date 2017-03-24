'use strict';

let should = require('should');
let request = require('request-promise');

var config = require('../../../config');

let requestJson = request.defaults({json: true});

module.exports = function() {
  describe('Vehicles only', function () {

    describe('Failure tests', function () {

      it('should fail if some url params are missing', function () {
        return requestJson.get('http://localhost:8889/vehicles/2015/Ford').then(() => {
          false.should.be.true();
        }).catch((e) => {
          e.statusCode.should.equal(404);
          e.response.body.message.should.equal('Route not found: /vehicles/2015/Ford');
        });
      });

    });

    describe('Success tests', function () {

      it('should return a list of vehicles when there are results', function () {
        return requestJson.get('http://localhost:8889/vehicles/2015/Audi/A3').then((result) => {
          result.Count.should.equal(4);
          result.Results.length.should.equal(4);
          result.Results.forEach((vehicle) => {
            vehicle.should.have.property('VehicleId');
            vehicle.should.have.property('Description');
            (vehicle.CrashRating === undefined).should.be.true();
          });
        });
      });

      it('should return an empty list of vehicles when there are no results', function () {
        return requestJson.get('http://localhost:8889/vehicles/2015/Ford/Crown Victoria').then((result) => {
          result.Count.should.equal(0);
          result.Results.length.should.equal(0);
        });
      });

      it('should return an empty list of vehicles when an url param is invalid', function () {
        return requestJson.get('http://localhost:8889/vehicles/dummy/Audi/A3').then((result) => {
          result.Count.should.equal(0);
          result.Results.length.should.equal(0);
        });
      });

    });

  });

  describe('Vehicles with ratings', function () {

    describe('Success tests', function () {

      it('should return a list of vehicles with their ratings when there are results', function () {
        return requestJson.get('http://localhost:8889/vehicles/2015/Audi/A3', {qs: {withRating: true}}).then((result) => {
          result.Count.should.equal(4);
          result.Results.length.should.equal(4);
          result.Results.forEach((vehicle) => {
            vehicle.should.have.property('VehicleId');
            vehicle.should.have.property('Description');
            vehicle.should.have.property('CrashRating');
          });
        });
      });

      it('should return an empty list of vehicles when there are no results', function () {
        return requestJson.get('http://localhost:8889/vehicles/2015/Ford/Crown Victoria', {qs: {withRating: true}}).then((result) => {
          result.Count.should.equal(0);
          result.Results.length.should.equal(0);
        });
      });

      it('should return an empty list of vehicles when a query param is invalid', function () {
        return requestJson.get('http://localhost:8889/vehicles/2015/Audi/A3', {qs: {invalid: true}}).then((result) => {
          result.Count.should.equal(0);
          result.Results.length.should.equal(0);
        });
      });

      it('should return a list of vehicles without their ratings when the flag is false', function () {
        return requestJson.get('http://localhost:8889/vehicles/2015/Audi/A3', {qs: {withRating: false}}).then((result) => {
          result.Count.should.equal(4);
          result.Results.length.should.equal(4);
          result.Results.forEach((vehicle) => {
            vehicle.should.have.property('VehicleId');
            vehicle.should.have.property('Description');
            (vehicle.CrashRating === undefined).should.be.true();
          });
        });
      });

      it('should return a list of vehicles without their ratings when the flag is an invalid string', function () {
        return requestJson.get('http://localhost:8889/vehicles/2015/Audi/A3', {qs: {withRating: 'invalid'}}).then((result) => {
          result.Count.should.equal(4);
          result.Results.length.should.equal(4);
          result.Results.forEach((vehicle) => {
            vehicle.should.have.property('VehicleId');
            vehicle.should.have.property('Description');
            (vehicle.CrashRating === undefined).should.be.true();
          });
        });
      });

    });

  });
};
