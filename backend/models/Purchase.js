
const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    userId:String,
    gameId:String,
    date:{
        type:Date,
        default:Date.now
    }

});



const Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = { Purchase};
