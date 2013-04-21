function sortBy(field, reverse, primer) {

   var key = function (x) {
     return primer ? primer(x[field]) : x[field];
   };

   return function (a,b) {
       var A = key(a), B = key(b);
       return (A < B
                ? -1
                : (A > B
                  ? +1
                  : 0)) * [-1,1][+!!reverse];                  
   };
};

exports.byCategory = function(reverse) {
  return sortBy('category', reverse);
};

exports.byName = function(reverse) {
  return sortBy('name', reverse);
};

exports.byLevel = function(reverse) {
  return sortBy('level', reverse, parseInt);
};

exports.byAps = function(reverse) {
  return sortBy('aps', reverse, parseFloat);
};

exports.byDps = function(reverse) {
  return sortBy('dps', reverse, parseFloat);
};

exports.byDmgMin = function(reverse) {
  return sortBy('dmgMin', reverse, parseInt);
};

exports.byDmgMax = function(reverse) {
  return sortBy('dmgMax', reverse, parseInt);
};

exports.byArmor = function(reverse) {
  return sortBy('armor', reverse, parseInt);
};

exports.byEr = function(reverse) {
  return sortBy('er', reverse, parseInt);
};

exports.byEs = function(reverse) {
  return sortBy('es', reverse, parseInt);
};

exports.byStr = function(reverse) {
  return sortBy('str', reverse, parseInt);
};

exports.byDex = function(reverse) {
  return sortBy('dex', reverse, parseInt);
};

exports.byInt = function(reverse) {
  return sortBy('int', reverse, parseInt);
};