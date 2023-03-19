import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const PostSchema = new Schema({
    categoryId: { type: String, required: false },
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
  minimize: false,
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;