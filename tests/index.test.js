const request = require('supertest');
const app = require('../src/index');

describe('GET /api-docs', function () {
  it('responds with 200', function (done) {
    request(app).get('/').expect(200, done);
  });
});
