// Chargement de la librairie de gestion du Sudoku
var Sudoku = require('fr.esgi.sudoku');
// Récupération des paramètres
var args = arguments[0] || {};

var sudoku = new Sudoku();

// Si les données de la meilleures partie sont récupérées
if (args.bestScore !== undefined) {
	// Replay
	sudoku.replay($.grid, args.bestScore);
}
else {
	// Lancement d'une partie standard
	sudoku.init($.grid);
}

// Retour à la page d'accueil
function backIndex(e) {
	$.grid.close();
}

// @TODO: faire une bouton d'aide ?
function help() {
	sudoku.help();
}
