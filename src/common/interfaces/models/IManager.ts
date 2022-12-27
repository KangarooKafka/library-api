import { Document, Types} from 'mongoose';

// Interface for the Manager model
export default interface IManager extends Document {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
}