import { Document, Types} from 'mongoose';

// Interface for the Employee model
export default interface IEmployee extends Document {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}