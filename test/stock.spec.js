/* eslint-disable prefer-arrow-callback, func-names,
space-before-function-paren, no-traiing-spaces */

const expect = require('chai').expect;
const Stock = require('../lib/stock');
const nock = require('nock');
const sinon = require('sinon');
let clock;

describe('Stock', () => {
  before(() => {
    clock = sinon.useFakeTimers();
    clock.tick(150);
    nock(`http://dev.markitondemand.com`)
    .get(`/MODApis/Api/v2/Quote/json?symbol=AAPL`)
    .reply(200, {
      Name: 'Apple',
      LastPrice: 100,
    })
    .persist();
  });
  after(() => {
    nock.cleanAll();
    clock.restore();
  });
  describe('constructor', () => {
    it('should construct a new Stock object', () => {
      const s1 = new Stock('aapl');
      expect(s1.symbol).to.equal('AAPL');
    });
  });

  describe('#purchase', () => {
    it('should purchase stock', (done) => {
      const s1 = new Stock('aapl');

      s1.purchase(50, (err, totalPaid) => {
        expect(err).to.be.equal(null);
        expect(totalPaid).to.equal(5000);
        expect(s1.shares).to.equal(50);
        expect(s1.purchaseDate.getTime()).to.be.equal(150);
        expect(s1.name).to.equal('Apple');
        expect(s1.purchasePricePerShare).to.equal(100);
        done();
      });
    });
  });

  describe('#sell', () => {
    it('should sell stock', (done) => {
      const s2 = new Stock('aapl');
      s2.shares = 50;
      s2.sell(30, (err, totalCashRefund) => {
        expect(err).to.be.equal(null);
        expect(s2.shares).to.equal(20);
        expect(totalCashRefund).to.be.equal(3000);
        expect(s2.name).to.equal('Apple');
        done();
      });
    });

    it('should not sell stock', (done) => {
      const s2 = new Stock('aapl');
      s2.shares=50;
      s2.sell(100, (err, totalCashRefund) => {
        expect(totalCashRefund).to.equal(0);
        expect(err).to.be.instanceOf(Error);
        expect(err.message).to.equal('Not enough shares.');
        expect(s2.shares).to.equal(50);
        done();
      });
    });
  });
});
