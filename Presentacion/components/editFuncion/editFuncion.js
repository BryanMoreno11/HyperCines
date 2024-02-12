var app = angular.module("editFuncion", []);
app.controller("editFuncionController", function($scope) {
    // Obtener id_funcion
    $scope.params = new URLSearchParams(document.location.search);
    $scope.id_funcion = $scope.params.get('id_funcion');
    // Variables
    $scope.modificar = false;
    $scope.peliculas;
    $scope.salas;
    $scope.asientos_disponibles;
    $scope.fecha_funcion = new Date();
    $scope.fecha_funcion.setSeconds(0, 0);
    $scope.funcion;

    // Código inicial
    cargarPeliculas().then(function(response) {
        $scope.peliculas = response;
        $scope.$apply();
    });

    cargarSalas().then(function(response) {
        $scope.salas = response;
        $scope.$apply();
    });

    if ($scope.id_funcion) {
        $scope.modificar = true;
        cargarFuncion($scope.id_funcion).then(function(response) {
            $scope.funcion = response[0];
            $scope.asientos_disponibles = $scope.funcion.asientos_disponibles;
            $scope.funcion.id_pelicula = String($scope.funcion.id_pelicula);
            $scope.funcion.id_sala = String($scope.funcion.id_sala);
            $scope.fecha_funcion = new Date(response[0].fecha);
            $scope.fecha_funcion.setMinutes($scope.fecha_funcion.getMinutes() + $scope.fecha_funcion.getTimezoneOffset());
            console.log($scope.fecha_funcion);
            $scope.$apply();
        });
    }

    // Métodos
    $scope.changeSala = function changeSala(id_sala) {
        let sala = $scope.obtenerSala(id_sala);
        if (sala) {
            $scope.asientos_disponibles = $scope.obtenerSala(id_sala).capacidad;
        } else {
            $scope.asientos_disponibles = "";
        }

    }

    $scope.obtenerSala = function obtenerSala(id_sala) {
        let sala = $scope.salas.find(sala => sala.id_sala == id_sala);
        return sala;
    }

    document.getElementById('formulario').addEventListener("submit", e => {
        e.preventDefault();
        document.getElementById("asientos_disponibles").disabled = false;
        const data = Object.fromEntries(new FormData(e.target));
        console.log(data);
        if ($scope.modificar) {
            modificarFuncion(data, $scope.id_funcion).then(function(response) {
                if (response.ok) {
                    Swal.fire({
                        title: "La función ha sido modificada con éxito!",
                        icon: "success"
                    }).then(function() {
                        window.location.href = "../adminFuncion/adminFuncion.html";
                    });
                }
            });
        } else {
            insertarFuncion(data).then(function(response) {
                if (response.ok) {
                    Swal.fire({
                        title: "La función ha sido insertada con éxito!",
                        icon: "success"
                    }).then(function() {
                        window.location.href = "../adminFuncion/adminFuncion.html";
                    });
                }
            });
        }
    });
});

// Conexión con el backend
async function cargarPeliculas() {
    const response = await fetch(`http://localhost:3000/api/peliculas`);
    const data = await response.json();
    return data;
}

async function cargarSalas() {
    const response = await fetch(`http://localhost:3000/api/salas`);
    const data = await response.json();
    return data;
}

async function cargarFuncion(id_funcion) {
    const response = await fetch(`http://localhost:3000/api/funcion/${id_funcion}`);
    const data = await response.json();
    return data;
}

async function modificarFuncion(data, id_funcion) {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(`http://localhost:3000/api/funcion/${id_funcion}`, options);
        const responseData = await response.json();
        console.log("El usuario después de modificar", responseData);
        return { ok: response.ok, responseData };
    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
}

async function insertarFuncion(data) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(`http://localhost:3000/api/funcion`, options);
        const responseData = await response.json();
        console.log("El usuario después de insertar", responseData);
        return { ok: response.ok, responseData };
    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
}