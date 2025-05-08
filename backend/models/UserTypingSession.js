import mongoose from "mongoose";

const userTypingSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  textGiven: {
    type: String,
    required: true,
  },
  textTyped: {
    type: String,
    required: true,
  },
  correctChars: {
    type: Number,
    default: 0,
  },
  incorrectChars: {
    type: Number,
    default: 0,
  },
  wpm: {
    type: Number,
    required: true,
  },
  accuracy: {
    type: Number,
    required: true,
  },
  weakKeys: {
    type: [String],
    default: [],
  },
  weakKeyStats: {
    type: Map,
    of: Number,
    default: {},
  }
}, { timestamps: true });

export default mongoose.model("TypingResult", userTypingSessionSchema);
