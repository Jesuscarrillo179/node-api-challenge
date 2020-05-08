module.exports = function(req, res, next) {
    const project = req.body
    if(project.name === "" || project.description === ""){
      res.status(400).json({ message: "missing required text field" })
    } else if (Object.keys(project).length === 0){
      res.status(404).json({ message: "missing project data" })
    } else {
      next()
    }
  }