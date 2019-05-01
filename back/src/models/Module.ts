import { Schema, model } from "mongoose";

let ModuleSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "",
    required: true
  },
  image: {
    type: String,
    default: "",
    required: true
  },
  website: {
    type: Schema.Types.ObjectId,
    ref: "Website",
    required: true
  }
});

export default model("Module", ModuleSchema);
