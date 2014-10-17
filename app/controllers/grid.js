// Ti.include('sudoku.js');

var tableView = Ti.UI.createTableView({
	width: Ti.UI.FILL,
	height: Ti.UI.SIZE,
	layout: "vertical"
});
var squareNumber = 1;

for(var i = 1 ; i <= 9; i++) {
	var row = Ti.UI.createTableViewRow({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		layout: "horizontal"
	});
    
    for (var j = 1; j <= 9; j++) {
    	var button = Ti.UI.createButton({
    		height: Ti.UI.SIZE,
    		title: String(squareNumber)
    	});
    	
    	row.add(button);
    	
    	squareNumber++;
    }
    
    tableView.add(row);
}

$.grid.add(tableView);

function backIndex(e) {
	$.grid.close();
}
