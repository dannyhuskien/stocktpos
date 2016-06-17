const expect = require('chai').expect;
const Portfolio = require('../lib/portfolio');
const Stock = require('../lib/stock');

describe('Portfolio', () => {
  describe('constructor', () => {
    it('should construct a new Portfolio object', () => {
      const p1 = new Portfolio('Tech');
      expect(p1.name).to.equal('Tech');
    });
  });
  describe('#addStock', () => {
    it('should add a new stack object', () => {
      const p1 = new Portfolio('Tech');
      const s1 = new Stock('Apple');
      s1.shares = 5;
      s1.purchasePricePerShare = 100;
      const s2 = new Stock('Google');
      s2.shares = 3;
      s2.purchasePricePerShare = 50;
      p1.addStock(s1);
      p1.addStock(s2);
      expect(p1.stocks.length).to.equal(2);
    });
    it('should give total portfolio value', () => {
      const p1 = new Portfolio('Tech');
      const s1 = new Stock('Apple');
      s1.shares = 5;
      s1.purchasePricePerShare = 100;
      const s2 = new Stock('Google');
      s2.shares = 3;
      s2.purchasePricePerShare = 50;
      p1.addStock(s1);
      p1.addStock(s2);
      expect(p1.position()).to.equal(650);
    });
    it('should sell shares from portfolio', () => {
      const p1 = new Portfolio('Tech');
      const s1 = new Stock('Apple');
      s1.shares = 2;
      s1.purchasePricePerShare = 100;
      const s2 = new Stock('Google');
      s2.shares = 3;
      s2.purchasePricePerShare = 50;
      p1.addStock(s1);
      p1.addStock(s2);
      //p1.stocks[0].shares = 2;
      expect(p1.position()).to.equal(350);
    });
  });
});
