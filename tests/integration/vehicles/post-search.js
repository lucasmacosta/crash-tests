'use strict';

let should = require('should');
let request = require('request-promise');

var config = require('../../../config');

let requestJson = request.defaults({json: true});

module.exports = function() {
  describe('Vehicles only', function () {

    describe('Success tests', function () {

      it('should return a list of vehicles when there are results', function () {
        let body = {
          modelYear: 2015,
          manufacturer: 'Audi',
          model: 'A3'
        };

        return requestJson.post('http://localhost:8889/vehicles', {body}).then((result) => {
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
        let body = {
          modelYear: 2015,
          manufacturer: 'Ford',
          model: 'Crown Victoria'
        };

        return requestJson.post('http://localhost:8889/vehicles').then((result) => {
          result.Count.should.equal(0);
          result.Results.length.should.equal(0);
        });
      });

      it('should return an empty list of vehicles when a param is invalid', function () {
        let body = {
          modelYear: 'invalid',
          manufacturer: 'Audi',
          model: 'A3'
        };

        return requestJson.post('http://localhost:8889/vehicles', {body}).then((result) => {
          result.Count.should.equal(0);
          result.Results.length.should.equal(0);
        });
      });

      it('should return an empty list of vehicles when a param is missing', function () {
        let body = {
          manufacturer: 'Audi',
          model: 'A3'
        };

        return requestJson.post('http://localhost:8889/vehicles', {body}).then((result) => {
          result.Count.should.equal(0);
          result.Results.length.should.equal(0);
        });
      });

    });

  });

  describe('Vehicles with ratings', function () {

    describe('Success tests', function () {

      it('should return a list of vehicles with their ratings when there are results', function () {
        let body = {
          modelYear: 2015,
          manufacturer: 'Audi',
          model: 'A3'
        };

        return requestJson.post('http://localhost:8889/vehicles', {body, qs: {withRating: true}}).then((result) => {
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
        let body = {
          modelYear: 2015,
          manufacturer: 'Ford',
          model: 'Crown Victoria'
        };

        return requestJson.post('http://localhost:8889/vehicles', {body, qs: {withRating: true}}).then((result) => {
          result.Count.should.equal(0);
          result.Results.length.should.equal(0);
        });
      });

      it('should return an empty list of vehicles when a query param is invalid', function () {
        let body = {
          modelYear: 2015,
          manufacturer: 'Audi',
          model: 'A3'
        };

        return requestJson.post('http://localhost:8889/vehicles', {body, qs: {invalid: true}}).then((result) => {
          result.Count.should.equal(0);
          result.Results.length.should.equal(0);
        });
      });

      it('should return a list of vehicles without their ratings when the flag is false', function () {
        let body = {
          modelYear: 2015,
          manufacturer: 'Audi',
          model: 'A3'
        };

        return requestJson.post('http://localhost:8889/vehicles', {body, qs: {withRating: false}}).then((result) => {
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
        let body = {
          modelYear: 2015,
          manufacturer: 'Audi',
          model: 'A3'
        };

        return requestJson.post('http://localhost:8889/vehicles', {body, qs: {withRating: 'invalid'}}).then((result) => {
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
