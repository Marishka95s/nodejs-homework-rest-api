const controllerWrapper = require('./controllerWrapper')
const validator = require('./validator')
const authenticate = require('./authenticate')
const upload = require('./upload')
const sizeChanger = require('./sizeChanger')

module.exports = {
  controllerWrapper,
  validator,
  authenticate,
  upload,
  sizeChanger
}
