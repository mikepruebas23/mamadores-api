var url = 'https://mamadores-api.herokuapp.com/mamador/random';
var stock = document.getElementById('username');
var frase = document.getElementById('comment');
var contentImg = document.getElementById('content-img');

function getData() {
    while (stock.firstChild) stock.removeChild(stock.firstChild);
    while (frase.firstChild) frase.removeChild(frase.firstChild);
    fetch(url).then(response => response.json()).then(
        (mamador) => {
            let newDiv = document.createElement("div");
            let newComent = document.createElement("div");
            newDiv.innerHTML = '@'+mamador.name;
            newComent.innerHTML = mamador.description;
            stock.appendChild(newDiv);
            frase.appendChild(newComent);
        }
    );
}


getData();