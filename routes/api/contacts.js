const express = require('express')

const { controllerWrapper, validator, authenticate } = require('../../middelwares')
const { contacts: ctrl } = require('../../controllers')
const { joiSchema } = require('../../schemas/contacts')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.listContacts))

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getById))

router.post('/', authenticate, validator(joiSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', authenticate, controllerWrapper(ctrl.removeById))

router.put('/:contactId', authenticate, validator(joiSchema), controllerWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', authenticate, controllerWrapper(ctrl.updateStatusContactById))

module.exports = router
