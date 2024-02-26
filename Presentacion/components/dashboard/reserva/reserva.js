const modal = document.getElementById('modal');
const closeBtn = document.getElementsByClassName('close')[0];
//Lógica de la aplicación
var app = angular.module("adminReserva", []).filter("busqueda", function() {
    return function(reservas, searchText) {
        let result = [];
        if (!reservas || !searchText) {
            return reservas;
        }
        for (let reserva of reservas) {
            let texto = `${reserva.codigo_reserva} ${reserva.cedula}`
            if (texto.indexOf(searchText) > -1) {
                result.push(reserva);
            }
        }
        if (result.length == 0) {
            return reservas;
        }
        return result;
    };
});
app.controller("reservaController", function($scope) {
    //variables
    $scope.reservas = [];
    $scope.reserva;
    $scope.searchText = "";
    //llamadas
    listarReservas();
    //métodos
    function listarReservas() {
        cargarReservas().then(function(response) {
            $scope.reservas = response;
            $scope.$apply();
        });
    }
    $scope.abrirModal = function(reserva) {
        $scope.reserva = reserva;
        console.log($scope.reserva);
        modal.style.display = 'block';
    }

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

});
//Conexión con el Backend   
async function cargarReservas() {
    const response = await fetch(`http://localhost:3000/api/reservas/full`);
    const data = await response.json();
    return data;
}


// Ejecutar función en el evento click
document.getElementById("btn_open").addEventListener("click", open_close_menu);

// Declaramos variables
var side_menu = document.getElementById("menu_side");
var body = document.getElementById("body");

// Evento para mostrar y ocultar menú
function open_close_menu() {
    body.classList.toggle("body_move");
    side_menu.classList.toggle("menu__side_move");
}

// Si el ancho de la página es menor a 760px, ocultará el menú al recargar la página
if (window.innerWidth < 760) {
    body.classList.add("body_move");
    side_menu.classList.add("menu__side_move");
}

// Haciendo el menú responsive (adaptable)
window.addEventListener("resize", function() {
    if (window.innerWidth > 760) {
        body.classList.remove("body_move");
        side_menu.classList.remove("menu__side_move");
    } else {
        // Si el menú está abierto y el ancho de la página es menor a 760px, mantener el menú abierto
        if (body.classList.contains("body_move")) {
            side_menu.classList.add("menu__side_move");
        }
    }
});