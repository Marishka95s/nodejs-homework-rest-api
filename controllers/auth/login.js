const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')

const { User } = require('../../schemas')

const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  if (email === null || password === null) {
    res.status(400).json({
      status: 'Bad Request',
      code: 400,
      message: 'Ошибка от Joi или другой библиотеки валидации'
    })
    return
  }
  const user = await User.findOne({ email })
  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong, or email is not verified')
  }
  // if (!user) {
  //   throw new Unauthorized(`Email ${email} not found`)
  //   res.status(401).json({
  //     status: 'Unauthorized',
  //     code: 401,
  //     message: 'Email or password is wrong'
  //   })
  //   return
  // }
  // if (!user.comparePassword(password)) {
  //   throw new Unauthorized('Email or password is wrong')
  //   res.status(401).json({
  //     status: 'Unauthorized',
  //     code: 401,
  //     message: 'Email or password is wrong'
  //   })
  //   return
  // }
  // const newUser = new User({ email })
  // newUser = { email }
  // newUser.setPassword(password)
  // newUser = { email, password }
  // const result = await newUser.save()

  const payload = {
    id: user._id
  }

  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(user._id, { token })

  res.json({
    status: 'success',
    code: 200,
    token,
    user
  })
}

module.exports = login
