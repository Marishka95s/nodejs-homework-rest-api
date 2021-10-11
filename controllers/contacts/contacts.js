const { Contact } = require('../../schemas')

const listContacts = async (req, res, next) => {
  const contacts = await Contact.find({})
  res.json({
    status: 'success',
    code: 200,
    contacts
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
  const result = await Contact.create(req.body)
  res.status(201).json({
    status: 'successfully created',
    code: 201,
    result
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
