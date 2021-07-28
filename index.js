//Dependencias
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');

// instancia de express
const app = express();

//conecct to mongose
mongoose.Promise = global.Promise;
mongoose.connect(
    // 'mongodb://localhost/mamadores-api',
    'mongodb+srv://mikegeko:mikegeko1@cluster0.g69j4.mongodb.net/api-store?retryWrites=true&w=majority',
    {
        useNewUrlParser : true,
    }
)
.then(db => console.log("BD conectada"))
.catch(error => console.log(error));

//Habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Habilitar cors
app.use(cors());

//Paths
app.use('/', routes());

//Carpeta expuesta
app.use(express.static('uploads'));

//server port
app.listen(process.env.PORT || 5000);

//local dev
// app.listen(5000, function(){
    // console.log("Servidor Web en Ejecucion!");
// });