var sudoku = {
	emptySquare: 40,
	loopLimit: 10000,
	grid: new Array(),
	row: new Array(),
	columns: new Array(),
	squares: new Array(),
	i_while: 0,
	grid_complete: false,
	init: init,
	shuffle: shuffle
};

function init() {
	outerwhile:
	// Tant que la limite de loop n'a pas été atteinte et que la grille n'est pas complète 
	while ((this.i_while < this.loopLimit) && !this.grid_complete) {
		this.i_while++;
		
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

		this.grid_complete = true;
	}

	if (this.grid_complete) {
		var cases_a_vider = new Array();

		for (var i = 1; i <= 81; i++) {
			if (i <= emptySquare) cases_a_vider[i] = true;
			else cases_a_vider[i] = false;
		}

		cases_a_vider = this.shuffle(cases_a_vider);

		var html = "<table cellpadding='0'><tbody>";
		var html_enonce = "<table cellpadding='0'><tbody>";
		var count = 0;

		for (var y = 1; y <= 9; y++) {
			html += "<tr>";
			html_enonce += "<tr>";

			for (var x = 1; x <= 9; x++) {
				count++;

				html += "<td>" + ((cases_a_vider[count]) ? '<span class="red">' + grid[y][x] + '</span>' : grid[y][x]) + "</td>";
				html_enonce += "<td" + ((cases_a_vider[count]) ? ' class="vide">&nbsp;' : '>' + grid[y][x]) + "</td>";
			}

			html += "</tr>";
			html_enonce += "</tr>";
		}

		html += "</tbody></table>";
		html_enonce += "</tbody></table>";

		document.getElementById("grid_a_faire").innerHTML = html_enonce;
		document.getElementById("grid_solution").innerHTML = html;
		document.getElementById("resultat").style.display = 'block';
		document.getElementById("erreur").style.display = 'none';
	}
	else {
		var today = new Date;

		document.getElementById("resultat").style.display = 'none';
		document.getElementById("erreur").style.display = 'block';
		document.getElementById("erreur").innerHTML = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + " : Echec apr&egrave;s " + loopLimit + " tentatives.";
	}
}

function shuffle(array) {
	for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
	return array;
}
