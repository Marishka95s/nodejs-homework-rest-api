const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: emailRegex
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
  // owner: {
  //   // type: SchemaTypes.ObjectId,
  //   // ref: 'user',
  // }
},
{ versionKey: false, timestamps: true },)

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

const joiSchema = Joi.object({
  password: Joi.string().min(10).required(),
  email: Joi.string().email(emailRegex).required(),
  subscription: Joi.string(),
  token: Joi.string(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema
}
