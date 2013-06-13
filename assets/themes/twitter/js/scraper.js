function loadItems(sortingFunction, filterFunction) {
  $('body').hide();
  
  var oTable = $('#items').dataTable( {
        "aaData": poeItemsAA,
        "aoColumns": [
            { "sTitle": "Category", "sClass": "center" },
            { "sTitle": "Image", "sClass": "center" },
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
		"aoColumnDefs": [{
			"mRender": function ( data, type, row ) { return '<img src="' + data + '"/>'; }, "aTargets": [ 1 ]
		}, {
			"sType": "numeric", "aTargets": [ 3,4,5,6,7,8,9,10,11,12,13 ]
		}],
		"bPaginate": false,
		"bAutoWidth": false
    }).columnFilter({
	    "aoColumns": [
            {  "type": "text", bRegex: true, bSmart: true},
            {  "type": null},
            {  "type": "text", bRegex: true, bSmart: true},
            {  "type": "number"},
            { "type": "number"},
            {  "type": "number"},
            { "type": "number"},
            { "type": "number"},
            { "type": "number"},
            { "type": "number"},
            { "type": "number"},
            { "type": "number"},
            { "type": "number"},
            { "type": "number" }
        ]
	});
    
  $('body').show();
  
  return oTable;
}

function enhanceFilterInputs(oTable) {
  $("th").each(function(idx,el) {
    $('#filterInputs').append(
	  $('<input class="filterInput" placeholder="' + $(this).text() + '"' + (idx == 1 ? ' disabled="disabled"' : '') + '/>').css('width', $(this).outerWidth()-18).css('margin-right', 14));
  });
  $(".filterInput").keyup( function () {
	oTable.fnFilter( this.value, $(".filterInput").index(this) );
    $(".filterInput").each(function() {
	  $(this).css('width', $("th:eq(" + $(".filterInput").index(this) + ")").outerWidth()-18).css('margin-right', 14)
    });
  });
  $("#items_filter").remove();
}

$(document).ready(function() {
  var oTable = loadItems();
  enhanceFilterInputs(oTable);
});