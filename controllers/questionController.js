const mongoose = require('mongoose');
const Question = require('../models/Question');

// Get all questions for a specific quiz
exports.getQuestionsByQuizId = async (req, res) => {
  try {
    const quizId = req.params.quizId;

    // Check if quizId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ error: 'Invalid Quiz ID format' });
    }

    const questions = await Question.find({ quizId: quizId });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all questions that contain the word "capital"
exports.getQuestionsWithCapital = async (req, res) => {
  try {
    const quizId = req.params.quizId;

    const questions = await Question.find({
      quizId: quizId,
      text: /capital/i // Match questions that contain "capital"
    });

    if (!questions.length) return res.status(404).json({ message: 'No questions found' });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new question for a specific quiz
exports.addQuestionToQuiz = async (req, res) => {
  try {
    const { text, options, correctAnswerIndex } = req.body;
    const newQuestion = new Question({ text, options, correctAnswerIndex, quizId: req.params.quizId });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Create multiple questions for a specific quiz
exports.addMultipleQuestionsToQuiz = async (req, res) => {
  try {
    const questionsData = req.body.questions.map(q => ({ ...q, quizId: req.params.quizId }));
    const questions = await Question.insertMany(questionsData);
    res.status(201).json(questions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a question by ID
exports.updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.questionId, req.body, { new: true });
    if (!updatedQuestion) return res.status(404).json({ message: 'Question not found' });
    res.status(200).json(updatedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a question by ID
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find(); // Fetch all questions
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
