module.exports = function(req, res, next) {
    const action = req.body
    if(action.description === "" || action.notes === ""){
      res.status(400).json({ message: "missing required text field" })
    } else if (Object.keys(action).length === 0){
      res.status(404).json({ message: "missing actions data" })
    } else {
      next()
    }
  }