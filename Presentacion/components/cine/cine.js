var app = angular.module("cine", []);
app.controller("cineController", function($scope) {
    //variables
    $scope.ciudades = [];
    $scope.ciudad = "";
    $scope.complejos = [];
    $scope.complejo = "";
    $scope.peliculas = [];
    //llamadas
    cargarCiudades().then(function(response) {
        $scope.ciudades = response;
        $scope.ciudad = $scope.ciudades[0].nombre;
        $scope.$apply();
        $scope.changeCiudad();

    });
    //métodos
    $scope.getValores = function(nombrePelicula, precioEntrada, linkImagen) {
        var nombrePelicula = document.getElementById(nombrePelicula).textContent;
        console.log(nombrePelicula + "xd");
        var precioEntrada = document.getElementById(precioEntrada).textContent;
        var linkImg = document.getElementById(linkImagen).src;
        console.log('xd', linkImg);
        localStorage.setItem('nombrePelicula', nombrePelicula);
        localStorage.setItem('precioEntrada', precioEntrada);
        localStorage.setItem('linkImg', linkImg);
        window.location.href = '../seleccion/selection.html';
    }
    $scope.goToLogin = function() {
        window.location.href = '/components/login/login.html';
    }

    $scope.changeCiudad = function() {
        if ($scope.ciudad != "") {
            cargarComplejos($scope.ciudad).then(function(response) {
                $scope.complejos = response;
                $scope.complejo = $scope.complejos[0].nombre_complejo;
                $scope.$apply();
                $scope.changeComplejo();
            });
        } else {
            $scope.complejos = [];
            $scope.peliculas = [];
        }
    }

    $scope.changeComplejo = function() {
        if ($scope.complejo != "") {
            cargarPeliculasFuncion($scope.ciudad, $scope.complejo).then(function(response) {
                $scope.peliculas = response;
                $scope.$apply();
            });
        } else {
            $scope.peliculas = [];
        }
    }

});
//Conexión con el Backend   
async function cargarCiudades() {
    const response = await fetch('http://localhost:3000/api/ciudades');
    const data = await response.json();
    return data;
}
async function cargarComplejos(ciudad) {
    const response = await fetch(`http://localhost:3000/api/complejos/${ciudad}`);
    const data = await response.json();
    console.log(data);
    return data;

}
async function cargarPeliculasFuncion(ciudad, complejo) {
    const response = await fetch(`http://localhost:3000/api/peliculas/cartelera/${ciudad}/${complejo}`);
    const data = await response.json();
    console.log(data);
    return data;

}