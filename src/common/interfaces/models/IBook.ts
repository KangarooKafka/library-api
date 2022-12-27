import { Document, Types} from 'mongoose';

// Interface for the Book model
export default interface IBook extends Document {
    title: string;
    author: Types.ObjectId;
    fiction?: boolean;
    genre?: string;
}