const chai = require('chai');
const chaiHttp = require('chai-http');
const moment = require('moment');
const app = require('../src/index');
const model = require('../src/user/model');
const controller = require('../src/user/controller');
const { mockClient } = require("aws-sdk-client-mock")
const { DynamoDBDocumentClient, GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb")

chai.use(chaiHttp);

const ddbMock = mockClient(DynamoDBDocumentClient);

describe('PUT /hello/:username', () => {

    beforeEach(() => {
      ddbMock.reset();
    });

    it('should save user data', async() => {
      const user = {
        username: "testuser",
        dateOfBirth: '1989-09-23'
      };
      ddbMock.on(PutCommand).resolves({
        Item: { username: user.username, dateOfBirth: user.dateOfBirth },
      });
      const addedUser = await model.saveUser(user);
      chai.expect(addedUser.username).to.equal(user.username);
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
          if (err) return done(err);
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
          if (err) return done(err);
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

  beforeEach(() => {
    ddbMock.reset();
  });

  it('should return a birthday message', async () => {
    const today = moment().startOf('day');
    const dateOfBirth = moment('1989-09-23', 'YYYY-MM-DD');
    const age = today.diff(dateOfBirth, 'years');   
    ddbMock.on(GetCommand).resolves({
      Item: { username: "testuser", dateOfBirth: '1989-09-23' },
    });
    const user = await model.getUserByUsername("testuser");
    const message = controller.getBirthdayMessage(user.username, user.dateOfBirth);
    chai.expect(message).to.equal(`Hello, testuser! Your birthday is in ${dateOfBirth.diff(today, 'days')} days. You will be ${age + 1} years old.`);
  });

  it('should return a happy birthday message', async() => {
    const today = moment().startOf('day');
    const dateOfBirth = moment('1989-09-23', 'YYYY-MM-DD'); 
    ddbMock.on(GetCommand).resolves({
      Item: { username: "testuser", dateOfBirth: today },
    });
    const user = await model.getUserByUsername("testuser");
    const message = controller.getBirthdayMessage(user.username, user.dateOfBirth);
    chai.expect(message).to.equal(`Hello, ${user.username}! Happy birthday!`);
  });

});