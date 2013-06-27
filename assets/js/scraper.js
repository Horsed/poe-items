function loadItems(sortingFunction, filterFunction) {
  $('body').hide();
  
  var oTable = $('#items').dataTable( {
        "aaData": poeItems,
        "aoColumns": [
            { "sTitle": "Category", "sClass": "center" },
            { "sTitle": "Name", "sClass": "center" },
            { "sTitle": "Level", "sClass": "center" },
            { "sTitle": "Dmg min", "sClass": "center" },
            { "sTitle": "Dmg max", "sClass": "center" },
            { "sTitle": "APS", "sClass": "center" },
            { "sTitle": "DPS", "sClass": "center" },
            { "sTitle": "Armor", "sClass": "center" },
            { "sTitle": "ER", "sClass": "center" },
            { "sTitle": "ES", "sClass": "center" },
            { "sTitle": "STR", "sClass": "center" },
            { "sTitle": "DEX", "sClass": "center" },
            { "sTitle": "INT", "sClass": "center" }
        ],
		"aoColumnDefs": [
		  {
			"sType": "numeric", "aTargets": [ 2,3,4,5,6,7,8,9,10,11,12 ]
		  }
		],
		"bPaginate": false,
		"bAutoWidth": false
    });
    
  $('body').show();
  
  return oTable;
}

function enhanceFilterInputs(oTable) {
  $("th").each(function(idx,el) {
    $('#filterInputs').append(
	  $('<input class="filterInput" placeholder="' + $(this).text() + '"/>').css('width', $(this).outerWidth()-18).css('margin-right', 14));
  });
  $(".filterInput").keyup( function () {
    var idx = $(".filterInput").index(this);
	oTable.fnFilter(this.value, idx);
    $(".filterInput").each(function() {
	  $(this).css('width', $("th:eq(" + $(".filterInput").index(this) + ")").outerWidth()-18).css('margin-right', 14);
    });
  });
  $("#items_filter").remove();
}
function enhanceFiltering() {
  var $filterInputs = [];
  $(".filterInput").each(function() {
	$filterInputs.push($(this));
  });
  $.fn.dataTableExt.afnFiltering.push(
	function( oSettings, aData, iDataIndex ) {
	  var accepted = true;
	  for(var i = 2, len = 12; i <= len; i++) {
		var iWantedNumericValue = $filterInputs[i].val(),
		    iNumericValue = aData[i];		
		accepted = accepted && (iWantedNumericValue == "" || iNumericValue == iWantedNumericValue);
	  }
	  return accepted;
	}
  );
}

$(document).ready(function() {
  var oTable = loadItems();
  enhanceFilterInputs(oTable);
  enhanceFiltering();
});