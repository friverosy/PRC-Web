'use strict';

var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000/api');

describe('Get a Chilean from Papi', function() {
  it('should get 1 chilean', function(done) {
    api.get('/chileans/getName?dni=16240650-7')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var chilean = res.body;
        console.log(chilean);

        expect(Array.isArray(chilean)).to.be.false;
        done();
      });
  });

  // it('should get a single client', function (done) {
  //   api.get('/clients/findOne')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .end(function (err, res) {
  //       if (err) {
  //         return done(err);
  //       }
  //       var client = res.body;

  //       expect(Array.isArray(client)).to.be.false;
  //       done();
  //     });
  // });
});
