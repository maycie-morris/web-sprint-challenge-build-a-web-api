const express = require('express')
const Actions = require('../data/helpers/actionModel')
const router = express.Router()

// GET /api/actions

router.get('/', (req, res) => {
    Actions.get()
        .then(action => {
            res.status(200).json( action )
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Cannot GET"
            })
        })
})

// GET /api/actions/:id

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Cannot GET"
            })
        })
})


// POST /api/actions/project/:id

router.post('/projects/:id', (req, res) => {
    Actions.insert({ ...req.body, project_id: req.params.id })
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Cannot post to the database.'
            })
        })
})


// PUT /api/actions/:id

router.put('/:id', (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(() => {
            res.status(200).json({ data: req.body })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Cannot update the action.'
            })
        })
})

// DELETE /api/actions/:id

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json({
                message: "The action has been deleted."
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Cannot delete the action.'
            })
        })
})


module.exports = router