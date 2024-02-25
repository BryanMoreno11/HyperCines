//varuables
let fecha = new Date();
fecha.setMinutes(fecha.getMinutes() + 10);
let id_usuario;
let params = new URLSearchParams(document.location.search);
const id_funcion = params.get('id_funcion');
console.log(id_funcion);
//Animacione
const btnSignIn = document.getElementById("sign-in");
const btnSignUp = document.getElementById("sign-up");
const formRegister = document.querySelector(".register");
const formLogin = document.querySelector(".login");
const btnVolver = document.getElementById("back-in");

btnVolver.addEventListener("click", e => {
    window.location.href = `../cine/cine.html`;
})


btnSignIn.addEventListener("click", e => {
    formRegister.classList.add("hide");
    formLogin.classList.remove("hide");
});

btnSignUp.addEventListener("click", e => {
    formLogin.classList.add("hide");
    formRegister.classList.remove("hide");
});
//Aceder a los datos del formulario
document.getElementById("registro").addEventListener("submit", async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log(data);
    const response = await registrarUsuario(data);
    if (response.ok) {
        Swal.fire({
            title: "Registro éxitoso",
            icon: "success"
        });
    } else {
        Swal.fire({
            title: "El correo ingresado ya fue utilizado",
            icon: "error"
        });

    }
});

document.getElementById("login").addEventListener("submit", async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log(data);
    const response = await verificarUsuario(data);
    id_usuario = response.responseData;
    if (response.ok) {
        localStorage.setItem("usuario", String(id_usuario));
        Swal.fire({
            title: "Acceso éxitoso",
            icon: "success"
        }).then(function() {
            if (id_funcion) {
                window.location.href = `../compraPelicula/compraPelicula.html?id_funcion=${id_usuario}&id_usuario=${id_usuario}`;
            } else {
                window.location.href = `../cine/cine.html`;

            }
        });
    } else {
        Swal.fire({
            title: "Error!",
            text: "Credenciales Incorrectas",
            icon: "error"
        });

    }
});
//Conexión con los endpoint
async function registrarUsuario(data) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch('http://localhost:3000/api/usuario', options);
        const responseData = await response.json();
        return { ok: response.ok, responseData };

    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
}

async function verificarUsuario(data) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch('http://localhost:3000/api/usuario/verificar', options);
        const responseData = await response.json();
        return { ok: response.ok, responseData };

    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
}