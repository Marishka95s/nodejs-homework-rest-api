const getAll = require('./getAll');

const getById = async (id) => {
  const contacts = await getAll();
  const idx = contacts.findIndex(item => item.id === id);
  // const contact = contacts.find(item=>item.id === id);
  if (idx === -1) {
    return null;
  }
  // if(!contact){
  //     return null;
  // }
  return contacts[idx];
  // return product;
}

module.exports = getById;
