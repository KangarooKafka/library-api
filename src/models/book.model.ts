import { model, Schema } from 'mongoose';
import IBook from '../common/interfaces/models/IBook'

// Schema for book
const bookSchema: Schema = new Schema<IBook>({
    title: {
        type: String,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        require: true
    },
    stock: {
        type: Number
    },
    available: {
        type: Number
    },
    fiction: {
        type: Boolean
    },
    genre: {
        type: String
    }
});

// Create and export model
export default model<IBook>('Book', bookSchema);