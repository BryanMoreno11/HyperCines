//variables del DOOM
var bar = document.getElementById("myBarGraph").getContext("2d");
var leftbar = document.getElementById("myLeftBarGraph").getContext("2d");
var line = document.getElementById("mylineGraph").getContext("2d");
var line2 = document.getElementById("myLineGraph2").getContext("2d");
var donut = document.getElementById("myDonutGraph").getContext("2d");
var circle = document.getElementById("myCircleGraph").getContext("2d");
//Variables globales
let recaudacion;
let recaudacion_pelicula;
let recaudacion_ciudad;
let entradas_semana;
let entradas_pelicula;
let entradas_genero;
let recaudacion_clasificacion;
Chart.register(ChartDataLabels);
Chart.defaults.set('plugins.datalabels', {
    color: 'black',
    align: 'end',
    font: {
        weight: 'bold'
    }
});
//llamadas
graficarRecaudacionSemanal();
graficarRecaudacionPelicula();
graficarEntradasPelicula();
graficarEntradasSemana();
graficarEntradasGenero();
graficarRecaudacionClasificacion();
console.log(recaudacionCiudad);

//Funciones
function generarColores(longitug) {
    var colors = [];
    const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
    const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
    for (let i = 0; i < longitug; i++) {
        colors.push(randomRGB());
    }
    return colors;
}

function saveAsPDF() {
    const jsPDF = window.jspdf.jsPDF;
    let index = 1;
    let pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: 'a4',
        compress: true,
    })
    const canvas = document.querySelectorAll("canvas");
    let pageWidth = 400;
    let pageHeight = 400;
    index = 1;
    canvas.forEach((canva) => {
        pdf.addImage(canva, 'PNG', 10, 10, pageWidth, pageHeight, `img${index}`, "FAST");
        if (index < canvas.length) {
            pdf.addPage();
        }
        index++;
    });
    pdf.save('Reporte.pdf');
}
//Gráficos
async function graficarRecaudacionPelicula() {
    let label = [];
    await recaudacionPelicula();
    console.log("pelis", recaudacion_pelicula);

    let colores = generarColores(Object.keys(recaudacion_pelicula).length);
    console.log("los colores", colores)
    console.log(label);
    var myBarGraph = new Chart(bar, {
        type: "bar",
        data: {
            labels: Object.keys(recaudacion_pelicula),
            datasets: [{
                label: "Recaudación Semanal por Película",
                data: Object.values(recaudacion_pelicula),
                backgroundColor: colores,
                borderColor: colores,
                borderWidth: 2
            }, ]
        },

        options: {
            tooltips: {
                cornerRadius: 0,
                caretSize: 0,
                xPadding: 16,
                yPadding: 10,
                backgroundColor: "rgba(0, 150, 100, 0.9)",
                titleFontStyle: "normal",
                titleMarginBottom: 15
            },
            plugins: {
                datalabels: {
                    display: true,
                    formatter: function(value, context) {
                        // Formatear el valor como moneda
                        return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2 });
                    }

                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },

            leyend: {
                display: true,

            },
        }
    });

}

async function graficarEntradasPelicula() {
    await entradasPelicula();
    let colores = generarColores(Object.keys(entradas_pelicula).length);
    var myLeftBarGraph = new Chart(leftbar, {
        type: "bar",
        data: {
            labels: Object.keys(entradas_pelicula),
            datasets: [{
                label: "Ventas de Boletos por Película en la Última Semana",
                data: Object.values(entradas_pelicula),
                backgroundColor: colores,
                borderWidth: 0
            }]
        },
        options: {
            indexAxis: 'y',
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true,
            title: {
                display: true,
                text: "Gráfifico de ventas - 2019 - 2020"
            },
            plugins: {
                datalabels: {
                    display: true,

                }
            }
        }
    });

}









async function graficarRecaudacionSemanal() {
    await recaudacionSemanal();
    var mylineGraph2 = new Chart(line2, {
        type: "line",
        data: {
            xLabels: Object.keys(recaudacion),
            datasets: [{
                label: "Recaudación semanal",
                data: Object.values(recaudacion),
                fill: true,
                lineTension: 0.4,
                borderColor: "rgba(245, 35, 56, .65)",
                backgroundColor: "rgba(245, 35, 56, .25)"
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: "Datos de incidencias y resoluciones"
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Meses"
                    }
                }],
                yAxes: [{
                    type: "category",
                    position: "left",
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Estado"
                    },
                    ticks: {
                        reverse: true
                    }
                }]
            },
            plugins: {
                datalabels: {
                    display: true,
                    align: "45",
                    formatter: function(value, context) {
                        // Formatear el valor como moneda
                        return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2 });
                    }
                },
            }
        }
    });
}


async function graficarEntradasSemana() {
    await entradasSemana();
    var mylineGraph = new Chart(line, {
        type: "line",
        data: {
            labels: Object.keys(entradas_semana),
            datasets: [{
                label: "Venta de boletos en la última semana",
                data: Object.values(entradas_semana),
                fill: true,
                borderColor: "rgba(55, 130, 220, .65)",
                backgroundColor: "rgba(55, 130, 220, 0.1)",
                lineTension: 0,
                pointBorderWidth: 2,
                borderDash: [5, 5],
                pointStyle: "rectRounded"
            }, ]
        },
        options: {
            title: {
                display: true,
                text: "Gráfico de ventas - Ejemplo de Título"
            },
            plugins: {
                datalabels: {
                    display: true
                }
            }
        }
    });
}


async function graficarRecaudacionClasificacion() {
    await recaudacionClasificacion();
    var myDonutGraph = new Chart(donut, {
        //type: "pie",
        type: "doughnut",
        data: {
            labels: Object.keys(recaudacion_clasificacion),
            datasets: [{
                label: "Compras",
                data: Object.values(recaudacion_clasificacion),
                fill: false,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)"
                ],
                lineTension: 0.1
            }]
        },
        options: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    boxWidth: 10,
                    fontColor: "black"
                }
            },
            title: {
                display: true,
                text: "Gráfico de ventas - Enero a Junio"
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Porcentaje de ingresos por clasificación'
                },
                datalabels: {
                    formatter: (value, ctx) => {

                        let sum = 0;
                        let dataArr = ctx.chart.data.datasets[0].data;
                        dataArr.map(data => {
                            sum += data;
                        });
                        let percentage = (value * 100 / sum).toFixed(2) + "%";
                        return percentage;


                    },
                    color: 'black',
                }
            }
        }
    });



}









async function graficarEntradasGenero() {
    await entradasGenero();
    var myCircleGraph = new Chart(circle, {
        type: "pie",
        data: {
            labels: Object.keys(entradas_genero),
            datasets: [{
                label: "Entradas",
                data: Object.values(entradas_genero),
                borderWidth: 0,
                backgroundColor: [
                    "rgba(255, 99, 132, .6)",
                    "rgba(54, 162, 235, .6)",
                    "rgba(255, 206, 86, .6)",
                    "rgba(75, 192, 192, .6)",
                    "rgba(153, 102, 255, .6)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, .5)",
                    "rgba(54, 162, 235, .5)",
                    "rgba(255, 206, 86, .5)",
                    "rgba(75, 192, 192, .5)",
                    "rgba(153, 102, 255, .5)"
                ],
                lineTension: 0.1
            }]
        },
        options: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    boxWidth: 10,
                    fontColor: "#444444"
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Porcentaje de entradas por genero película'
                },
                datalabels: {
                    formatter: (value, ctx) => {

                        let sum = 0;
                        let dataArr = ctx.chart.data.datasets[0].data;
                        dataArr.map(data => {
                            sum += data;
                        });
                        let percentage = (value * 100 / sum).toFixed(2) + "%";
                        return percentage;


                    },
                    color: 'black',
                }
            }
        }
    });

}




//Conexión con el Backend
async function recaudacionSemanal() {
    await fetch('http://localhost:3000/api/dashboard/recaudacion')
        .then(response => response.json())
        .then(response => recaudacion = response);

}

async function recaudacionPelicula() {
    await fetch('http://localhost:3000/api/dashboard/recaudacion/pelicula')
        .then(response => response.json())
        .then(response => recaudacion_pelicula = response);

}

async function recaudacionCiudad() {
    await fetch('http://localhost:3000/api/dashboard/recaudacion/ciudad')
        .then(response => response.json())
        .then(response => recaudacion_ciudad = response);
}

async function entradasSemana() {
    await fetch('http://localhost:3000/api/dashboard/entradas')
        .then(response => response.json())
        .then(response => entradas_semana = response);
}

async function entradasPelicula() {
    await fetch('http://localhost:3000/api/dashboard/entradas/pelicula')
        .then(response => response.json())
        .then(response => entradas_pelicula = response);
}

async function entradasGenero() {
    await fetch('http://localhost:3000/api/dashboard/entradas/genero')
        .then(response => response.json())
        .then(response => entradas_genero = response);
}

async function recaudacionClasificacion() {
    await fetch('http://localhost:3000/api/dashboard/recaudacion/clasificacion')
        .then(response => response.json())
        .then(response => recaudacion_clasificacion = response);
}