var tableView = Ti.UI.createTableView({
	width: Ti.UI.FILL,
	height: Ti.UI.SIZE,
	layout: 'vertical'
});
var labelStep = Ti.UI.createLabel({
	text: '0 coup',
	color: '#E85350'
});


function Sudoku() {
	this.emptySquare = 2;
	this.loopLimit   = 10000;
	this.grid        = new Array();
	this.row         = new Array();
	this.columns     = new Array();
	this.squares     = new Array();
	this.inputs      = new Array();
	this.solution    = new Array();
	this.step        = 0;

	this.init = function(view) {
		var currentLoop = 0;
		var rows = new Array();
		
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
					witdh: Ti.UI.FILL,
					height: Ti.UI.SIZE,
					layout: 'horizontal'
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
						id: 'square-' + count,
	    				value: (squaresToEmpty[count]) ? '' : String(this.grid[y][x]),
	    				width: 38,
						height: 38,
						textAlign: "center",
						color: (squaresToEmpty[count]) ? '#555' : '#FFF',
						maxLength: 1,
						backgroundColor: (squaresToEmpty[count]) ? '#FFF' : '#E85350',
						enabled: (squaresToEmpty[count]) ? true : false,
						editable: (squaresToEmpty[count]) ? true : false,
						focusable: (squaresToEmpty[count]) ? true : false,
						keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
					});
	
					// http://msdn.microsoft.com/en-us/library/ie/dn569317(v=vs.94).aspx
					textfield.addEventListener('change', inputProcess.bind(this));
	    			
	    			row.add(textfield);
				}
	
				// html += "</tr>";
				// html_enonce += "</tr>";
				
				//tableView.add(row);
				rows.push(row);
			}
	
			tableView.data = rows;
	
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
	};
}

function inputProcess() {
	// console.log(this);
	// console.log(arguments);
	
	var source = arguments[0].source;
	var value = arguments[0].value;
	
	if (value != undefined && isValidValue(value)) {	
		this.inputs[getSquarePosition(source)] = value;
		
		this.step++;

		labelStep.text = this.step + (this.step == 1 ? ' coup' : ' coups');
		
		if (this.step == this.emptySquare) {
			if (this.inputs.join() === this.solution.join()) {
				alert('Gagné en ' + this.step + ' coups');
				
				// @TODO: si enregistrement de DB réussi, goto home
				
				// save(Sudoku.step, sudoku.grid, sudoku.inputs);		
			}
		}
	}
	else {
		// arguments[0].value = '';						
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

function getSquarePosition(source) {
	if (source.id != undefined) {
		return parseInt(source.id.substring(7));
	}
	
	return null;
}

module.exports = Sudoku;
