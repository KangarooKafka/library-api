import { Document, Types} from 'mongoose';

// Interface for the Book model
export default interface IBook extends Document {
    title: string;
    author: Types.ObjectId;
    stock: number,
    available: number,
    fiction?: boolean;
    genre?: string;
}