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