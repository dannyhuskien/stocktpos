/* eslint-disable func-names */
const expect = require('chai').expect;
const Client = require('../lib/client');

describe('Client', () => {
  describe('constructor', () => {
    it('should construct a new Client object', () => {
      const c1 = new Client('Bob');
      expect(c1.name).to.equal('Bob');
    });
  });

  describe('#deposit', () => {
    it('should add to cashBalance of client object', () => {
      const c1 = new Client('Bob');
      c1.deposit(500);
      expect(c1.cashBalance).to.equal(500);
    });
  });
  describe('#withdrawal', () => {
    it('should subtract from cashBalance of client object', () => {
      const c1 = new Client('Bob');
      c1.deposit(500);
      c1.withdrawal(100);
      expect(c1.cashBalance).to.equal(400);
      c1.withdrawal(700);
      expect(c1.cashBalance).to.equal(400);
    });
  });

  describe('#purchaseStock', () => {
    it('should put stock in portfolio client object', (done) => {
      const c1 = new Client('Bob');
      c1.deposit(500);

      c1.purchaseStock('AAPL', 3, 'Tech', (err, totalPaid) => {
        expect(c1.portfolios.length).to.equal(1);
        expect(c1.portfolios[0].name).to.be.equal('Tech');
        expect(c1.portfolios[0].stocks[0].symbol).to.be.equal('AAPL');
        expect(c1.portfolios[0].stocks[0].shares).to.equal(3);
        expect(totalPaid).to.be.above(100);
        expect(c1.cashBalance).to.be.below(500);
        done();
      });
    });
    it('should put 2 stocks in portfolio and give Client.position for all portfolios', (done) => {
      const c1 = new Client('Bob');
      c1.deposit(1000);

      c1.purchaseStock('AAPL', 3, 'Tech', (err, totalPaid) => {
        expect(c1.portfolios.length).to.equal(1);
        expect(c1.portfolios[0].name).to.be.equal('Tech');
        expect(c1.portfolios[0].stocks[0].symbol).to.be.equal('AAPL');
        expect(c1.portfolios[0].stocks[0].shares).to.equal(3);
        expect(totalPaid).to.be.above(100);
        expect(c1.cashBalance).to.be.below(1000);
        done();
      });

      c1.purchaseStock('AAPL', 4, 'Tech', (err, totalPaid) => {
        expect(c1.portfolios.length).to.equal(1);
        expect(c1.portfolios[0].name).to.be.equal('Tech');
        expect(c1.portfolios[0].stocks[0].symbol).to.be.equal('AAPL');
        expect(c1.portfolios[0].stocks[0].shares).to.equal(4);
        expect(totalPaid).to.be.above(100);
        expect(c1.cashBalance).to.be.below(800);
        console.log(c1.portfolios);
        expect(c1.position()).to.above(0);
        done();
      });

    });
  });
});
