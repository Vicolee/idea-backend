import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const CommentSchema = new Schema({
    content: { type: String, required: true },
    postId: { type: String, required: true },
    userId: { type: String, required: true },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
  minimize: false,
});

const CommentModel = mongoose.model('Comment', CommentSchema);

export default CommentModel;