import { Schema, model } from "mongoose";

let PageSchema: Schema = new Schema({
  title: {
    type: String,
    // required: true
  },
  slug: {
    type: String,
    required: true
  },
  assets: {
    type: String,
    default: ""
  },
  tags: {
    type: String,
    // required: true
  },
  isInMenu: {
    type: Boolean,
    default: false
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role"
    }
  ],
  template: {
    type: Schema.Types.ObjectId,
    ref: "Template"
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true
  },
  priority: {
    type: Number,
    required: true,
    default: 0
  },
  authorName: {
    type: String
    // required: true
  },
  createDate: {
    type: Date,
    default: null,
    // required: true //TODO!
  },
  editDate: {
    type: Date,
    default: null,
    // required: true
  },
  website: {
    type: Schema.Types.ObjectId,
    ref: "Website",
    required: true
  },
  parts: [
    {
      module: {
        type: Schema.Types.ObjectId,
        ref: 'Module',
        required: true
      },
      container: {
        type: Schema.Types.ObjectId,
        ref: 'Container',
        required: true
      },
      pane: {
        type: String,
        required: true
      },
      data: Schema.Types.Mixed,
      title: {
        type: String,
        required: true
      },
      roles: [
        {
          type: Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
    }
  ]
});

export default model("Page", PageSchema);
