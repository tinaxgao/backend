const router = require('express').Router()
const Guests = require('./guests-model')

router.get('/', async (req, res, next) => {
  Guests.get()
    .then(guests => {
      res.status(200).json(guests)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Guests.getById(req.params.id)
    .then(guest => {
      res.status(200).json(guest)
    })
    .catch(next)
})

router.post('/', async (req, res, next) => {
  Guests.add(req.body)
    .then(guest => {
      res.status(201).json(guest)
    })
    .catch(next)
})

module.exports = router
