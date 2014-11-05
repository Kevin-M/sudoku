var Sudoku = require('fr.esgi.sudoku');
var sudoku = new Sudoku();

sudoku.init($.grid);

function backIndex(e) {
	$.grid.close();
}
