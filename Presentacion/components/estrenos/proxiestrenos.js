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
