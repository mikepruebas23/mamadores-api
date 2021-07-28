const express = require('express');
const router = express.Router();

const mamadorController = require('../controllers/mamadorController');

module.exports = function(){

    
    router.post('/mamador',        mamadorController.fileUpload, mamadorController.add); // Add a new Product
    router.get('/mamador',         mamadorController.list); // Show client list
    router.get('/mamador/random',         mamadorController.random); // Show client list
    // router.get('/mamador/:id',     mamadorController.show); //Get by id
    // router.put('/mamador/:id',     mamadorController.fileUpload,mamadorController.update); //UPDATE product
    // router.delete('/mamador/:id',  mamadorController.delete); //DELETE
    // router.get('/mamador/search/:query',  mamadorController.search); //DELETE

    return router;
};