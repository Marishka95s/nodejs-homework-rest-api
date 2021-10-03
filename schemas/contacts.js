const { Schema, model } = require('mongoose')
const Joi = require('joi')

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }

const phoneRegex = /^[+]{1}[0-9]{2}[-]{1}[0-9]{3}[-]{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: emailRegex
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: phoneRegex
  },
  favorite: {
    type: Boolean,
    default: false
  }
},
{ versionKey: false, timestamps: true },)

const joiSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email(emailRegex).required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  favorite: Joi.bool().default(false),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchema
}
