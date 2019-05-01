import { Schema, model } from "mongoose";

let CategorySchema: Schema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    default: "",
    required: true
  },
  parent: {
    type: String,
    default: ""
  }
});

export default model("Category", CategorySchema);
