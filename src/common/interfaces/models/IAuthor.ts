import { Document, Types} from 'mongoose';

// Interface for the Author model
export default interface IAuthor extends Document {
    firstName: string;
    lastName: string;
    books?: [Types.ObjectId];
}