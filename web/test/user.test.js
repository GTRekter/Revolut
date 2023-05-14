const chai = require('chai');
const chaiHttp = require('chai-http');
const moment = require('moment');
const app = require('../src/index');
const model = require('../src/user/model');

chai.use(chaiHttp);

describe('PUT /hello/:username', () => {

    it('should save a user and return status 204', (done) => {
      const user = {
        username: 'testuser',
        dateOfBirth: '1990-01-01'
      };
      chai
        .request(app)
        .put('/hello/' + user.username)
        .send({ dateOfBirth: user.dateOfBirth })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          chai.assert(res.status === 204, `Expected response status to be 204, got ${res.status}`);
          done();
        });
    });

    it('should return 400 if username is invalid', (done) => {
      const user = {
        dateOfBirth: '1990-01-01'
      };
      chai
        .request(app)
        .put('/hello/123')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          chai.assert(res.status === 400, `Expected response status to be 400, got ${res.status}`);
          chai.expect(res.text).to.equal('Invalid username');
          done();
        });
    });
  
    it('should return 400 if username contains non-letter characters', (done) => {
      const user = {
        dateOfBirth: '1990-01-01'
      };
      chai
        .request(app)
        .put('/hello/123')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          chai.assert(res.status === 400, `Expected response status to be 400, got ${res.status}`);
          chai.expect(res.text).to.equal('Invalid username');
          done();
        });
    });

    it('should return 400 if dateOfBirth is missing', (done) => {
      const user = {};
      chai
        .request(app)
        .put('/hello/testuser')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          chai.assert(res.status === 400, `Expected response status to be 400, got ${res.status}`);
          chai.expect(res.text).to.equal('Invalid date of birth');
          done();
        });
    });
  
    it('should return 400 if dateOfBirth is invalid', (done) => {
      const user = {
        dateOfBirth: 'invalid-date'
      };
      chai
        .request(app)
        .put('/hello/testuser')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          chai.assert(res.status === 400, `Expected response status to be 400, got ${res.status}`);
          chai.expect(res.text).to.equal('Invalid date of birth');
          done();
        });
    });
  
    it('should return 400 if dateOfBirth is after today', (done) => {
      const user = {
        dateOfBirth: '2050-01-01'
      };
      chai
        .request(app)
        .put('/hello/testuser')
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          chai.assert(res.status === 400, `Expected response status to be 400, got ${res.status}`);
          chai.expect(res.text).to.equal('Invalid date of birth');
          done();
        });
    });
});

describe('GET /hello/:username', () => {

  const today = moment().startOf('day');
  const sampleUsers = [
    {
      username: 'testuser1',
      dateOfBirth: '1989-09-23'
    },
    {
      username: 'testuser2',
      dateOfBirth: today.format('YYYY-MM-DD')
    }
  ];

  before(() => {
    for (let user of sampleUsers) {
      model.saveUser(user);
    }
  });
  
  it('Should return a birthday message with correct information', async () => {
    const dateOfBirth = moment(sampleUsers[0].dateOfBirth, 'YYYY-MM-DD');
    const age = today.diff(dateOfBirth, 'years');   
    chai
      .request(app)
      .get('/hello/' + sampleUsers[0].username)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        chai.expect(res.text).to.equal(`Hello, ${sampleUsers[0].username}! Your birthday is in ${dateOfBirth.diff(today, 'days')} days. You will be ${age + 1} years old.`);
      });
  });

  it('should return a birthday message', async () => { 
    chai
      .request(app)
      .get('/hello/' + sampleUsers[1].username)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        chai.expect(res.text).to.equal(`Hello, ${sampleUsers[1].username}! Happy birthday!`);
      });
  });
});