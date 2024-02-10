//Animacione
const btnSignIn = document.getElementById("sign-in");
const btnSignUp = document.getElementById("sign-up");
const formRegister = document.querySelector(".register");
const formLogin = document.querySelector(".login");

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
    console.log(response);
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
    console.log(response);
    if (response.ok) {
        Swal.fire({
            title: "Acceso éxitoso",
            icon: "success"
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