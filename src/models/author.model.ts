import { model, Schema } from 'mongoose';
import IAuthor from '../common/interfaces/models/IAuthor'

// Schema for author
const authorSchema: Schema = new Schema<IAuthor>({

});

// Create and export model
export default model<IAuthor>('Author', authorSchema);