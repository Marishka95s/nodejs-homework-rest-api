const { Conflict } = require('http-errors')
// const bcrypt = require('bcryptjs')
const { User } = require('../../schemas')
const gravatar = require('gravatar')

const register = async (req, res) => {
  if (req.body.email === null || req.body.password === null) {
    res.status(400).json({
      status: 'Bad Request',
      code: 400,
      message: 'Ошибка от Joi или другой библиотеки валидации'
    })
    return
  }
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email in use')
    // res.status(409).json({
    //   status: 'error',
    //   code: 409,
    //   message: 'Email in use'
    // })
    // return
  }
  const avatarURL = gravatar.url(email)
  const newUser = new User({ email, avatarURL })
  // newUser = { email }
  newUser.setPassword(password)
  // newUser = { email, password }
  const result = await newUser.save()

  //   const hashPasword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  //   await User.create({ email, password: hashPasword })

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Registred success',
    result
  })
}

module.exports = register
