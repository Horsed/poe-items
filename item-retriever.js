var http = require('http');

exports.loadWeapons = function(callback) {
  var options = {
    host: 'www.pathofexile.com',
    path: '/item-data/weapon'
  };
  
  http.request(options, function(response) {
    var str = '';
     response.on('data', function (chunk) {
       str += chunk;
    });

    response.on('end', function () {
      callback(str);
    });
  }).end();
};

exports.loadArmour = function(callback) {
  var options = {
    host: 'www.pathofexile.com',
    path: '/item-data/armour'
  };
  
  http.request(options, function(response) {
    var str = '';
     response.on('data', function (chunk) {
       str += chunk;
    });

    response.on('end', function () {
      callback(str);
    });
  }).end();
};
