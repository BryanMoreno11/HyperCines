var app = angular.module("adminSala", []);

app.controller("adminSalaController", function($scope) {
    // Variables
    $scope.salas = [];

    // Llamadas
    listarSalas();

    // Métodos
    function listarSalas() {
        cargarSalas().then(function(response) {
            $scope.salas = response;
            $scope.$apply();
        });
    }

    $scope.borrarSala = async function borrarSala(id_sala) {
        Swal.fire({
            title: "¿Está seguro de eliminar la sala?",
            text: "No podrá revertir esta acción.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then(async(result) => {
            if (result.isConfirmed) {
                const resultado = await eliminarSala(id_sala);
                $scope.$apply();
                if (resultado.ok == false) {
                    Swal.fire({
                        title: "Error",
                        text: "No es posible eliminar esta sala porque tiene funciones asociadas.",
                        icon: "error"
                    });
                } else {
                    listarSalas();
                    Swal.fire({
                        title: "La sala ha sido eliminada con éxito",
                        icon: "success"
                    });
                }
            }
        });
    }

    $scope.irEdit = function irEdit(id_sala) {
        window.location.href = `../editSala/editSala.html?id_sala=${id_sala}`;
    }
});

// Conexión con el Backend   
async function cargarSalas() {
    const response = await fetch(`http://localhost:3000/api/salas`);
    const data = await response.json();

    const complejoIds = data.map(sala => sala.id_complejo);
    const complejosResponse = await fetch(`http://localhost:3000/api/complejos?ids=${complejoIds.join(',')}`);
    const complejosData = await complejosResponse.json();

    // Asignar nombres de complejo a cada sala
    for (const sala of data) {
        const complejo = complejosData.find(c => c.id_complejo === sala.id_complejo);
        sala.nombreComplejo = complejo ? complejo.nombre_complejo : 'Desconocido';
    }

    return data;
}


async function eliminarSala(id_sala) {
    const options = {
        method: 'DELETE'
    };
    try {
        const response = await fetch(`http://localhost:3000/api/sala/${id_sala}`, options);
        const responseData = await response.json();
        return { ok: response.ok, responseData };
    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
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