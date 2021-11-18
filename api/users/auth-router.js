const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../secrets')
const Users = require('./auth-model')
const {
  checkBody,
  checkEmailFree,
  checkExistingEmail
} = require('./auth-middleware')
const {restricted} = require('../restricted-middleware')

router.get('/', restricted, (req, res, next) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch(next)
})

router.post('/register', checkBody, checkEmailFree, async (req, res, next) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 6)
  user.password = hash

  Users.add(await user)
    .then((newUser) => {
      res.status(201).json(newUser)
    })
    .catch(next)
})

router.post('/login', checkBody, checkExistingEmail, (req, res, next) => {
  let {user_id, email, password} = req.dbUser
  if(bcrypt.compareSync(req.user.password, password)) {
    const token = generateToken(req.user)
    res.status(200).json({
      message: `welcome, ${req.user.email}`,
      email,
      user_id,
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
    email: user.email
  }
  const options = {
    expiresIn: "1d"
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router
