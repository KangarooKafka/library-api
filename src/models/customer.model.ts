import {model, Schema, Types} from 'mongoose';
import ICustomer from '../common/interfaces/models/ICustomer'
import {stubTrue} from "lodash";

// Schema for customer
const customerSchema: Schema = new Schema<ICustomer>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    emailAddress: {
        type: String,
        unique: true
    },
    balanceDue: {
        type: Number,
        required: true,
        default: 0
    },
    booksCheckedOut: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    }]
});

// Create and export model
export default model<ICustomer>('Customer', customerSchema);