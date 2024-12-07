import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    unique: true,
    required: true,
  },
  name: String,
  passwordHash: String
})

userSchema.set('toJSON', {
  transform: (document, userObj) => {
    userObj.id = userObj._id.toString()
    delete userObj._id
    delete userObj.__v
    delete userObj.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

export default User