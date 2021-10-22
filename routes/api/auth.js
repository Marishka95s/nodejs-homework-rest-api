const express = require('express')

const { controllerWrapper, validator, authenticate } = require('../../middelwares')
const { joiSchema } = require('../../schemas/users')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

// POST /api/auth/register
// router.post('/register', validator(joiSchema), controllerWrapper(ctrl.register))
router.post('/signup', validator(joiSchema), controllerWrapper(ctrl.register))

// POST /api/auth/login
router.post('/login', validator(joiSchema), controllerWrapper(ctrl.login))
// router.post('/signin', ctrl.signin)

// GET /api/auth/logout
router.get('/logout', authenticate, controllerWrapper(ctrl.logout))
// router.get('/signout', ctrl.signout)

router.get('/current', authenticate, controllerWrapper(ctrl.current))

router.patch('/current', authenticate, controllerWrapper(ctrl.updateSubscription))

module.exports = router
