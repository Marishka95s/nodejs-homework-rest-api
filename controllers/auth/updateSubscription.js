const { User } = require('../../schemas')
const { BadRequest, NotFound } = require('http-errors')

const updateSubscription = async(req, res) => {
  const { _id } = req.user
  const { subscription } = req.body
  if (!subscription) {
    throw new BadRequest('Missing field subscription')
  }
  if (subscription !== 'starter' && subscription !== 'pro' && subscription !== 'business') {
    throw new BadRequest('Wrong field subscription')
  }
  const result = await User.findByIdAndUpdate(_id, { subscription }, { new: true })

  if (!result) {
    throw new NotFound(`User with id=${_id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = updateSubscription
