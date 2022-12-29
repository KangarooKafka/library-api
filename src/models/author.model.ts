import { model, Schema } from 'mongoose';
import IAuthor from '../common/interfaces/models/IAuthor'

// Schema for author
const authorSchema: Schema = new Schema<IAuthor>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

// Create and export model
export default model<IAuthor>('Author', authorSchema);