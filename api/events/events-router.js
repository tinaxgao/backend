const router = require('express').Router()
const Events = require('./events-model')

//GET ALL EVENTS
router.get('/', async (req, res, next) => {
	Events.get()
		.then((eventsArray) => {
			res.status(200).json(eventsArray)
		})
		.catch(next);
});

//GET EVENT AT 'ID'
router.get('/:id', (req, res, next) => {
	Events.getById(req.params.id)
		.then((event) => {
			res.status(200).json(event);
		})
		.catch(next);
});

//POST AN EVENT
router.post('/', async (req, res, next) => {
    Events.insert(req.body)
        .then(event => {
            res.status(201).json(event)
        })
        .catch(next)
})

module.exports = router
