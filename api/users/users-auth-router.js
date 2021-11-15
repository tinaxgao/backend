const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../secrets')
const Users = require('./users-model')

router.get('/', (req, res, next) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch(next)
})

router.post('/register', async (req, res, next) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 6)
  user.password = hash

  Users.add(await user)
    .then((newUser) => {
      res.status(201).json(newUser)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {

})

module.exports = router
