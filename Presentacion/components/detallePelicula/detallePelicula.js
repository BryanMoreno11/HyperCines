//conexion con backend
var app = angular.module("detallePelicula", []);
app.controller("detallePeliculaController", function($scope, $sce) {
    $scope.pelicula;
    $scope.fecha = "";
    $scope.fechas = [];
    $scope.trustedUrl = "";
    //obtener id_pelicula
    $scope.params = new URLSearchParams(document.location.search);
    $scope.id_pelicula = $scope.params.get('idpelicula');
    $scope.ciudad = $scope.params.get('ciudad');
    $scope.complejo = $scope.params.get('complejo');

    cargarDetallesPelicula().then(function(response) {
        $scope.pelicula = response[0];
        $scope.$apply();
        console.log($scope.pelicula);
        $scope.trustedUrl = $sce.trustAsResourceUrl($scope.pelicula.trailer);
        $scope.$apply();
        console.log($scope.trustedUrl);
    });

    cargarFechasPelicula().then(function(response) {
        $scope.fechas = response;
        $scope.fecha = $scope.fechas[0];
        $scope.$apply();
        $scope.changeFecha();
    })

    $scope.changeFecha = function() {
        if ($scope.fecha != "") {

        }
    }

    async function cargarDetallesPelicula() {
        const response = await fetch(`http://localhost:3000/api/pelicula/${$scope.id_pelicula}`);
        const data = await response.json();
        return data;
    }

    async function cargarFechasPelicula() {
        const response = await fetch(`http://localhost:3000/api/funcion/${$scope.id_pelicula}/${$scope.ciudad}/${$scope.complejo}`)
        const data = await response.json();
        return data;
    }
});