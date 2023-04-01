import { Schema } from "mongoose";

const CommentsSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Please provide content"],
      trim: true,
      maxlength: [500, "Content cannot be more than 500 characters"],
    },
    sentBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
    liked: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
);

export default CommentsSchema;
