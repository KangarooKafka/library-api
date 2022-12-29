import { Document, Types} from 'mongoose';

// Interface for the Customer model
export default interface ICustomer extends Document {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    emailAddress?: string;
    balanceDue: number;
    booksCheckedOut: [Types.ObjectId]
}