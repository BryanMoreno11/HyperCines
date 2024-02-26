var app = angular.module("adminUsuario", []);
app.controller("adminUsuarioController", function($scope) {
    //variables
    $scope.usuarios = [];
    //llamadas
    listarUsuarios();
    //métodos
    function listarUsuarios() {
        cargarUsuarios().then(function(response) {
            $scope.usuarios = response;
            $scope.$apply();
        });
    }
    $scope.borrarUsuario = async function borrarUsuario(id_usuario) {
        Swal.fire({
            title: "¿Está seguro de eliminar el usuario?",
            text: "Esta acción no se puede revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then(async(result) => {
            if (result.isConfirmed) {
                const resultado = await eliminarUsuario(id_usuario);
                $scope.$apply();
                if (resultado.ok == false) {
                    Swal.fire({
                        title: "Error",
                        text: "No se puede eliminar el usuario",
                        icon: "error"
                    });
                } else {
                    listarUsuarios();
                    Swal.fire({
                        title: "¡Usuario eliminado con éxito!",
                        icon: "success"
                    });
                }
            }
        });
    }

    $scope.irEdit = function irEdit(id_usuario) {
        window.location.href = `../editUsuario/editUsuario.html?id_usuario=${id_usuario}`;
    }

});

// Conexión con el Backend
async function cargarUsuarios() {
    const response = await fetch(`https://backend-hypercine.onrender.com/api/usuarios`);
    const data = await response.json();
    return data;
}

async function eliminarUsuario(id_usuario) {
    const options = {
        method: 'DELETE'
    };
    try {
        const response = await fetch(`https://backend-hypercine.onrender.com/api/usuario/${id_usuario}`, options);
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