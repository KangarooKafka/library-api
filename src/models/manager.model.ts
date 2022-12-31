import { model, Schema } from 'mongoose';
import IManager from '../common/interfaces/models/IManager'
import bcrypt from 'bcrypt';
const SALT = 10;

// Schema for manager
const managerSchema: Schema = new Schema<IManager>({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

// Method for hashing passwords before saving
managerSchema.pre('save', function(next){
    const user = this;

    // Only hash the password if it is modified or new
    if(!user.isModified('password')) return next();

    // Hash password
    bcrypt
        .genSalt(SALT)
        .then((salt: any) => {
            return bcrypt.hash(user.password, salt);
        })
        .then((hash: any) => {
            user.password = hash;
            next();
        })
});

// Create and export model
export default model<IManager>('Manager', managerSchema);