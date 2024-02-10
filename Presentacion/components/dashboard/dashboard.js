let usuarios_diario = [];
const ctx = document.getElementById('realTimeChart').getContext('2d');

obtenerUsuariosRegistroDiarios().then(function(response) {
    const data = {
        labels: Object.keys(usuarios_diario),
        datasets: [{
            label: 'Usuarios en tiempo real',
            borderColor: 'rgb(75, 192, 192)',
            data: Object.values(usuarios_diario),
            fill: false,
        }],
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },

    };
    const realTimeChart = new Chart(ctx, config);
});

async function obtenerUsuariosRegistroDiarios() {
    await fetch('http://localhost:3000/api/dashboard/usuariosregistro')
        .then(response => response.json())
        .then(response => usuarios_diario = response);

}