import { Schema, model } from 'mongoose';

// TODO
// Need to find a better way of grabbing the date, probably some biz logic in UserRouter
let ResourcesSchema: Schema = new Schema({

  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  resourceContentReg: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'AC', // active, deactivated
    required: true
  },
  method: {
    type: String,
    required: true
  },
});


export default model('Resources', ResourcesSchema);