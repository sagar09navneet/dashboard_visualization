import { Schema, model } from 'mongoose';

// Define the schema
const dataSchema = new Schema({
  end_year: Number,
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  start_year: Number,
  country: String,
  topic: String,
  region: String,
  
},{ collection: 'myCollection' });

// Create the model
const DataModel = model('Data', dataSchema);

export const find = async (filters = {}) => {
  return DataModel.find(filters).exec();
};


export default DataModel;
