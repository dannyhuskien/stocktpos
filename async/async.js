/* eslint-disable func-names, no-console */
const Promise = require('bluebird');

function diceSync() {
  return Math.floor(Math.random() * 6) + 1;
}

const rolls = [0, 0, 0].map(x => diceSync());
console.log('rolls:', rolls);

function diceCallback(cb) {
  setTimeout(function() {
    const roll = diceSync();
    cb(roll);
  }, 10);
}

const values = [];
diceCallback(function(roll1) {
  diceCallback(function(roll2) {
    diceCallback(function(roll3) {
      values.push(roll1, roll2, roll3)
      console.log('values:', values);
    });
  });
});

function dicePromise(){
 return new Promise(function(resolve, reject){
  diceCallback(function(roll){
    if(roll < 4)
      resolve(roll);
    else {
      reject(new Error('Too Large'));
    }
  });
});
};
dicePromise()
.then(function(roll){
  console.log('promise', roll);
  return dicePromise();
})
.then(function(roll){
  console.log('promise', roll);
  return dicePromise();
})
.then(function(roll){
  console.log('promise', roll);
})
.then(function(roll){
  console.log('promise', roll);
  throw new Error('some Error')
})
.catch(function(err){
  console.log('catch err', err.message);
})


Promise.all([dicePromise(),dicePromise(),dicePromise()])
.then(function(rolls){
  console.log('p.all', rolls);
});
