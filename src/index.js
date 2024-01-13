const contacts = require("./contacts");

const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactList = await contacts.listContacts();
      console.log("List of contacts:\n", contactList);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log("Contact:\n", contact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log("New contact: \n", newContact);
      break;

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.log("Removing this contact: \n", deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
