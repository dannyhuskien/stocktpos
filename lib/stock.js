const request = require('request');
function Stock(symbol){
  this.symbol = symbol.toUpperCase();
}

Stock.prototype.purchase = function (quantity, cb) {
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;
  request({ url, json: true }, (err, rsp, body) => {
  this.purchasePricePerShare = body.LastPrice;
  this.name = body.Name;
  this.shares = quantity;
  this.purchaseDate = new Date(); //this create new object with current date
  const totalPaid = this.shares * this.purchasePricePerShare;
  cb(null,totalPaid);
  });
};

Stock.prototype.sell = function (quantity, cb) {
  if (quantity > this.shares) return cb(new Error('Not enough shares.'), 0);

  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;
  request({ url, json: true }, (err, rsp, body) => {
  this.sellPricePerShare = body.LastPrice;
  this.name = body.Name;
  this.shares -= quantity;
  const totalCashRefund = quantity * this.sellPricePerShare;
  cb(null,totalCashRefund);
  });
};

Stock.getQuote = function (symbol, cb){
    const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;
  request({ url, json: true }, (err, rsp, body) => {
  cb(null, body.LastPrice);
  });
}



module.exports = Stock;
