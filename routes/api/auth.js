const express = require('express')

const { controllerWrapper, validator } = require('../../middelwares')
const { joiSchema } = require('../../schemas/users')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

// POST /api/auth/register
// router.post('/register', validator(joiSchema), controllerWrapper(ctrl.register))
router.post('/signup', validator(joiSchema), controllerWrapper(ctrl.register))

// POST /api/auth/login
router.post('/login', controllerWrapper(ctrl.login))
// router.post('/signin', ctrl.signin)

// GET /api/auth/logout
router.get('/logout', controllerWrapper(ctrl.logout))
// router.get('/signout', ctrl.signout)

module.exports = router
