const fs = require('fs/promises')
const path = require('path')
const { User } = require('../../schemas')

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user
  const { path: tempDir, originalname } = req.file
  const [extension] = originalname.split('.').reverse()

  const filename = `${_id}_avatar-image.${extension}`
  const uploadDir = path.join(__dirname, '../../', 'public\\avatars', filename)

  try {
    await fs.rename(tempDir, uploadDir)
    const image = path.join('avatars', filename)
    await User.findByIdAndUpdate(_id, { avatarURL: image })
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success update avatar',
      data: {
        avatarURL: uploadDir
      }
    })
  } catch (error) {
    await fs.unlink(tempDir)
    next(error)
  }
}

module.exports = updateAvatar
