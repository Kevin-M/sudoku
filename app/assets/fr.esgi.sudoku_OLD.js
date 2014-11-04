var sudoku = {
	emptySquare: 2,
	loopLimit: 10000,
	grid: new Array(),
	row: new Array(),
	columns: new Array(),
	squares: new Array(),
	inputs: new Array(),
	solution: new Array(),
	step: 0,
	complete: false,
	init: init
};

function init(view) {
	var currentLoop = 0;
	var tableView = Ti.UI.createTableView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		layout: 'vertical'
	});
	
	var labelStep = Ti.UI.createLabel({
		text: '0 coup',
		color: '#E85350'
	});
	
	outerwhile:
	// Tant que la limite de loop n'a pas été atteinte et que la grille n'est pas complète
	// Remplissage de toute la grille (commentaire à virer !)
	while ((currentLoop < this.loopLimit) && !this.complete) {
		currentLoop++;
		
		for (var i = 1; i <= 9; i++) {
			this.grid[i] = new Array(); // Ligne de la grid
			this.row[i] = new Array(); // Array pour les row
			this.columns[i] = new Array(); // Array pour les columns
			
			for (var j = 1; j <= 9; j++) {
				this.grid[i][j] = 0; // Toutes les cases à 0
				this.row[i][j] = j; // Complète toutes les possibilités de la ligne
				this.columns[i][j] = j; // Complète toutes les possibilités de la colonne
			}
		}
		
		for (var i = 1; i <= 3; i++) {
			this.squares[i] = new Array(); // Crée les 3 row de cases
			
			for (var j = 1; j <= 3; j++) {
				this.squares[i][j] = new Array(); // Crée les 3 columns de cases dans chaque ligne
				
				for (var k = 1; k <= 9; k++) {
					this.squares[i][j][k] = k; // Complète toutes les possibilités de la case
				}
			}
		}
		
		for (var y = 1; y <= 9; y++) {
			for (var x = 1; x <= 9; x++) {
				var possibilites = new Array();
				var index = 0;
				
				for (var k = 1; k <= 9; k++) {
					if (!this.row[y][k]) continue;
					if (!this.columns[x][k]) continue;
					if (!this.squares[Math.ceil(y / 3)][Math.ceil(x / 3)][k]) continue;

					possibilites[index] = k;
					
					index++;
				}

				if (possibilites.length == 0) continue outerwhile;
				
				var nb = possibilites[Math.floor((Math.random() * possibilites.length))];
				
				this.grid[y][x] = nb;
				this.row[y][nb] = undefined;
				this.columns[x][nb] = undefined;
				this.squares[Math.ceil(y / 3)][Math.ceil(x / 3)][nb] = undefined;
			}
		}

		this.complete = true;
	}

	// Si le remplissage de la grille est terminé
	if (this.complete) {
		var squaresToEmpty = new Array();

		// Parcours de toutes les cases
		for (var i = 1; i <= 81; i++) {
			// Si la position de la case courante est inférieure au nombre de case à vider
			// La marque comme étant à vider
			if (i <= this.emptySquare) squaresToEmpty[i] = true;
			// Sinon la marque comme étant à garder telle quelle
			else squaresToEmpty[i] = false;
		}
		
		squaresToEmpty = shuffle(squaresToEmpty);

		// var html = "<table cellpadding='0'><tbody>";
		// var html_enonce = "<table cellpadding='0'><tbody>";
		var count = 0;

		for (var y = 1; y <= 9; y++) {
			// html += "<tr>";
			// html_enonce += "<tr>";
			
			var row = Ti.UI.createTableViewRow({
				width: Ti.UI.FILL,
				height: Ti.UI.SIZE,
				layout: "horizontal"
			});

			for (var x = 1; x <= 9; x++) {
				count++;

				if (squaresToEmpty[count]) {
					this.solution[count] = this.grid[y][x];
				}
				
				// console.log(this.solution);

				// html += "<td>" + ((squaresToEmpty[count]) ? '<span class="red">' + grid[y][x] + '</span>' : grid[y][x]) + "</td>";
				// html_enonce += "<td" + ((squaresToEmpty[count]) ? ' class="vide">&nbsp;' : '>' + grid[y][x]) + "</td>";
				
				var textfield = Ti.UI.createTextField({
					id: "square-" + count,
    				value: (squaresToEmpty[count]) ? '' : String(this.grid[y][x]),
    				width: 38,
					height: 38,
					textAlign: "center",
					color: (squaresToEmpty[count]) ? "#555" : "#FFF",
					maxLength: 1,
					backgroundColor: (squaresToEmpty[count]) ? "#FFF" : "#E85350",
					enabled: (squaresToEmpty[count]) ? true : false,
					editable: (squaresToEmpty[count]) ? true : false,
					focusable: (squaresToEmpty[count]) ? true : false,
					keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
				});

				textfield.addEventListener('change', function(e) {
					if (isValidValue(e.value)) {
						sudoku.inputs[getSquarePosition(e)] = e.value;
						
						sudoku.step++;

						labelStep.text = sudoku.step + (sudoku.step == 1 ? ' coup' : ' coups');
						
						if (sudoku.step == sudoku.emptySquare) {
							if (sudoku.inputs.join() === sudoku.solution.join()) {
								alert('Gagné en ' + sudoku.step + ' coups');
								
								// @TODO: si enregistrement de DB réussi, goto home
								
								save(sudoku.step, sudoku.grid, sudoku.inputs);		
							}
						}
					}
					else {
						this.value = '';						
					}
				});
    			
    			row.add(textfield);
			}

			// html += "</tr>";
			// html_enonce += "</tr>";
			
			tableView.add(row);
		}

		// html += "</tbody></table>";
		// html_enonce += "</tbody></table>";
		
		view.add(tableView);
		view.add(labelStep);

		// document.getElementById("grid_a_faire").innerHTML = html_enonce;
		// document.getElementById("grid_solution").innerHTML = html;
		// document.getElementById("resultat").style.display = 'block';
		// document.getElementById("erreur").style.display = 'none';
	}
	else {
		var today = new Date;

		console.log(today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' : ' + loopLimit + ' coups');

		// document.getElementById("resultat").style.display = 'none';
		// document.getElementById("erreur").style.display = 'block';
		// document.getElementById("erreur").innerHTML = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + " : Echec apr&egrave;s " + loopLimit + " tentatives.";
	}
}

function shuffle(array) {
	for (var j, x, len = array.length; len; j = parseInt(Math.random() * len), x = array[--len], array[len] = array[j], array[j] = x);
	
	return array;
}

function isValidValue(value) {
	if (value != '' && value >=1 && value <= 9) return true;
	
	return false;
}

function getSquarePosition(e) {
	if (e.source.id != undefined) {
		return parseInt(e.source.id.substring(7));
	}
	
	return null;
}

function save(step, grid, inputs) {
	var db = Ti.Database.open('sudoku');
	var bestScore = db.execute('SELECT * FROM best_score');
	
	console.log(bestScore);
	
	if (bestScore == '') {
		db.execute('INSERT INTO best_score (id, score, grid, inputs) VALUES (?, ?, ?, ?)', 1, step, grid, inputs);
	}
	else {
		
	}
}

exports.sudoku = sudoku;
