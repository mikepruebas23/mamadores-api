const URL_API_CREATE_NEW_POST = 'https://mamadores-api.herokuapp.com/mamador';
const URL_API_GET_ONE_RANDOM_POST = 'https://mamadores-api.herokuapp.com/mamador/random';
const URL_API_GET_IMAGE = 'https://mamadores-api.herokuapp.com/';

const stock = document.getElementById('username');
const frase = document.getElementById('comment');
const contentImg = document.getElementById('content-img');
const postCategory = document.getElementById('postCategory');
const postSubmit = document.getElementById("postSubmit");
const imgPost = document.getElementById('cImg');

function getRandomPost() {

    while (stock.firstChild) stock.removeChild(stock.firstChild);
    while (frase.firstChild) frase.removeChild(frase.firstChild);
    while (postCategory.firstChild) postCategory.removeChild(postCategory.firstChild);

    let newDiv = document.createElement("div");
    newDiv.innerHTML = 'Cargando Publicación...';
    stock.appendChild(newDiv);

    fetch(URL_API_GET_ONE_RANDOM_POST)
        .then(response => response.json())
        .then((res) => {

            
            

            while (stock.firstChild) stock.removeChild(stock.firstChild);

            let newDiv = document.createElement("div");
            let newComent = document.createElement("div");
            let newCategory = document.createElement("div");
            // let newImg = document.createElement("img");

            // newImg.classList.add("card-img");
            // newImg.src = URL_API_GET_IMAGE + res.image; 

            newDiv.innerHTML = '@' + res.name;
            newComent.innerHTML = res.description;
            newCategory.innerHTML = " " + res.category + " ";

            stock.appendChild(newDiv);
            frase.appendChild(newComent);
            postCategory.appendChild(newCategory);
            // imgPost.appendChild(newImg); 

            if(res.image != '0' && res.image != 'No'){
                while (imgPost.firstChild) imgPost.removeChild(imgPost.firstChild);
                // console.log("RES: ",URL_API_GET_IMAGE+res.image);
                let newImg = document.createElement("img");
                newImg.src = URL_API_GET_IMAGE + res.image;
                newImg.classList.add("card-img");
                imgPost.appendChild(newImg); 
            }
            else {
                while (imgPost.firstChild) imgPost.removeChild(imgPost.firstChild);
            }

            // <!-- <img class="img-profile" src="https://picsum.photos/200/300" alt="user-img"> -->
        })
        .catch(function () {
            Swal.fire('Error al cargar la publicación.');
        });
}


const thisForm = document.getElementById('myForm');
thisForm.addEventListener('submit', async function (e) {

    // postSubmit.classList.add("btn-blocked");
    // postSubmit.disabled = true;

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

    await fetch(URL_API_CREATE_NEW_POST, requestOptions).then((response) =>{
        // console.log("RESPONSE: ", response);
        // const result = response.json();

        document.getElementById('name').value = '';
        document.getElementById('description').value = '';
        document.getElementById('category').value = '';

        postSubmit.classList.remove("btn-blocked");
        postSubmit.disabled = false;
        Swal.fire("Publicacion con Exito!");
    })
    .catch((error) =>{
        console.log(error);
        // document.getElementById('name').value = '';
        // document.getElementById('description').value = '';
        // document.getElementById('category').value = '';
        Swal.fire('Error al Publicar..');

    });
    
});

getRandomPost();