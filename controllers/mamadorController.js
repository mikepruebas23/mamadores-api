const multer = require('multer');
const multerConfig = require('../utils/multerConfig');
const Mamador = require('../models/Mamador');
const upload = multer(multerConfig).single('image');

//Upload Img
exports.fileUpload = (req, res ,next) => {
    upload(req, res,function(error){
        if(error){
            res.json({message:error})
        }
        return next();
    });
};


//Add mamador
exports.add = async (req, res) => {
    const mamador = new Mamador(req.body);
    try{
        //compobar si hay img
        if(req.file && req.file.filename){
            mamador.image = req.file.filename;
        }
        else {
            mamador.image = 0;
        }
        await mamador.save();
        res.json({message: 'Publicado con Exito!'});
    }
    catch(error){
        if(error.code === 11000){
            res.status(400).json({message:`Ya existe una publicacion con ese nombre: ${req.body.name}`});
        }
        else {
            res.status(400).json({message: 'Error'});
        }
    }
};


//Primera Accion : List
exports.list = async (req, res) => {
    try {
        const mamador = await Mamador.find({});
        res.json(mamador);
    } catch (error) {
        res.status(400).json({message: 'Error'});
    }
};

exports.random = async (req, res) => {
    try {
        await Mamador.findOneRandom(function (err, m) {
            if (!err) {
                res.json(m);
            }
        });
    } catch (error) {
        res.status(400).json({message: 'Error'});
    }
};
