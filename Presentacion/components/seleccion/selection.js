const container = document.querySelector('.container');
const seat = document.querySelectorAll('.fila .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = localStorage.getItem('nombrePelicula');
const imagenSelect = localStorage.getItem('linkImg');

const imagePoster = document.getElementById('photo');
imagePoster.src = imagenSelect;
console.log(movieSelect);
console.log(imagenSelect);
peliculaEsc.innerText = movieSelect;

let ticketPrice = localStorage.getItem('precioEntrada');


container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }

    updateSelectedCount();
});

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.fila .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}