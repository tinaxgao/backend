
const router = require('express').Router()
const Events = require('./events-model')
const { validateEvent, validateEventId } = require('./events-middleware');

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
router.post('/', validateEvent, async (req, res, next) => {
    Events.insert(req.body)
        .then(event => {
            res.status(201).json(event)
        })
        .catch(next)
})
//UPDATE AN EVENT
router.put('/:id', validateEvent,  async(req, res, next) => {
	const { id } = req.params
	const eventChanges = req.body
	Events.update(id, eventChanges)
		.then( changes => {
			res.status(202).json({message: `Event has been UPDATED`})
		})
		.catch(next)
})
//DELETE AN EVENT
router.delete('/:id', async(req, res, next) => {
	const { id } = req.params
	Events.remove(id)
		.then(removed => {
			res.status(204).json({message: `Event has beed REMOVED`})
		})
		.catch(next)
})

module.exports = router
