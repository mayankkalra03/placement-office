import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'The interview subject is required'],
  },
  question: {
      type: String,
      required: [true, 'Question text is required'],
    },
    answer: {
      type: String,
      required: [true, 'Answer text is required'],
    },
});

export const Questions = mongoose.model("Questions", questionSchema);
