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
    const response = await fetch(`https://backend-hypercine.onrender.com/api/peliculas`);
    const data = await response.json();
    return data;
}

async function eliminarPelicula(id_pelicula) {
    const options = {
        method: 'DELETE'
    };
    try {
        const response = await fetch(`https://backend-hypercine.onrender.com/api/pelicula/${id_pelicula}`, options);
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