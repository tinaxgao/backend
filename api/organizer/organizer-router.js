const router = require('express').Router()
const Organizer = require('./organizer-model')
const {restricted} = require('../restricted-middleware')

router.get('/:user_id', restricted, (req, res, next) => {
  Organizer.getEvents(req.params.user_id)
    .then(allEvents => {
      res.status(200).json(allEvents)
    })
    .catch(next)
})

router.post('/event', restricted, (req, res, next) => {
  Organizer.createEvent(req.body)
    .then(newEvent => {
      res.status(201).json(newEvent)
    })
    .catch(next) 
})

module.exports = router
