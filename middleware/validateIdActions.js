const Db = require('../data/helpers/actionModel')

module.exports = function(req, res, next){
    const id = req.params.id
    Db.get(id).then(db => {
      if(db){
        req.action = db
        next()
      }
      else{
        res.status(400).json({ message: "invalid action id" })
      }
    })
}