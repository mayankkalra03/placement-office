import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import {Questions} from "../models/questionSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllQuestions = catchAsyncErrors(async (req, res, next) => {
  const ques = await Questions.find();
  res.status(200).json({
    success: true,
    ques,
  });
});

export const postQues = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Student") {
    return next(
      new ErrorHandler("Student not allowed to access this resource.", 400)
    );
  }
  const {
    subject, 
    question, 
    answer
  } = req.body;

  if (!subject || !question || !answer) {
    return next(new ErrorHandler("Please provide full question details.", 400));
  }

  const postedBy = req.user._id;
  const ques = await Questions.create({
    subject, question, answer,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Question Posted Successfully!",
    ques,
  });
});

export const updateQues = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Student") {
    return next(
      new ErrorHandler("Student not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let ques = await Questions.findById(id);
  if (!ques) {
    return next(new ErrorHandler("OOPS! Question not found.", 404));
  }
  ques = await Questions.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Question Updated!",
  });
});

export const deleteQues = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Student") {
    return next(
      new ErrorHandler("Student not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const ques = await Questions.findById(id);
  if (!ques) {
    return next(new ErrorHandler("OOPS! Question not found.", 404));
  }
  await ques.deleteOne();
  res.status(200).json({
    success: true,
    message: "Question Deleted!",
  });
});

export const getSingleQues = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const ques = await Questions.findById(id);
    if (!ques) {
      return next(new ErrorHandler("Question not found.", 404));
    }
    res.status(200).json({
      success: true,
      ques,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});