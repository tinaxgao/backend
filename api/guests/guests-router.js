const router = require('express').Router()
const Guests = require('./guests-model')
const {restricted} = require('../restricted-middleware')

router.get('/', restricted, async (req, res, next) => {
  Guests.get()
    .then(guests => {
      res.status(200).json(guests)
    })
    .catch(next)
})

router.get('/:id', restricted, (req, res, next) => {
  Guests.getById(req.params.id)
    .then(guest => {
      res.status(200).json(guest)
    })
    .catch(next)
})

// OLD ADD GUEST ENDPOINT
// router.post('/', restricted, async (req, res, next) => {
//   Guests.add(req.body)
//     .then(guest => {
//       res.status(201).json(guest)
//     })
//     .catch(next)
// })


module.exports = router
