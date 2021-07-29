const mongoose = require('mongoose');
var random = require('mongoose-simple-random');
const Schema = mongoose.Schema;

//Esquema 
const mamadorSchema = new Schema({

    name: {
        type: String,
        trim: true,
        unique: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    category: {
        type: String,
        trim: true
    },
    like: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mamadorSchema.plugin(random);

//Export
module.exports = mongoose.model('Mamador', mamadorSchema);