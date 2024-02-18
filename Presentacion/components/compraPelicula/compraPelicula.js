//--------------------------------------Variables Globales----------------------------
let id_funcion = 1;
let cant = 1;
var app = angular.module("compra", []);
let asientos_seleccionados = [];

//-------------------------------------------Lógica del componente------------------
app.controller("compraController", function($scope) {
    //variables
    $scope.asientos;
    $scope.capacidad;
    $scope.asientos_ocupados;
    $scope.seat_aux;
    $scope.posicion_aux;
    //Llamadas
    getCapacidad().then(function(response) {
        $scope.capacidad = response[0].capacidad_sala;
        getAsientosOcupados().then(function(response) {
            $scope.asientos_ocupados = response;
            console.log($scope.asientos_ocupados);
            generarAsientos($scope.capacidad);
            $scope.$apply();
        });
    });
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
                let asiento = {
                    posicion: (i + "" + j),
                    estado: "none"
                };
                if (!$scope.asientos_ocupados.message) {
                    for (let asiento_ocupado of $scope.asientos_ocupados) {
                        if (asiento_ocupado.posicion_asiento == asiento.posicion) {
                            asiento.estado = "occupied";
                        }
                    }
                }
                asientos_sala[i].push(asiento);
            }
        }
        $scope.asientos = asientos_sala;
    }

    $scope.selectSeat = function(e, posicion) {
        let selectedSeats = document.querySelectorAll('.fila .seat.selected');
        if (selectedSeats.length == cant && !(e.target.classList.contains("selected"))) {
            $scope.seat_aux.classList.toggle('selected');
            asientos_seleccionados.splice(asientos_seleccionados.indexOf($scope.posicion_aux), 1);
        }
        if (!e.target.classList.contains('occupied')) {
            e.target.classList.toggle('selected');
        }
        selectedSeats = document.querySelectorAll('.fila .seat.selected');
        if (selectedSeats.length == cant) {
            $scope.seat_aux = e.target;
            $scope.posicion_aux = posicion;
        }
        console.log(e.target);
        if (e.target.classList.contains("selected")) {
            asientos_seleccionados.push(posicion);
        } else {
            asientos_seleccionados.splice(asientos_seleccionados.indexOf(posicion), 1);
        }
        console.log(asientos_seleccionados);
        updateSelectedCount();
    }
});
//--------------------------------------Manipulación del DOM--------------------------------------
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

//Métodos------------------------------------------------------------------
btnSiguiente.addEventListener("click", e => {
    window.alert("Ahora estas en   las entradas");
    //generarAsientos();
    frmDetails.classList.remove("show");
    frmDetails.classList.add("hide");
    frmSeats.classList.remove("hide");
    frmSeats.classList.add("show");
});

btnVolver.addEventListener("click", e => {
    window.alert("volvio a la pantalla princial");
    frmDetails.classList.remove("hide");
    frmDetails.classList.add("show");
    frmSeats.classList.remove("show");
    frmSeats.classList.add("hide");
    let selectedSeats = document.querySelectorAll('.fila .seat.selected');
    selectedSeats.forEach(function(seat) {
        seat.classList.remove("selected");
    });
    updateSelectedCount();
    asientos_seleccionados = [];
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
    /*
    container.addEventListener('click', (e) => {
        let selectedSeats = document.querySelectorAll('.fila .seat.selected');
        if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
            if (selectedSeats.length == cant && !(e.target.classList.contains("selected"))) {
                selectedSeats[cant - 1].classList.toggle('selected');
            }
            e.target.classList.toggle('selected');
        }
        selectedSeats = document.querySelectorAll('.fila .seat.selected');
        console.log(selectedSeats);
        updateSelectedCount();
    });
    */


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
    if (cant > 1) {
        cant = cant - 1;
        cantAsientos.innerHTML = cant;
    }
});
//--------------------------------------------Backend-------------------------------------------------
async function getCapacidad() {
    const response = await fetch(`http://localhost:3000/api/reserva/capacidad/${id_funcion}`);
    const data = await response.json();
    return data;
}

async function getAsientosOcupados() {
    const response = await fetch(`http://localhost:3000/api/reserva/asientos/${id_funcion}`);
    const data = await response.json();
    return data;
}