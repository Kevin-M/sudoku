//var sudokuModule = require('fr.esgi.sudoku');

//var test = new sudokuModule();

//console.log(test);

//sudokuModule.sudoku.init($.grid);

var Sudoku = require('fr.esgi.sudoku');

var sudoku = new Sudoku();

sudoku.init($.grid);

function backIndex(e) {
	$.grid.close();
}
