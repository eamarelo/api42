var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password:  { type: String },
  versionKey: false 
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');