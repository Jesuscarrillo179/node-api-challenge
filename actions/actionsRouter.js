const express = require('express')
const Db = require('../data/helpers/actionModel')
const validateId = require("../middleware/validateId")
const validateIdActions = require('../middleware/validateIdActions')
const validateActions = require('../middleware/validateActions')

const router = express.Router()

router.post('/:id', validateId, validateActions,(req, res) => {
    const {description, notes} = req.body
    const project_id = req.project.id
    Db.insert({project_id, description, notes}).then(db => {
        res.status(201).json(db)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "status 500 server error"})
    })
})

router.get('/', (req, res) => {
    Db.get().then(db => {
        res.status(200).json(db)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "status 500 server error"})
    })
})

router.get('/:id', validateIdActions,(req, res) => {
    const id = req.action.id
    Db.get(id).then(db => {
        console.log(db)
        res.status(200).json(db)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "status 500 server error"})
    })
})

router.delete('/:id', validateIdActions,(req, res) => {
    const id = req.action.id
    Db.remove(id).then(db => {
        res.status(200).json({action: "deleted!"})
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "status 500 server error"})
    })
})

router.put('/:id', validateIdActions, validateActions,(req, res) => {
    const actions = req.body
    const id = req.action.id
    Db.update(id, actions).then(db => {
        res.status(202).json(db)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "status 500 server error"})
    })
})

module.exports = router