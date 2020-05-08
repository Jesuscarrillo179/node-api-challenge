const express = require('express')
const Db = require('../data/helpers/projectModel')
const validateId = require("../middleware/validateId")
const validateProject = require('../middleware/validateProject')

const router = express.Router()

router.post('/', validateProject,(req, res) => {
    const project = req.body
    Db.insert(project).then(db => {
        res.status(201).json(db)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "status 500 server error"})
    })
})

router.get('/',  (req, res) => {
    Db.get().then(db => {
        res.status(200).json(db)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "status 500 server error"})
    })
})

router.get('/:id', validateId,(req, res) => {
    const id = req.project.id
    Db.get(id).then(db => {
        res.status(200).json(db)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "status 500 server error"})
    })
})

router.get('/:id/actions', validateId,(req, res) => {
    const id = req.project.id
    Db.getProjectActions(id).then(db => {
        res.status(200).json(db)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "status 500 server error"})
    })
})

router.delete('/:id', validateId,(req, res) => {
    const id = req.project.id
    Db.remove(id).then(db => {
        res.status(200).json({project: "deleted!"})
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "status 500 server error"})
    })
})

router.put('/:id', validateId, validateProject,(req, res) => {
    const project = req.body
    const id = req.project.id
    Db.update(id, project).then(db => {
        res.status(202).json(db)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "status 500 server error"})
    })
})

module.exports = router
