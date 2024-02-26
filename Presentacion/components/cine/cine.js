//Navbar
const textUser = document.querySelector(".btn-1");
const close = document.getElementById('close');
var menuOptions = document.getElementById('menu-options');
let usuario;
verificarUsuario();

function verificarUsuario() {
    const user = localStorage.getItem("usuario");
    if (user) {
        getUsuario(user).then(function(response) {
            console.log("la respuesta es", response)
            textUser.textContent = response.nombre + " " + response.apellido;
            textUser.classList.add("logueado");
        })

    } else {
        textUser.textContent = "Iniciar Sesión";
    }
}

textUser.addEventListener("click", function(e) {
    const user = localStorage.getItem("usuario");
    if (user) {
        console.log("hay");
        e.preventDefault();
        if (menuOptions.style.display === 'block') {
            menuOptions.style.display = 'none';
        } else {
            menuOptions.style.display = 'block';
        }
    }
});

close.addEventListener("click", function(e) {
    localStorage.removeItem("usuario");
    menuOptions.style.display = 'none';
    verificarUsuario();
    window.location.href = "http://127.0.0.1:5500/Presentacion/components/cine/cine.html"
});
//Lógica del componente cine
var app = angular.module("cine", []);
app.controller("cineController", function($scope, $timeout) {
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
    $scope.getValores = function(nombrePelicula, precioEntrada, linkImagen, idpelicula) {
        var nombrePelicula = document.getElementById(nombrePelicula).textContent;
        console.log(nombrePelicula + "xd");
        var precioEntrada = document.getElementById(precioEntrada).textContent;
        var linkImg = document.getElementById(linkImagen).src;
        console.log('xd', linkImg);
        localStorage.setItem('nombrePelicula', nombrePelicula);
        localStorage.setItem('precioEntrada', precioEntrada);
        localStorage.setItem('linkImg', linkImg);
        console.log($scope.ciudad, $scope.complejo)
        window.location.href = `../detallePelicula/detallePelicula.html?ciudad=${$scope.ciudad}&complejo=${$scope.complejo}&idpelicula=${idpelicula}`;
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

async function getUsuario(id_usuario) {
    const response = await fetch(`http://localhost:3000/api/usuario/${id_usuario}`);
    const data = await response.json();
    return data;
}
//Slider
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const slider = document.querySelector("#slider");
const sliderSections = document.querySelectorAll(".slider-section");
const numImages = sliderSections.length; // Número total de imágenes
let counter = 0; // Iniciar desde 0 para mostrar la primera imagen al principio
const widthImg = 100 / numImages;
let intervalID;
btnLeft.addEventListener("click", e => {
    clearInterval(intervalID);
    moveToLeft();
});

btnRight.addEventListener("click", e => {
    clearInterval(intervalID);
    moveToRight();
});

intervalID = setInterval(() => {
    moveToRight();
}, 10000); // 10 segundos

function moveToRight() {
    counter++;
    if (counter >= numImages) {
        counter = 0; // Vuelve a la primera imagen después de la última
    }
    const operacion = widthImg * counter;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "transform ease .6s"; // Solo transición de transformación
}

function moveToLeft() {
    counter--;
    if (counter < 0) {
        counter = numImages - 1; // Va a la última imagen después de la primera
    }
    const operacion = widthImg * counter;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "transform ease .6s"; // Solo transición de transformación
}