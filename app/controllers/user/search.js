// Core
const mock = require('../../models/get-user.js')
const validator = require('node-validator')
const userSchema = require('../../models/userSchema.js');

const check = validator.isObject()
.withRequired('ids', validator.isArray())

module.exports = class Search {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Middleware
   */
   middleware () {
    this.app.post('/user/search', validator.express(check), (req, res) => {
      try {
        userSchema();
        const result = {}
        const ids = req.body.ids

        const searchData = ids.filter(id => id.match(/^[0-9a-fA-F]{24}$/)).map(id => ({ '_id': id }))

        userSchema.find({
          $and: [
          {
            $or: searchData
          }
          ]
        }).exec().then(result => {
          console.log(result)
          res.status(200).json(result)
        })
        .catch(err => {
          console.log(err)
        })
      } catch (e) {
        console.error(`[ERROR] user/search -> ${e}`)
        res.status(400).json({
          'code': 400,
          'message': 'Bad request'
        })
      }
    })
  }

  /**
   * Run
   */
   run () {
    this.middleware()
  }
}
