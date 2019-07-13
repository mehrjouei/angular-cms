import { Schema, model } from 'mongoose';

// TODO
// Need to find a better way of grabbing the date, probably some biz logic in UserRouter
let RolesSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'AC',
    required: true
  },
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'Resources'
  }],
  website: {
    type: Schema.Types.ObjectId,
    ref: "Website",
    // required: true
  }
});

export default model('Roles', RolesSchema);