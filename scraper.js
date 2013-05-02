exports.start = function(app, contextPath, basePath) {
  var http = require('http'),
      fs = require('fs'),
      express = require('express'),
      Handlebars = require('handlebars'),
      itemRetriever = require(basePath + '/item-retriever'),
      merger = require(basePath + '/merger'),
      sort = require(basePath + '/sorter');

  app.get(contextPath, function(req, res) {
    if(req.query['sort'] == 'by-level')
      loadItems(req, res, sort.byLevel(req.query['dir'] == 'asc'));
    else if(req.query['sort'] == 'by-name')
      loadItems(req, res, sort.byName(req.query['dir'] == 'asc'));
    else if(req.query['sort'] == 'by-aps')
      loadItems(req, res, sort.byAps(req.query['dir'] == 'asc'));
    else if(req.query['sort'] == 'by-dps')
      loadItems(req, res, sort.byDps(req.query['dir'] == 'asc'));
    else if(req.query['sort'] == 'by-armor')
      loadItems(req, res, sort.byArmor(req.query['dir'] == 'asc'));
    else if(req.query['sort'] == 'by-er')
      loadItems(req, res, sort.byEr(req.query['dir'] == 'asc'));
    else if(req.query['sort'] == 'by-es')
      loadItems(req, res, sort.byEs(req.query['dir'] == 'asc'));
    else if(req.query['sort'] == 'by-dmg-min')
      loadItems(req, res, sort.byDmgMin(req.query['dir'] == 'asc'));
    else if(req.query['sort'] == 'by-dmg-max')
      loadItems(req, res, sort.byDmgMax(req.query['dir'] == 'asc'));
    else if(req.query['sort'] == 'by-str')
      loadItems(req, res, sort.byStr(req.query['dir'] == 'asc'));
    else if(req.query['sort'] == 'by-dex')
      loadItems(req, res, sort.byDex(req.query['dir'] == 'asc'));
    else if(req.query['sort'] == 'by-int')
      loadItems(req, res, sort.byInt(req.query['dir'] == 'asc'));
    else
      loadItems(req, res, sort.byCategory(req.query['dir'] == 'asc'));
      
  });
  app.get(contextPath + '/style.css', function(req, res) {
    res.set('Content-Type', 'text/css');
    fs.readFile(basePath + "/style.css", 'utf8', function(err, data) {
      if (err) throw err;
      res.send(data);
    });
  });
  
  function loadItems(req, res, sortingFunction) {
    res.set('Content-Type', 'text/html');
    fs.readFile(basePath + "/poe-item-overview.js", 'utf8', function(err, data) {
      if (err) throw err;
      var items = JSON.parse(data);
      items.sort(sortingFunction);
      fs.readFile(basePath + "/template.html", 'utf8', function(err, data) {
        if (err) throw err;
        var content = Handlebars.compile(data)({"items": items});
        res.send(content);
      });
    });
  }
}