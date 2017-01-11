import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Comment = new Schema({
    writer: String,
    contents: String,
    starred: [String],
    date: {
        created: { type: Date, default: Date.now },
        edited: { type: Date, default: Date.now }
    },
    isEdited: { type: Boolean, default: false }
});

export default mongoose.model('comment', Comment);
