const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')

const { User } = require('../../schemas')
const { sendEmail } = require('../../helpers')

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
  }
  const avatarURL = gravatar.url(email)
  const verificationToken = nanoid()

  const newUser = new User({ email, avatarURL, verificationToken })
  newUser.setPassword(password)

  const result = await newUser.save()

  const registrationMail = {
    to: email,
    subject: 'Registration confirm',
    html: `<a href = "http://localhost:3000/api/users/verify/${verificationToken}">Click it to confirm a registration</a>`
  }
  sendEmail(registrationMail)

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
