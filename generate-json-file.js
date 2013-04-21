var http = require('http'),
    fs = require('fs'),
    Handlebars = require('handlebars'),
    itemRetriever = require('./item-retriever'),
    merger = require('./merger');

itemRetriever.loadWeapons(function(weaponPage) {
  itemRetriever.loadArmour(function(armourPage) {
    merger.mergeAxesAndSwords(weaponPage, function(mergedWeaponPage) {
      merger.mergeAxesSwordsWithArmour(mergedWeaponPage, armourPage, function(items) {
        writeJson(items);
      });
    });
  });
});

function writeJson(items) {
  fs.writeFile("poe-item-overview.js", JSON.stringify(items, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("poe-item-overview.js saved!");
    }
  });
}