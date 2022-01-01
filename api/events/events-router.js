const router = require('express').Router()
const Events = require('./events-model')
// const { validateEvent } = require('./events-middleware');
const {restricted} = require('../restricted-middleware')

//GET ALL EVENTS
router.get('/', restricted, (req, res, next) => {
	Events.get()
		.then((eventsArray) => {
			res.status(200).json(eventsArray)
		})
		.catch(next);
});

//GET EVENT AT 'ID'
router.get('/:id', restricted, (req, res, next) => {
	Events.getById(req.params.id)
		.then((event) => {
			res.status(200).json(event);
		})
		.catch(next);
});

// moving content below to a different page where only an organizer has access to create/update/delete an event
// will keep text here just incase for now

// //POST AN EVENT
// router.post('/', validateEvent, restricted, async (req, res, next) => {
//     Events.insert(req.body)
//         .then(event => {
//             res.status(201).json(event)
//         })
//         .catch(next)
// })
// //UPDATE AN EVENT
// router.put('/:id', restricted, async(req, res, next) => {
// 	const { id } = req.params
// 	const eventChanges = req.body
// 	Events.update(id, eventChanges)
// 		.then( changes => {
// 			res.status(202).json({message: `Event has been UPDATED`})
// 		})
// 		.catch(next)
// })
// //DELETE AN EVENT
// router.delete('/:id', restricted, async(req, res, next) => {
// 	const { id } = req.params
// 	Events.remove(id)
// 		.then(removed => {
// 			res.status(204).json({message: `Event has been REMOVED`})
// 		})
// 		.catch(next)
// })

module.exports = router
