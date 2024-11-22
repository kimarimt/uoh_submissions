import mongoose from 'mongoose';

if (process.argv.length < 3) {
  console.log('password is a required argument');
  process.exit();
}

const argmuents = process.argv.slice(2);
const password = argmuents[0];
const url = `mongodb+srv://kimarimt:${password}@cluster0.of2o7.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model('Contact', contactSchema);

if (process.argv.length === 3) {
  console.log('phonebook:');

  Contact.find({}).then((results) => {
    results.forEach((result) => console.log(`${result.name} ${result.number}`));
    mongoose.connection.close();
  });
} else {
  const contact = new Contact({
    name: argmuents[1],
    number: argmuents[2],
  });

  contact.save().then((result) => {
    console.log(`added ${contact.name} number ${contact.number} to phonebook`);
    mongoose.connection.close();
  });
}
