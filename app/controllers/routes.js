const Create = require('./user/create.js')
const Show = require('./user/show.js')
const Search = require('./user/search.js')
const Update = require('./user/update.js')
const Destroy = require('./user/destroy.js')
const Authentification = require('./auth/authentification.js')
const Verification = require('./auth/verification.js')
const Login = require('./auth/login.js')

module.exports = {
  user: {
    Create,
    Show,
    Search,
    Update,
    Destroy
  },
  auth: {
  	Authentification,
  	Verification,
  	Login
  }
}
