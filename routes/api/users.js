const express = require('express')

const { controllerWrapper, authenticate, upload, sizeChanger } = require('../../middelwares')
const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.patch('/avatars', authenticate, upload.single('avatar'), sizeChanger, controllerWrapper(ctrl.updateAvatar))

module.exports = router
