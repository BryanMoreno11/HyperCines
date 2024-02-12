var app = angular.module("adminFuncion", []);
app.controller("adminFuncionController", function($scope) {
    //variables
    $scope.funciones = [];
    //llamadas
    listarFunciones();
    //métodos
    function listarFunciones() {
        cargarFunciones().then(function(response) {
            $scope.funciones = response;
            $scope.funciones = $scope.funciones.map(funcion => {
                let ob = Object.assign(funcion)
                let fecha = new Date(funcion.fecha);
                fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
                ob.fecha = fecha
                return ob;
            });
            $scope.$apply();
        });
    }
    $scope.borrarFuncion = async function borrarFuncion(id_funcion) {
        Swal.fire({
            title: "¿Está seguro de eliminar la función?",
            text: "Esta acción no se puede revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then(async(result) => {
            if (result.isConfirmed) {
                const resultado = await eliminarFuncion(id_funcion);
                $scope.$apply();
                if (resultado.ok == false) {
                    Swal.fire({
                        title: "Error",
                        text: "No se puede eliminar la función porque tiene reservas asociadas",
                        icon: "error"
                    });
                } else {
                    listarFunciones();
                    Swal.fire({
                        title: "¡Función eliminada con éxito!",
                        icon: "success"
                    });
                }
            }
        });
    }

    $scope.irEdit = function irEdit(id_funcion) {
        window.location.href = `../editFuncion/editFuncion.html?id_funcion=${id_funcion}`;
    }

});
//Conexión con el Backend   
async function cargarFunciones() {
    const response = await fetch(`http://localhost:3000/api/funciones`);
    const data = await response.json();
    return data;
}

async function eliminarFuncion(id_funcion) {
    const options = {
        method: 'DELETE'
    };
    try {
        const response = await fetch(`http://localhost:3000/api/funcion/${id_funcion}`, options);
        const responseData = await response.json();
        return { ok: response.ok, responseData };

    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
}