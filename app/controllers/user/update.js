// Core
const mock = require('../../models/get-user.js')
const validator = require('node-validator')
const userSchema = require('../../models/userSchema.js');

const check = validator.isObject()
.withRequired('name', validator.isString())

module.exports = class Update {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Middleware
   */
   middleware () {
    this.app.put('/user/update/:_id', validator.express(check), (req, res) => {
      console.log("here")
      try {
        var name = req.body.name;
        var age = req.body.age;
        var gender = req.body.gender;

        userSchema.findById(req.params._id, function(err, userSchema) {
          if (err){
            res.send(err);
          }
                    // Mise à jour des données de la piscine
                    userSchema.name = req.body.name;
                    userSchema.age = req.body.age;
                    userSchema.gender = req.body.gender;
                    userSchema.save(function(err){
                      res.json({message : 'Bravo, mise à jour des données OK'});
                    });                
                  });
        userSchema.update({ name: name, age: age, gender: gender});
        res.status(200).json(userSchema || {})
      } catch (e) {
        console.log(e)
        console.error(`[ERROR] user/update/:id -> ${e}`)
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
