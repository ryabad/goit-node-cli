const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contact = data.find((option) => option.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const contact = data.findIndex((option) => option.id === contactId);

  if (contact !== -1) {
    const [deletedContact] = data.splice(contact, 1);

    await fs.writeFile(contactsPath, JSON.stringify(data));

    return deletedContact;
  } else {
    return null;
  }
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(data));

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
