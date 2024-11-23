import mongoose from 'mongoose';
import 'dotenv/config';

const uri = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose
  .connect(uri)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message);
  });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    match: /\d{3}-\d{3}-\d{4}/,
    required: true
  },
});

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model('Contact', contactSchema);
