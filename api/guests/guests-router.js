const router = require('express').Router()
const Guests = require('./guests-model')

router.get('/', async (req, res, next) => {
  Guests.get()
    .then(guests => {
      res.status(200).json(guests)
    })
    .catch(next)
})

module.exports = router
