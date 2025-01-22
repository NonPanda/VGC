const mongoose = require('mongoose');

const highscoreSchema = new mongoose.Schema({
    userId:String,
    scores:[
        {
            gameId:String,
            highscore:{
                type:Number,
                default:0
            }
        }
    ]
    

});

const Highscore = mongoose.model('Highscore', highscoreSchema);

module.exports = { Highscore };