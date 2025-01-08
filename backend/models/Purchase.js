
const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     uid:String,
//     email:String,
//     displayName:String,

// });
const PurchaseSchema = new mongoose.Schema({
    userId:String,
    gameId:String,
    date:{
        type:Date,
        default:Date.now
    }

});

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

// const User = mongoose.model('User', userSchema);
const Purchase = mongoose.model('Purchase', PurchaseSchema);
const Highscore = mongoose.model('Highscore', highscoreSchema);

// module.exports = { User, Purchase, Highscore };
module.exports = { Purchase, Highscore };
