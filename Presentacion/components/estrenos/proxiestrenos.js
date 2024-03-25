//Navbar
const textUser = document.querySelector(".btn-1");
const close = document.getElementById('close');
var menuOptions = document.getElementById('menu-options');
let usuario;
let user;
verificarUsuario();

function verificarUsuario() {
    user = localStorage.getItem("usuario");
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
    window.location.href = "/../index.html"
});


var app = angular.module("proxiEstreno", []);
app.controller("proxiEstrenoController", function($scope) {
    $scope.peliculasEstreno = [];
    $scope.meses = [];
    $scope.usuario;
    //llamadas
    if (user) {
        getUsuario(user).then(function(response) {
            $scope.usuario = response;
            console.log("El usuario guardado es", response);
            $scope.$apply();
        })
    }
    cargarPeliculasEstreno().then(function(response) {
        $scope.peliculasEstreno = response;
        $scope.meses = Object.keys(response);
        $scope.$apply();
    });

});
//métodos    
async function cargarPeliculasEstreno() {
    const response = await fetch('https://backend-hypercine.onrender.com/api/peliculas/proximo');
    const data = await response.json();
    return data;
}

async function getUsuario(id_usuario) {
    const response = await fetch(`https://backend-hypercine.onrender.com/api/usuario/${id_usuario}`);
    const data = await response.json();
    return data;
}


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
    moveToRight();;
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