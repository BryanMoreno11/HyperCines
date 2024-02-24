//conexion con backend
angular.module('miApp', [])
var app = angular.module("detallePelicula", []);
app.controller("detallePeliculaController", function($scope, $sce) {
    $scope.pelicula;
    $scope.selectedFecha = "";
    $scope.fecha = "";
    $scope.fechas = [];
    $scope.funciones = [];
    $scope.funcionesVIP = [];
    $scope.funcionesPrincipal = [];
    $scope.selectedFuncion = [];
    $scope.id_funcion;
    $scope.trustedUrl = "";
    //obtener id_pelicula
    $scope.params = new URLSearchParams(document.location.search);
    $scope.id_pelicula = $scope.params.get('idpelicula');
    $scope.ciudad = $scope.params.get('ciudad');
    $scope.complejo = $scope.params.get('complejo');

    const btnnext = document.getElementById("btn-next2");
    btnnext.addEventListener("click", e => {
        console.log($scope.id_funcion);
    })

    $scope.seleccionarFuncion = function(funcion) {
        if ($scope.id_funcion == funcion.id_funcion) {
            funcion.seleccionada = !funcion.seleccionada;
        } else {
            $scope.id_funcion = funcion.id_funcion;
            angular.forEach($scope.funcionesGeneral, function(funcion) {
                funcion.seleccionada = false;
            });
            angular.forEach($scope.funcionesVIP, function(funcion) {
                funcion.seleccionada = false;
            });
            funcion.seleccionada = !funcion.seleccionada;
        }
    }

    cargarDetallesPelicula().then(function(response) {
        $scope.pelicula = response[0];
        $scope.$apply();
        $scope.trustedUrl = $sce.trustAsResourceUrl($scope.pelicula.trailer);
        $scope.$apply();
        console.log($scope.trustedUrl);
    });

    cargarFechasPelicula().then(function(response) {
        $scope.fechas = response;
        $scope.selectedFecha = $scope.fechas[0].fecha;
        $scope.fecha = $scope.fechas[0];
        $scope.$apply();
        console.log($scope.selectedFecha)
        $scope.changeFecha();
    })

    $scope.changeFecha = function() {
        console.log($scope.selectedFecha);
        if ($scope.fecha != "") {
            cargarHorasFuncion().then(function(response) {
                $scope.funciones = response;
                $scope.funcionesGeneral = $scope.funciones[0];
                $scope.funcionesVIP = $scope.funciones[1];
                $scope.$apply();
                console.log($scope.funcionesGeneral);
                console.log($scope.funcionesVIP);
            })
        }
    }


    async function enviarCorreoPrueba() {
        const response = await fetch(`http://localhost:3000/api/correo/`);
        const data = await response.json();
        return data;
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

    async function cargarHorasFuncion() {
        const response = await fetch(`http://localhost:3000/api/funcion/${$scope.id_pelicula}/${$scope.ciudad}/${$scope.complejo}/${$scope.selectedFecha}`)
        const data = await response.json();
        return data;
    }
});