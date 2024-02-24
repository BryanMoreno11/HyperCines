//--------------------------------------Variables Globales----------------------------
let params = new URLSearchParams(document.location.search);
let id_funcion = params.get('id_funcion');
let id_usuario = params.get('id_usuario');
let cant = 1;
let asientos_seleccionados = [];
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
//-------------------------------------------Lógica del componente------------------
var app = angular.module("compra", []);
app.controller("compraController", function($scope) {
    //variables
    $scope.funcion;
    $scope.precio_total;
    $scope.precio_total_asiento = 0;
    $scope.asientos;
    $scope.capacidad;
    $scope.asientos_ocupados;
    $scope.seat_aux;
    $scope.posicion_aux;
    $scope.reserva_full;
    //Llamadas
    getFuncion().then(function(response) {
        $scope.funcion = response[0];
        $scope.precio_total = $scope.funcion.precio;
        console.log($scope.funcion);
    })

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
        for (let i = 0; i < filas; i++) {
            asientos_sala[i] = [];
            for (let j = 1; j <= columnas; j++) {
                let asiento = {
                    posicion: String.fromCharCode((65 + i)) + "" + j,
                    estado: "none"
                };
                if (!$scope.asientos_ocupados.message) {
                    for (let asiento_ocupado of $scope.asientos_ocupados) {
                        if (asiento_ocupado.posicion_asiento == asiento.posicion && asiento_ocupado.id_usuario == id_usuario) {
                            asiento.estado = "own";
                        } else if (asiento_ocupado.posicion_asiento == asiento.posicion) {
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
        if (selectedSeats.length == cant && !(e.target.classList.contains("selected")) && !(e.target.classList.contains("occupied")) &&
            !(e.target.classList.contains("own"))) {
            $scope.seat_aux.classList.toggle('selected');
            asientos_seleccionados.splice(asientos_seleccionados.indexOf($scope.posicion_aux), 1);
        }
        if (!e.target.classList.contains('occupied') && !e.target.classList.contains('own')) {
            e.target.classList.toggle('selected');
        }
        selectedSeats = document.querySelectorAll('.fila .seat.selected');
        if (selectedSeats.length == cant && !(e.target.classList.contains("occupied")) && !(e.target.classList.contains("own"))) {
            $scope.seat_aux = e.target;
            $scope.posicion_aux = posicion;
        }
        console.log(e.target);
        if (e.target.classList.contains("selected")) {
            asientos_seleccionados.push(posicion);
        } else if (!e.target.classList.contains("occupied") & !(e.target.classList.contains("own"))) {
            asientos_seleccionados.splice(asientos_seleccionados.indexOf(posicion), 1);
        }
        console.log(asientos_seleccionados);
        updateSelectedCount();
    }

    function updateSelectedCount() {
        const selectedSeats = document.querySelectorAll('.fila .seat.selected');
        const selectedSeatsCount = selectedSeats.length;
        count.innerText = selectedSeatsCount;
        $scope.precio_total_asiento = selectedSeatsCount * $scope.funcion.precio;
    }

    btnPlus.addEventListener("click", e => {
        cant = cant + 1;
        cantAsientos.innerHTML = cant;
        $scope.precio_total = cant * $scope.funcion.precio;
        $scope.$apply();
    });

    btnMinus.addEventListener("click", e => {
        if (cant > 1) {
            cant = cant - 1;
            cantAsientos.innerHTML = cant;
            $scope.precio_total = cant * $scope.funcion.precio;
            $scope.$apply();
        }
    });

    btnSiguiente.addEventListener("click", e => {
        if (cant <= $scope.funcion.asientos_disponibles) {
            frmDetails.classList.remove("show");
            frmDetails.classList.add("hide");
            frmSeats.classList.remove("hide");
            frmSeats.classList.add("show");
        } else {
            Swal.fire({
                title: "Error!",
                text: `Solo hay ${$scope.funcion.asientos_disponibles} asientos disponibles`,
                icon: "error"
            });
        }
    });

    btnNextSeat.addEventListener("click", e => {
        if (asientos_seleccionados.length == cant) {
            frmSeats.classList.add("hide");
            frmSeats.classList.remove("show");
            frmPayMethods.classList.remove("hide");
            frmPayMethods.classList.add("show");
        } else {
            Swal.fire({
                title: "Error!",
                text: `Debe seleccionar ${cant} asientos`,
                icon: "error"
            });
        }

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

    btnVolverPay.addEventListener("click", e => {
        window.alert("Ahora estas volviando a  las entradas");
        frmPayMethods.classList.remove("show");
        frmPayMethods.classList.add("hide");
        frmSeats.classList.remove("hide");
        frmSeats.classList.add("show");
    })

    document.getElementById("compra").addEventListener("submit", async e => {
        const data = Object.fromEntries(new FormData(e.target));
        let id_reserva;
        let reserva = {
            id_usuario: id_usuario,
            id_funcion: id_funcion,
            cantidad: cant,
            total: $scope.precio_total,
            codigo_reserva: generarCodigoReserva(id_funcion, id_usuario)
        }
        if (Number(data.anio) >= new Date().getFullYear() && Number(data.mes) >= new Date().getMonth()) {
            insertarReserva(reserva).then(function(response) {
                console.log("El objeto es", response.responseData)
                id_reserva = response.responseData.id_reserva;
                console.log(id_reserva);
                for (let asiento of asientos_seleccionados) {
                    let detalle_reserva = {
                        id_reserva: id_reserva,
                        posicion_asiento: asiento
                    }
                    insertarDetalleReserva(detalle_reserva).then(function() {
                        console.log(detalle_reserva);
                    })


                }
                getReservaFull(id_reserva).then(function(response) {
                    $scope.reserva_full = response[0];
                    console.log($scope.reserva_full);
                })
                window.alert("Compra exitosa");
            });



        }
    });

    function generarCodigoReserva(id_funcion, id_usuario) {
        let codigo_reserva = String((new Date()).getTime());
        codigo_reserva = codigo_reserva.slice(-4);
        return id_funcion + "" + id_usuario + "" + codigo_reserva;
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

async function getFuncion() {
    const response = await fetch(`http://localhost:3000/api/funcion/todo/${id_funcion}`);
    const data = await response.json();
    return data;
}

async function insertarReserva(reserva) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reserva)
    };
    try {
        const response = await fetch('http://localhost:3000/api/reserva', options);
        const responseData = await response.json();
        return { ok: response.ok, responseData };

    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
}

async function insertarDetalleReserva(detalleReserva) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(detalleReserva)
    };
    try {
        const response = await fetch('http://localhost:3000/api/reserva/detalle', options);
        const responseData = await response.json();
        return { ok: response.ok, responseData };

    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
}

async function getReservaFull(id_reserva) {
    const response = await fetch(`http://localhost:3000/api/reserva/full/${id_reserva}`);
    const data = await response.json();
    return data;
}