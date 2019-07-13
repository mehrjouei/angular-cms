import { Schema, model } from "mongoose";

let CategorySchema: Schema = new Schema({
  name: {
    type: String,
    default: "",
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  website: {
    type: Schema.Types.ObjectId,
    ref: "Website",
    required: true
  }
});

export default model("Category", CategorySchema);
