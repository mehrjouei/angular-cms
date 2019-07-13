import { Schema, model } from 'mongoose';

// TODO
// Need to find a better way of grabbing the date, probably some biz logic in UserRouter
let UserSchema: Schema = new Schema({
  createDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  editDate: {
    type: Date,
    default: Date.now
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false,
    required: true
  },
  Roles: [{
    type: Schema.Types.ObjectId,
    ref: 'Roles'
  }],
  website: {
    type: Schema.Types.ObjectId,
    ref: "Website",
    // required: true
  },
  isActive: {
    type: Boolean,
    default: false,
    required: true
  },
  verifyId: {
    type: String
  }
});


export default model('User', UserSchema);