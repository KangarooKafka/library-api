import { model, Schema } from 'mongoose';
import IEmployee from '../common/interfaces/models/IEmployee'
import bcrypt from 'bcrypt';
const SALT = process.env.SALTFACTOR;

// Schema for Employee
const employeeSchema: Schema = new Schema<IEmployee>({
    username: {
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
employeeSchema.pre('save', function(next){
    const user = this;

    // Only hash the password if it is modified or new
    if(!user.isModified('password')) return next();

    // Hash password
    bcrypt
        .genSalt(Number(SALT))
        .then((salt: any) => {
            return bcrypt.hash(user.password, salt);
        })
        .then((hash: any) => {
            user.password = hash;
            next();
        })
});

// Create and export model
export default model<IEmployee>('Employee', employeeSchema);