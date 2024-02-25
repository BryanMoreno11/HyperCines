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
