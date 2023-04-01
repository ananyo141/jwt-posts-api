import mongoose from "mongoose";

import CommentsSchema from "./commentsSchema";

export interface PostType {
  title: string;
  content: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxlength: [50, "Title cannot be more than 50 characters"],
    },
    message: {
      type: String,
      required: [true, "Please provide content"],
      trim: true,
      maxlength: [500, "Content cannot be more than 500 characters"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [CommentsSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
