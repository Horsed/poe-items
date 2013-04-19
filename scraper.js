var http = require('http'),
    merger = require('./merger'),
    itemRetriever = require('./item-retriever'),
    fs = require('fs');

itemRetriever.loadWeapons(function(weaponPage) {
  itemRetriever.loadArmour(function(armourPage) {
    merger.mergeAxesAndSwords(weaponPage, function(mergedWeaponPage) {
      merger.mergeAxesSwordsWithArmour(mergedWeaponPage, armourPage, function(mergedItemsPage) {
        fs.writeFile("poe-item-overview.html", mergedItemsPage, function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log("The file was saved!");
          }
        }); 
      });
    });
  });
});
