var jsdom = require('jsdom');

function merge(err, window, $upperTable, $lowerTable, filter) {
  var $ = window.jQuery;

  $('tr', $upperTable).each(function(upperIndex) {
    if(!$(this).hasClass('even_mod') && !$(this).hasClass('odd_mod') && upperIndex > 1) {
      var $upperItem = $(this),
          upperLevel = getColValue($, $(this), 2);
  
      $('tr', $lowerTable).each(function(lowerIndex) {
        if(!$(this).hasClass('even_mod') && !$(this).hasClass('odd_mod') && lowerIndex > 1) {
          var $lowerItem = $(this),
              lowerLevel = getColValue($, $(this), 2);
              passedTest = filter($, $(this));
    
          if(lowerLevel < upperLevel && passedTest) {
              var $lowerMod = $lowerItem.next().html('<td colspan="4"></td><td colspan="2"></td><td></td>');
              $upperItem.before($lowerItem);
              $lowerItem.after($lowerMod);
          }
        }
      });
    }
  });
  return $upperTable.clone().wrap("<div></div>").parent().html();
}

function getColValue($, $ctx, colNum) {
  var intValue = -1;
  $('td', $ctx).each(function(i) { if(i == colNum) intValue = parseInt($(this).text()); });
  return intValue;
}

exports.mergeAxesAndSwords = function(weaponPage, callback) {
  jsdom.env({
    html: weaponPage,
    scripts: [
      'http://code.jquery.com/jquery-1.8.3.min.js'
    ]
  }, function (err, window) {
    var $upperContainer,
        $lowerContainer;
  
    window.jQuery('.layoutBox1.layoutBoxFull.defaultTheme').each(function(i) {
      if(i == 3) $upperContainer = window.jQuery('.layoutBoxContent', window.jQuery(this));
    });
    window.jQuery('.layoutBox1.layoutBoxFull.defaultTheme').each(function(i) {
      if(i == 5) $lowerContainer = window.jQuery('.layoutBoxContent', window.jQuery(this));
    });

    var mergedContainer = merge(err, window, $upperContainer, $lowerContainer, function(){return true;});

    callback(mergedContainer);
  });
};

function energyShieldFilter($, $ctx) {
  return getColValue($, $ctx, 5) == 0 && getColValue($, $ctx, 8) == 0;
}

exports.mergeAxesSwordsWithArmour = function(weaponTable, armourPage, callback) {
  jsdom.env({
    html: armourPage,
    scripts: [
      'http://code.jquery.com/jquery-1.8.3.min.js'
    ]
  }, function (err, window) {
      window.jQuery('.layoutBox1.layoutBoxFull.defaultTheme .layoutBoxContent').each(function(i) {console.log(i);
        weaponTable = merge(err, window, window.jQuery(weaponTable), window.jQuery(this), energyShieldFilter);
      });
      callback(weaponTable);
  });
};
