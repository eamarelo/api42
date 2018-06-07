var mongoose  = require("mongoose");

var UserSchema  = new mongoose.Schema({
    name: { type: String },
    age: { type: String },
    gender: { type: String },
});

module.exports = mongoose.model('UserSchema', UserSchema);