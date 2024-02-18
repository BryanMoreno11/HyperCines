//variables
const container = document.querySelector('.container');
const btnSiguiente = document.getElementById('btn-next');
const frmDetails = document.querySelector(".entrance-detail");
const frmSeats = document.querySelector(".seat-selections");
const btnVolver = document.getElementById('btn-volver');
const btnMinus = document.getElementById('minus-seat');
const btnPlus = document.getElementById('plus-seat');
const btnNextSeat = document.getElementById("btn-next-seat");
const btnVolverPay = document.getElementById("btn-volver-pay");
const cantAsientos = document.querySelector(".cantidad");
const frmPayMethods = document.querySelector(".pay-methods");
let precioEntrada = document.getElementById('priceEntry').textContent;
let ticketPrice = document.querySelector(".totallyEntry").textContent;
let cant = 0;
let id_funcion = 1;
let capacidad;
//-------------------------------Llamadas-----------------------------------------------
getCapacidad().then(function(response) {
    capacidad = response[0].capacidad_sala;
    console.log(capacidad);
});
//-------------------------------Métodos-----------------------------------------------
btnSiguiente.addEventListener("click", e => {
    window.alert("Ahora estas en   las entradas");
    //generarAsientos();
    frmDetails.classList.remove("show");
    frmDetails.classList.add("hide");
    frmSeats.classList.remove("hide");
    frmSeats.classList.add("show");
});

btnVolver.addEventListener("click", e => {
    frmDetails.classList.remove("hide");
    frmDetails.classList.add("show");
    frmSeats.classList.remove("show");
    frmSeats.classList.add("hide");
});

btnNextSeat.addEventListener("click", e => {
    frmSeats.classList.add("hide");
    frmSeats.classList.remove("show");
    frmPayMethods.classList.remove("hide");
    frmPayMethods.classList.add("show");
});

btnVolverPay.addEventListener("click", e => {
    window.alert("Ahora estas volviando a  las entradas");
    frmPayMethods.classList.remove("show");
    frmPayMethods.classList.add("hide");
    frmSeats.classList.remove("hide");
    frmSeats.classList.add("show");
})

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }

    updateSelectedCount();
});

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.fila .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

btnPlus.addEventListener("click", e => {
    cant = cant + 1;
    cantAsientos.innerHTML = cant;
    ticketPrice.classList.innerHTML = cant * ticketPrice;
});

btnMinus.addEventListener("click", e => {
    if (cant !== 0) {
        cant = cant - 1;
        cantAsientos.innerHTML = cant;
    }
});
//Lógica de los asientos sala--------------------
var app = angular.module("compra", []);
app.controller("compraController", function($scope) {
    //variables
    $scope.asientos;
    $scope.capacidad;
    //Llamadas
    getCapacidad().then(function(response) {
        $scope.capacidad = response[0].capacidad_sala;
        console.log(capacidad);
    });
    generarAsientos($scope.capacidad);
    //Métodos
    function generarAsientos(capacidad) {
        let filas = 5;
        let columnas = 6;
        let asientos_sala = [];
        if (capacidad == 60) {
            filas = 6;
            columnas = 10;
        }
        for (let i = 1; i <= filas; i++) {
            asientos_sala[i] = [];
            for (let j = 1; j <= columnas; j++) {
                asientos_sala[i].push(i + "" + j);
            }
        }
        $scope.asientos = asientos_sala;
    }
});






//-----------------------------------------Backend----------------------------------------------
async function getCapacidad() {
    const response = await fetch(`http://localhost:3000/api/reserva/capacidad/${id_funcion}`);
    const data = await response.json();
    return data;
}