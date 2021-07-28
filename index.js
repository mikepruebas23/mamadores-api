const URL_API_CREATE_NEW_POST = 'https://mamadores-api.herokuapp.com/mamador';
const URL_API_GET_ONE_RANDOM_POST = 'https://mamadores-api.herokuapp.com/mamador/random';

const stock = document.getElementById('username');
const frase = document.getElementById('comment');
const contentImg = document.getElementById('content-img');
const postCategory = document.getElementById('postCategory');

function getRandomPost() {

    

    while (stock.firstChild) stock.removeChild(stock.firstChild);
    while (frase.firstChild) frase.removeChild(frase.firstChild);
    while (postCategory.firstChild) postCategory.removeChild(postCategory.firstChild);

    // fetch(URL_API_GET_ONE_RANDOM_POST).then(response => response.json()).then(
    //     (res) => {
    //         let newDiv = document.createElement("div");
    //         let newComent = document.createElement("div");
    //         let newCategory = document.createElement("div");

    //         newDiv.innerHTML = '@' + res.name;
    //         newComent.innerHTML = res.description;
    //         newCategory.innerHTML = " " + res.category + " ";

    //         stock.appendChild(newDiv);
    //         frase.appendChild(newComent);
    //         postCategory.appendChild(newCategory);
    //     }
    // );
    let newDiv = document.createElement("div");
    newDiv.innerHTML = 'Cargando Publicación...';
    stock.appendChild(newDiv);

    let processStatus = function (response) {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    };

    fetch(URL_API_GET_ONE_RANDOM_POST)
    .then(response => response.json())
    .then((res) => {

        while (stock.firstChild) stock.removeChild(stock.firstChild);

        let newDiv = document.createElement("div");
        let newComent = document.createElement("div");
        let newCategory = document.createElement("div");

        newDiv.innerHTML = '@' + res.name;
        newComent.innerHTML = res.description;
        newCategory.innerHTML = " " + res.category + " ";

        stock.appendChild(newDiv);
        frase.appendChild(newComent);
        postCategory.appendChild(newCategory);
    })
    .catch(function(){
        Swal.fire('Error al cargar la publicación.');
    });

    

}


const thisForm = document.getElementById('myForm');
thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(thisForm).entries()
    const response = await fetch(URL_API_CREATE_NEW_POST, {
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

    Swal.fire(result.message);
});

getRandomPost();