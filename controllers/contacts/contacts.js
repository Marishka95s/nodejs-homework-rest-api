const { Contact } = require('../../schemas')

const listContacts = async (req, res, next) => {
  const { page = 1, limit = 5, favorite = true } = req.query
  const skip = (page - 1) * limit
  const { _id } = req.user
  const contacts = await Contact.find({ owner: _id, favorite }, '_id name phone owner', { skip, limit: +limit }).populate('owner', 'email')
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts
    }
  })
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await Contact.findById(contactId)
  if (!contact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`
    })
    return
  }
  res.json(
    {
      status: 'success',
      code: 200,
      contact
    })
}

const add = async (req, res, next) => {
  const { user } = req
  const newContact = { ...req.body, owner: user._id }
  const result = await Contact.create(newContact)
  res.status(201).json({
    status: 'successfully created',
    code: 201,
    data: {
      result
    }
  })
}

const updateById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body)
  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`
    })
    return
  }
  res.json({
    status: 'successfuly updated',
    code: 202,
    result
  })
}

const removeById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await Contact.findByIdAndRemove(contactId)
  if (!contact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`
    })
    return
  }
  res.json(
    {
      status: 'successfully deleted',
      code: 204
    })
}

const updateStatusContactById = async (req, res) => {
  if (req.body.favorite === undefined) {
    res.status(400).json({
      status: 'error',
      code: 404,
      message: 'missing field favorite'
    })
    return
  }
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body)
  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`
    })
    return
  }
  res.json({
    status: 'successfuly updated',
    code: 202
  })
}

module.exports = {
  listContacts,
  getById,
  add,
  updateById,
  removeById,
  updateStatusContactById
}
