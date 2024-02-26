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
    const response = await fetch(`http://localhost:3000/api/usuarios`);
    const data = await response.json();
    return data;
}

async function eliminarUsuario(id_usuario) {
    const options = {
        method: 'DELETE'
    };
    try {
        const response = await fetch(`http://localhost:3000/api/usuario/${id_usuario}`, options);
        const responseData = await response.json();
        return { ok: response.ok, responseData };

    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
}
