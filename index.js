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
            newDiv.innerHTML = '@' + mamador.name;
            newComent.innerHTML = mamador.description;
            stock.appendChild(newDiv);
            frase.appendChild(newComent);
        }
    );
}


getData();


var urlPost = 'https://mamadores-api.herokuapp.com/mamador';
//     fetch(url, {
//             method: 'POST',
//             body: JSON.stringify({
//                 name: "ElToxico",
//                 description: "No sé donde estas, ni si volveras.",
//                 image: 'No',
//                 category: 'Relaciones'
//             }),
//             headers: {
//                 "Content-type": "application/json"
//             }}).then(response => response.json()).then(json => console.log(json))

const thisForm = document.getElementById('myForm');
thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(thisForm).entries()
    const response = await fetch(urlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    });

    const result = await response.json();
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
    // document.getElementById('myform').reset();
    console.log(result);
});