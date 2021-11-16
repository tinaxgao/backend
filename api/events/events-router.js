const express = require('express');
const router = express.Router();
const Events = require('./events-model');
//GET ALL EVENTS
router.get('/', (req, res, next) => {
	Events.get()
		.then((eventsArray) => {
			res.status(200).json(eventsArray);
		})
		.catch(next);
});
//GET EVENT AT 'ID'
//NEEDS A VALIDATION MIDDLEWARE
router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	Events.getById(id)
		.then((event) => {
			res.status(200).json(event);
		})
		.catch(next);
});
//POST AN EVENT
//NEEDS A VALIDATION MIDDLEWARE
router.post('/', (req,req,next) => {
    Events.insert(req.body)
        .then(event => {
            res.status(201).json({message: `New event: ${event} created.`})
        })
        .catch(next)
})