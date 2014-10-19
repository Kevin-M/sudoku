// Recharger pour tester : pénible et perte de temps
// Pas de CSS dynamique (CSS des éléments crées dynamiquement à mettre dans le JS). A vérifier !

function start(e) {
    var gridView = Alloy.createController('grid');
    
    gridView.getView().open({animation: true});
}

$.index.open();
