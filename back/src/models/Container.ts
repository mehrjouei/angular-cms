import { Schema, model } from "mongoose";

let ContainerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  html: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: "",
    required: true
  }
});

export default model("Container", ContainerSchema);
