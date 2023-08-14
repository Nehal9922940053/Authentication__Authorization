const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
   pokemon_id:Number,
    name:String,
    type:String,
    imagePath:String,
    created:{
        type:Date,
        required:true,
        default:Date.now,
    },
})


const PokemonModel = mongoose.model("pokemons", PokemonSchema);
module.exports = PokemonModel;