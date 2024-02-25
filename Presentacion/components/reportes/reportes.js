//variables del DOOM
var bar = document.getElementById("myBarGraph").getContext("2d");
var leftbar = document.getElementById("myLeftBarGraph").getContext("2d");
var line = document.getElementById("mylineGraph").getContext("2d");
var line2 = document.getElementById("myLineGraph2").getContext("2d");
var radio = document.getElementById("myRadioGraph").getContext("2d");
var donut = document.getElementById("myDonutGraph").getContext("2d");
var polar = document.getElementById("myPolarGraph").getContext("2d");
var circle = document.getElementById("myCircleGraph").getContext("2d");
//Variables globales
let recaudacion;
let recaudacion_pelicula;
let recaudacion_ciudad;
//llamadas
graficarRecaudacionSemanal();
graficarRecaudacionPelicula();
graficarRecaudacionCiudad();
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
//Gráficos
async function graficarRecaudacionPelicula() {
    let label = [];
    await recaudacionPelicula();
    let colores = generarColores(Object.keys(recaudacion_pelicula).length);
    console.log("los colores", colores)
    console.log(label);
    var myBarGraph = new Chart(bar, {
        type: "bar",
        data: {
            labels: Object.keys(recaudacion_pelicula),
            datasets: [{
                label: "Recaudación por película",
                data: Object.values(recaudacion_pelicula),
                backgroundColor: colores,
                borderColor: colores,
                borderWidth: 2
            }, ]
        },
        options: {
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return 'Valor: ' + value;
                    }
                },
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
                    display: true

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
                display: true
            },
        }
    });
}

async function graficarRecaudacionCiudad() {
    await recaudacionCiudad();
    var myLeftBarGraph = new Chart(leftbar, {
        type: "bar",
        data: {
            labels: Object.keys(recaudacion_ciudad),
            datasets: [{
                label: "Recaudación por ciudad",
                data: Object.values(recaudacion_ciudad),
                backgroundColor: "rgba(0, 99, 132, 0.6)",
                borderWidth: 0
            }]
        },
        options: {
            indexAxis: 'y',
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: {
                        fontSize: 10,
                        stepSize: 5,
                        min: 0,
                        beginAtZero: true,
                    }
                }],
                xAxes: [{
                    barPercentage: .8,
                    maxBarThickness: 50,
                    ticks: {
                        fontSize: 10,
                    }
                }]
            },
            elements: {
                rectangle: {
                    borderSkipped: "left"
                }
            },
            responsive: true,
            title: {
                display: true,
                text: "Gráfifico de ventas - 2019 - 2020"
            },
            plugins: {
                datalabels: {
                    display: false
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
                label: "Recaudación",
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
                    display: false
                }
            }
        }
    });
}

var mylineGraph = new Chart(line, {
    type: "line",
    data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
        datasets: [{
                label: "Ventas 2018",
                data: [45, 59, 68, 45, 45, 35, 41],
                fill: true,
                borderColor: "rgba(55, 130, 220, .65)",
                backgroundColor: "rgba(55, 130, 220, 0.1)",
                lineTension: 0,
                pointBorderWidth: 2,
                borderDash: [5, 5],
                pointStyle: "rectRounded"
            },
            {
                label: "Ventas 2019",
                data: [65, 61, 80, 81, 51, 55, 56],
                fill: false,
                borderColor: "rgba(245, 35, 56, .65)",
                lineTension: 0,
                pointBorderWidth: 2,
                pointStyle: "rectRounded"
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: "Gráfico de ventas - Ejemplo de Título"
        },
        plugins: {
            datalabels: {
                display: false
            }
        }
    }
});



var myRadioGraph = new Chart(radio, {
    type: "radar",
    data: {
        labels: [
            "Ventas",
            "Exportaciones",
            "Nuevos Clientes",
            "Contrataciones",
            "RR.HH.",
            "Almaceneces",
            "Importaciones"
        ],
        datasets: [{
                label: "2018",
                data: [15, 39, 55, 35, 41, 15, 20],
                fill: true,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgb(54, 162, 235)",
                pointBackgroundColor: "rgb(54, 162, 235)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgb(54, 162, 235)"
            },
            {
                label: "2020",
                data: [67, 59, 90, 81, 50, 55, 40],
                fill: true,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgb(255, 99, 132)",
                pointBackgroundColor: "rgb(255, 99, 132)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgb(255, 99, 132)"
            }
        ]
    },
    options: {
        elements: {
            line: {
                tension: 0,
                borderWidth: 3
            }
        },
        plugins: {
            datalabels: {
                display: false
            }
        }
    }
});

var myDonutGraph = new Chart(donut, {
    //type: "pie",
    type: "doughnut",
    data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
        datasets: [{
            label: "Compras",
            data: [45, 48, 90, 20, 16, 24],
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
                fontColor: "#444444"
            }
        },
        title: {
            display: true,
            text: "Gráfico de ventas - Enero a Junio"
        },
        plugins: {
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
                color: '#fff',
            }
        }
    }
});

var myPolarGraph = new Chart(polar, {
    type: "polarArea",
    data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [{
            label: "Compras",
            data: [8, 16, 17, 3, 14],
            fill: false,
            backgroundColor: [
                "rgba(255, 99, 132, .5)",
                "rgba(54, 162, 235, .5)",
                "rgba(255, 206, 86, .5)",
                "rgba(75, 192, 192, .5)",
                "rgba(153, 102, 255, .5)"
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
                color: '#fff',
            }
        }
    }
});

var myCircleGraph = new Chart(circle, {
    type: "pie",
    data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [{
            label: "Compras",
            data: [11, 28, 45, 20, 120],
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
                color: '#fff',
            }
        }
    }
});
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