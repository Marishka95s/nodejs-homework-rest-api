const express = require('express')

const { controllerWrapper, validator } = require('../../middelwares')
const { contacts: ctrl } = require('../../controllers')
const { joiSchema } = require('../../schemas/contacts')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validator(joiSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', controllerWrapper(ctrl.removeById))

router.put('/:contactId', validator(joiSchema), controllerWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', controllerWrapper(ctrl.updateStatusContactById))

module.exports = router
