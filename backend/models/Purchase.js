
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid:String,
    email:String,
    displayName:String,

});
const PurchaseSchema = new mongoose.Schema({
    userId:String,
    gameId:String,
    date:{
        type:Date,
        default:Date.now
    }

});

const User = mongoose.model('User', userSchema);
const Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = { User, Purchase };