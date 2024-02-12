var app = angular.module("editPelicula", []);
app.controller("editPeliculaController", function($scope) {
    //obtener id_pelicula
    $scope.params = new URLSearchParams(document.location.search);
    $scope.id_pelicula = $scope.params.get('id_pelicula');
    //variables
    $scope.modificar = false;
    $scope.generos;
    $scope.clasificaciones;
    $scope.fecha_estreno = new Date();
    $scope.pelicula;
    let modificar
        //Código inicial
    cargarGeneros().then(function(response) {
        $scope.generos = response;
        $scope.$apply();
    });
    cargarClasificaciones().then(function(response) {
        $scope.clasificaciones = response;
        $scope.$apply();
    })
    if ($scope.id_pelicula) {
        modificar = true;
        cargarPelicula($scope.id_pelicula).then(function(response) {
            $scope.pelicula = response[0];
            $scope.pelicula.id_genero = String($scope.pelicula.id_genero);
            $scope.pelicula.id_clasificacion = String($scope.pelicula.id_clasificacion);
            $scope.fecha_estreno = new Date(response[0].fecha_estreno);
            $scope.$apply();
        });
    }
    //métodos
    $scope.change = function change() {
        console.log($scope.pelicula.id_genero);
    }

    document.getElementById('formulario').addEventListener("submit", e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        console.log(data);
        if (modificar == true) {
            modificarPelicula(data, $scope.id_pelicula).then(function(response) {
                if (response.ok) {
                    Swal.fire({
                        title: "La película ha sido modificada con éxito!",
                        icon: "success"
                    }).then(function() {
                        window.location.href = "../adminPelicula/adminPelicula.html";
                    });

                }
            });
        } else {
            insertarPelicula(data).then(function(response) {
                if (response.ok) {
                    Swal.fire({
                        title: "La película ha sido insertada con éxito!",
                        icon: "success"
                    }).then(function() {
                        window.location.href = "../adminPelicula/adminPelicula.html";

                    });
                }

            })


        }
    });
});
//Conexión con el backend
async function cargarPelicula(id_pelicula) {
    const response = await fetch(`http://localhost:3000/api/pelicula/${id_pelicula}`);
    const data = await response.json();
    return data;
}

async function cargarGeneros() {
    const response = await fetch(`http://localhost:3000/api/generos`);
    const data = await response.json();
    return data;
}

async function cargarClasificaciones() {
    const response = await fetch(`http://localhost:3000/api/clasificaciones`);
    const data = await response.json();
    return data;
}

async function modificarPelicula(data, id_pelicula) {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(`http://localhost:3000/api/pelicula/${id_pelicula}`, options);
        const responseData = await response.json();
        console.log("el ususario luego de modificar", responseData);

        return { ok: response.ok, responseData };
    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
}

async function insertarPelicula(data) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(`http://localhost:3000/api/pelicula`, options);
        const responseData = await response.json();
        console.log("el ususario luego de insertar", responseData);
        return { ok: response.ok, responseData };
    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
}