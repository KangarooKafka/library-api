import { Document, Types} from 'mongoose';

// Interface for the Manager model
export default interface IManager extends Document {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}