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
            console.log("el nombre de la reserva", reserva.nombre_pelicula)
            let texto = `${reserva.nombre_pelicula} ${reserva.codigo_reserva}`.toLowerCase();
            searchText = searchText.toLowerCase();
            if (texto.indexOf(searchText) > -1) {
                console.log("XD");
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
    $scope.id_usuario_actual = "";
    //llamadas
    $scope.id_usuario_actual = localStorage.getItem("usuario");
    if ($scope.id_usuario_actual) {
        cargarReservas($scope.id_usuario_actual).then(function(response) {
            $scope.reservas = response;
            $scope.$apply();
            console.log("Las reservas son ", $scope.reservas);

        });
    }
    //métodos


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
async function cargarReservas(id_usuario) {
    const response = await fetch(`http://localhost:3000/api/reservas/full/usuario/${id_usuario}`);
    const data = await response.json();
    return data;
}