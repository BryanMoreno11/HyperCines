var app = angular.module("editSala", []);
app.controller("editSalaController", function($scope) {
    $scope.params = new URLSearchParams(document.location.search);
    $scope.id_sala = $scope.params.get('id_sala');
    $scope.modificar = false;
    $scope.complejos;
    $scope.sala;
    let modificar
    console.log($scope.id_sala );
    cargarComplejos().then(function(response) {
        $scope.complejos = response;
        $scope.$apply();
    });

    if ($scope.id_sala) {
        modificar = true;
        cargarSala($scope.id_sala).then(function(response) {
            console.log(response)
            $scope.sala = response;
            $scope.sala.id_complejo = String($scope.sala.id_complejo);
            $scope.sala.capacidad = String($scope.sala.capacidad);
            $scope.$apply();
        });
    }

    document.getElementById('formulario').addEventListener("submit", e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        console.log(data);
        if (modificar == true) {
            modificarSala(data, $scope.id_sala).then(function(response) {
                if (response.ok) {
                    Swal.fire({
                        title: "La sala ha sido modificada con éxito!",
                        icon: "success"
                    }).then(function() {
                        window.location.href = "../adminSala/adminSala.html";
                    });

                }
            });
        } else {
            insertarSala(data).then(function(response) {
                if (response.ok) {
                    Swal.fire({
                        title: "La sala ha sido insertada con éxito!",
                        icon: "success"
                    }).then(function() {
                        window.location.href = "../adminSala/adminSala.html";

                    });
                }

            })


        }
    });
})

async function cargarSala(id_sala) {
    const response = await fetch(`http://localhost:3000/api/sala/${id_sala}`);
    const data = await response.json();
    return data;
}

async function cargarComplejos() {
    const response = await fetch(`http://localhost:3000/api/complejos`);
    const data = await response.json();
    return data;
}

async function modificarSala(data, id_sala) {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(`http://localhost:3000/api/sala/${id_sala}`, options);
        const responseData = await response.json();
        console.log("el ususario luego de modificar", responseData);

        return { ok: response.ok, responseData };
    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
}

async function insertarSala(data) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(`http://localhost:3000/api/sala`, options);
        const responseData = await response.json();
        console.log("el ususario luego de insertar", responseData);
        return { ok: response.ok, responseData };
    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
}