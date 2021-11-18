const Users = require('./auth-model')

const checkBody = (req, res, next) => {
  const {email, password} = req.body

  if(
    !email ||
    email.trim() === '' ||
    typeof email !== 'string' ||
    !password
  ) {
    next({
      status: 400,
      message: 'email and password required'
    })
  } else {
    req.user = {
      email: email.trim(),
      password: password.trim()
    }
    next()
  }
}

const checkEmailFree = async (req, res, next) => {
  // const {email} = req.user
  // const user = await Users.findBy({email})
  // if (user) {
  //   next({
  //     status: 401,
  //     message: 'email is taken'
  //   })
  // } else {
  //   next()
  // }

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
  // const {email} = req.user
  // const user = await Users.findBy({email})
  // if (user) {
  //   req.dbUser = user
  //   next()
  // } else {
  //   next({
  //     status: 401,
  //     message: 'invalid credentials'
  //   })
  // }
  
  try {
    const {email} = req.body
    const existingEmail = await Users.findBy({email}).first()

    if(!existingEmail) {
      next({
        status: 401,
        message: 'invalid credentials'
      })
    } else {
      req.dbUser = existingEmail
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
