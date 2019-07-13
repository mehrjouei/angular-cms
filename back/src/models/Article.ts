import { Schema, model } from "mongoose";

let ArticleSchema: Schema = new Schema({
  title: {
    type: String,
    default: "",
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  summary: {
    type: String,
    default: "",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    }
  ],
  comments: [
    {
      parent: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      text: {
        type: String,
        default: "",
        required: true
      },
      slug: {
        type: String,
        required: true
      },
      likeCount: {
        type: Number,
        default: 0
      },
      score: {
        type: Number,
        default: 0
      },
      createDate: {
        type: Date,
        default: Date.now,
        required: true
      },
      editDate: {
        type: Date,
        default: Date.now
      }
    }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true
  },
  authorName: {
    type: String
    // required: true
  },
  createDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  editDate: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    default: ""
  },
  tags: {
    type: String,
    required: true
  },
  isDraft: {
    type: Boolean,
    default: true
  },
  visitCount: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0
  },
  website: {
    type: Schema.Types.ObjectId,
    ref: "Website",
    required: true
  }
});

export default model("Article", ArticleSchema);
