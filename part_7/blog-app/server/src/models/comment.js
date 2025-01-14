import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
})

commentSchema.set('toJSON', {
  transform: (document, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  },
})

export default new mongoose.model('Comment', commentSchema)
