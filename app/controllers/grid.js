Ti.include('sudoku.js');

var tableView = Ti.UI.createTableView({
	width: Ti.UI.FILL,
	height: Ti.UI.SIZE,
	layout: "vertical"
});

sudoku.init($.grid, tableView);

function backIndex(e) {
	$.grid.close();
}
