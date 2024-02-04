var app = angular.module("proxiEstreno", []);
app.controller("proxiEstrenoController", function($scope) {
    $scope.peliculasEstreno = [];
    $scope.meses = [];
    cargarPeliculasEstreno().then(function(response) {
        $scope.peliculasEstreno = response;
        $scope.meses = Object.keys(response);
        $scope.$apply();
    });

});
//métodos    
async function cargarPeliculasEstreno() {
    const response = await fetch('http://localhost:3000/api/peliculas/proximo');
    const data = await response.json();
    return data;
}