// Recharger pour tester : pénible et perte de temps
// Pas de CSS dynamique (CSS des éléments crées dynamiquement à mettre dans le JS). A vérifier !
// DB petite, pas besoin du FileSystem
/*
//variable indiquant si la bdd a été initialisée ou non
if (!Titanium.App.Properties.getInt('dbcreated')) {
	Titanium.App.Properties.setInt('dbcreated', 0);
}

// Si premier lancement initialisation de la BDD
if (Titanium.App.Properties.getInt('dbcreated') == 0) {
	// Stock la version de l'application afin de pouvoir passer des scripts d'update lors d'une mise à jour si nécessaire
	Titanium.App.Properties.setInt('dbcreated', Titanium.App.getVersion());
 
    // Initialisation de la BDD
    var db = Ti.Database.install('../sudoku.sqlite', 'sudoku');
    
    // iOS : empêche la DB d'être déplacée dans le Cloud en cas de manque de place
    db.file.setRemoteBackup(false);
     
	// Bootstrap the database
	var db = Ti.Database.open('sudoku');
	
	db.execute('CREATE TABLE IF NOT EXISTS scores(id INTEGER PRIMARY KEY, score INTEGER);');
	db.execute('CREATE TABLE IF NOT EXISTS best_score(id INTEGER PRIMARY KEY, score INTEGER, grid TEXT inputs TEXT);');
	db.close();
}*/

//var db = Ti.Database.install('../sudoku.sqlite', 'sudoku');
//var db = Ti.Database.open('sudoku');

//var bestScore = db.execute('SELECT * FROM best_score');

//console.log(bestScore);

function start(e) {
    var gridView = Alloy.createController('grid');
    
    gridView.getView().open({animation: true});
}

$.index.open();
