var app = angular.module("adminPelicula", []);
app.controller("adminPeliculaController", function($scope) {
    //variables
    $scope.peliculas = [];
    //llamadas
    listarPeliculas();
    //métodos
    function listarPeliculas() {
        cargarPeliculas().then(function(response) {
            $scope.peliculas = response;
            $scope.$apply();
        });
    }
    $scope.borrarPelicula = async function borrarPelicula(id_pelicula) {
        Swal.fire({
            title: "Esta seguro de eliminar la película?",
            text: "No podras revertir esa acción!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                const resultado = await eliminarPelicula(id_pelicula);
                $scope.$apply();
                if (resultado.ok == false) {
                    Swal.fire({
                        title: "Error!",
                        text: "No es posible eliminar esa película porque tiene funciones asociadas",
                        icon: "error"
                    });
                } else {
                    listarPeliculas();
                    Swal.fire({
                        title: "La película ha sido eliminada con  éxito!",
                        icon: "success"
                    });
                }
            }
        });
    }

    $scope.irEdit = function irEdit(id_pelicula) {
        window.location.href = `../editPelicula/editPelicula.html?id_pelicula=${id_pelicula}`;
    }

});
//Conexión con el Backend   
async function cargarPeliculas() {
    const response = await fetch(`http://localhost:3000/api/peliculas`);
    const data = await response.json();
    return data;
}

async function eliminarPelicula(id_pelicula) {
    const options = {
        method: 'DELETE'
    };
    try {
        const response = await fetch(`http://localhost:3000/api/pelicula/${id_pelicula}`, options);
        const responseData = await response.json();
        return { ok: response.ok, responseData };

    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
}