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

            // console.log("RES: ",res.image);
            // if(res.image != '0'){

            // }

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
        .catch(function () {
            Swal.fire('Error al cargar la publicación.');
        });



}


const thisForm = document.getElementById('myForm');
thisForm.addEventListener('submit', async function (e) {


    e.preventDefault();

    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let fileInput = document.querySelector('#image');

    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("category", category);
    formdata.append("image", fileInput.files[0], fileInput.value);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const response = await fetch(URL_API_CREATE_NEW_POST, requestOptions);
    const result = await response.json();

    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';

    Swal.fire(result.message);
});

getRandomPost();