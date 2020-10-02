const express = require('express');
const { route } = require('../API/server');
const router = express.Router()
const Projects = require('../data/helpers/projectModel');
const Projects2 = require('../data/helpers/actionModel')


// GET projects

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message: 'The project with the specified ID does not exist.' 
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'The project information could not be retrieved.'
            })
        })
})

// GET /api/projects/:id/actions

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message: 'The project with the specified ID does not exist.'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'The actions information could not be retrieved.'
            })
        })
})

// POST 

router.post('/:id/actions', (req, res) => {
    const { id: id } = req.params
    const { description } = req.body

    if (!req.body.description) {
        return res.status(400).json({
            errorMessage: 'Please provide a description.'
        })
    }

    Projects2.insert({ id, description })
        .then(project => {
            if (!project.id) {
                res.status(404).json({
                    message: 'The project with the specified ID does not exist.'
                })
            } else {
                res.status(201).json({ data: project })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'There was an error while saving the project to the database'
            })
        })
})



module.exports = router;