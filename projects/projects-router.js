const express = require('express');
const { route } = require('../API/server');
const router = express.Router()
const Projects = require('../data/helpers/projectModel');

// GET projects

router.get('/', (req, res) => {
    Projects.get()
      .then(projects => {
        res.status(200).json({data: projects});
      })
      .catch(err => {
        res.status(500).json({
            message: 'Cannot GET'
        });
      })
  });

// GET /api/projects/:id

router.get('/:id', validateProjectId, (req, res) => {
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

router.get('/:id/actions', validateProjectId, (req, res) => {
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

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
      .then(project => {
        res.status(201).json({data: project});
      })
      .catch(err => {
        res.status(500).json({
            message: 'Cannot save this project to the database.'
        });
      })
  });

  // PUT /api/projects/:id

  router.put('/:id', (req,res) => {
    Projects.update(req.params.id, req.body)
    .then(id => {
        if(id) {
            res.status(200).json(id)
        } else {
            res.status(404).json({
                message: 'The project with specified ID cannot be found.'    
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'There was an error updating the project.'
        })
    })
})


// DELETE /api/posts/:id

router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({
                message: 'The project has been deleted.'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Cannot delete the project.'
        })
    })
})





  // Middleware

  function validateProject(req, res, next) {
    console.log(req.body);
    if (!req.body){
      return res.status(400).json({message: 'Missing project data.'})
    } else if (!req.body.name) {
      return res.status(400).json({message: 'Missing required name field.'});
    } else if (!req.body.description) {
      return res.status(400).json({message: 'Missing required description field.'});
    } else {
        next();
    }
  
  }
  

  function validateProjectId(req, res, next){
    Projects.get(req.params.id)
      .then(project => {
        console.log(project);
        if (project) {
          req.project = project;
          return next();
        } else {
        return res.status(404).json({message: 'Project not found.'});
        }
      })
      .catch(err => {
        return res.status(400).json({message: 'Invalid Project ID.'});
      })
  }



module.exports = router;