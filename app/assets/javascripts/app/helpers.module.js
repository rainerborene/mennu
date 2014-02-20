var hours = (function(){
  var hours = [], i = 0;
  for ( ; i <= 23; i++ ){
    hours.push((1e15+i+"").slice(-2) + ':00');
    hours.push((1e15+i+"").slice(-2) + ':30');
  }
  return hours;
})();

module.exports = { hours: hours };
