/* eslint-disable func-names */
const Stock = require('../lib/stock');
const Portfolio = require('../lib/portfolio');

function Client(name) {
  this.name = name;
  this.cashBalance = 0;
  this.portfolios = [];
}

Client.prototype.deposit = function (amt) {
  this.cashBalance += amt;
};

Client.prototype.withdrawal = function (amt) {
  // if (amt > this.cashBalance) return new Error('Not enough cash to withdrawal.');
  if (amt > this.cashBalance) return this.cashBalance;
  this.cashBalance -= amt;
  return this.cashBalance;
};

Client.prototype.purchaseStock = function (stockName, quantity, portfolioName, callback) {
  const s1 = new Stock(stockName);
  s1.purchase(quantity, (error, totalPaid) => {
    if (error == null) {
      this.cashBalance -= totalPaid;
      const p1 = new Portfolio(portfolioName);
      p1.addStock(s1);
      this.portfolios.push(p1);
    }
    callback(null, totalPaid);
  });
};

Client.prototype.position = function () {
  return this.portfolios.reduce((a, p) => a + p.position(), 0);
};
  //let potentialCost = 0;
  // Stock.getQuote(stockName, (err, stockPrice) => {
  //   potentialCost = quantity * stockPrice;
  //   if (potentialCost > this.cashBalance) return cb(new Error('Not enough shares.'), 0);
  //   const s1 = new Stock(stockName);
  //   s1.purchase(quantity, (error, totalPaid) => {
  //     if (error == null) {
  //       this.cashBalance -= totalPaid;
  //       this.portfolios.push(new Portfolio(portfolioName).addStock(s1));
  //     }
  //     cb(null, totalPaid);
  //   });
  //   cb(null, stockPrice);
  // });


module.exports = Client;
