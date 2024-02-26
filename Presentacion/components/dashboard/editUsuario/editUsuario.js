var app = angular.module("editUsuario", []);
app.controller("editUsuarioController", function($scope) {
    // Obtener id_funcion
    $scope.params = new URLSearchParams(document.location.search);
    $scope.id_usuario = $scope.params.get('id_usuario');
    console.log($scope.id_usuario)
    // Variables
    $scope.modificar = false;
    $scope.usuario;

    if ($scope.id_usuario) {
        $scope.modificar = true;
        cargarUsuario($scope.id_usuario).then(function(response) {
            console.log(response)
            $scope.usuario = response;
            $scope.$apply();
        });
    }


    document.getElementById('formulario').addEventListener("submit", e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        console.log(data);
        if ($scope.modificar) {
            modificarUsuario(data, $scope.id_usuario).then(function(response) {
                if (response.ok) {
                    Swal.fire({
                        title: "El usuario ha sido modificado con éxito!",
                        icon: "success"
                    }).then(function() {
                        window.location.href = "../adminUsuario/adminUsuario.html";
                    });
                }
            });
        } else {
            insertarUsuario(data).then(function(response) {
                if (response.ok) {
                    Swal.fire({
                        title: "El usuario ha sido agregado con éxito!",
                        icon: "success"
                    }).then(function() {
                        window.location.href = "../adminUsuario/adminUsuario.html";
                    });
                }
            });
        }
    });
});


async function cargarUsuario(id_usuario) {
    const response = await fetch(`http://localhost:3000/api/usuario/${id_usuario}`);
    const data = await response.json();
    return data;
}

async function modificarUsuario(data, id_usuario) {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(`http://localhost:3000/api/usuario/${id_usuario}`, options);
        const responseData = await response.json();
        console.log("El usuario después de modificar", responseData);
        return { ok: response.ok, responseData };
    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
}

async function insertarUsuario(data) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(`http://localhost:3000/api/usuario`, options);
        const responseData = await response.json();
        console.log("El usuario después de insertar", responseData);
        return { ok: response.ok, responseData };
    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
}