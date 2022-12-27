import { Document, Types} from 'mongoose';

// Interface for the Customer model
export default interface ICustomer extends Document {
    firstName: string;
    lastName: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zip: number;
    };
    phoneNumber?: string;
    emailAddress?: string;
    balanceDue: number;
    booksCheckedOut: [Types.ObjectId]
}