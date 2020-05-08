const Db = require('../data/helpers/projectModel')

module.exports = function(req, res, next){
    const id = req.params.id
    Db.get(id).then(db => {
      if(db){
        req.project = db
        next()
      }
      else{
        res.status(400).json({ message: "invalid project id" })
      }
    })
}