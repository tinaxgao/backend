const Users = require('./auth-model')

const checkBody = (req, res, next) => {
  const {email, password} = req.body

  if(
    !email ||
    email.trim() === '' ||
    typeof email !== 'string' ||
    !password
  ) {
    return next({
      status: 400,
      message: 'email and password required'
    })
  }
  next()
}

const checkEmailFree = async (req, res, next) => {
  try {
    const {email} = req.body
    const existingEmail = await Users.findBy({email}).first()

    if(existingEmail) {
      next({
        status: 422,
        message: 'email taken'
      })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

const checkExistingEmail = async (req, res, next) => {
  try {
    const {email} = req.body
    const existingEmail = await Users.findBy({email}).first()

    if(!existingEmail) {
      next({
        status: 401,
        message: 'invalid credentials'
      })
    } else {
      req.user = existingEmail
      next()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkBody,
  checkEmailFree,
  checkExistingEmail
}
