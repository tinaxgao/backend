const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../secrets')
const Users = require('./auth-model')
const {
  checkBody,
  checkUsernameFree,
  checkExistingUsername
} = require('./auth-middleware')

router.get('/', (req, res, next) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch(next)
})

router.post('/register', checkBody, checkUsernameFree, async (req, res, next) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 6)
  user.password = hash

  Users.add(await user)
    .then((newUser) => {
      res.status(201).json(newUser)
    })
    .catch(next)
})

router.post('/login', checkBody, checkExistingUsername, (req, res, next) => {
  const {password} = req.body

  if(bcrypt.compareSync(password, req.user.password)) {
    const token = generateToken(req.user)
    res.status(200).json({
      message: `welcome, ${req.user.username}`,
      token
    })
  } else {
    next({
      status: 401,
      message: 'invalid credentials'
    })
  }
})

function generateToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username
  }
  const options = {
    expiresIn: "1d"
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router
