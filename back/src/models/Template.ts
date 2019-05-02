import { Schema, model } from "mongoose";

let TemplateSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  html: {
    type: String,
    required: true
  },
  assets: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  website: {
    type: Schema.Types.ObjectId,
    ref: "Website",
    required: true
  }
});

export default model("Template", TemplateSchema);
