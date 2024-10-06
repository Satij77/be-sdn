const Quiz = require('../models/Quiz');
const Question = require('../models/Question'); // Import the Question model

// Get all quizzes with populated questions
exports.getQuizzes = async (req, res) => {
  try {
    // Populate the questions for each quiz
    const quizzes = await Quiz.find().populate('questions');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get quiz by ID and populate questions
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId).populate('questions'); // Populate questions
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    // Populate questions explicitly
    const questions = await Question.find({ quizId: quiz._id });
    const populatedQuiz = { ...quiz._doc, questions }; // Combine quiz data with questions

    res.json(populatedQuiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new quiz
exports.createQuiz = async (req, res) => {
    const { title, description } = req.body;

    try {
        const newQuiz = new Quiz({ title, description });
        await newQuiz.save();
        res.redirect('/quizzes'); // Redirect sau khi tạo quiz thành công
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create quiz' });
    }
};

// Update a quiz by ID
exports.updateQuiz = async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.quizId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedQuiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json(updatedQuiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a quiz by ID and its associated questions
exports.deleteQuiz = async (req, res) => {
  try {
    // Find the quiz to delete
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    // Delete associated questions
    await Question.deleteMany({ quizId: quiz._id });

    // Delete the quiz
    await Quiz.findByIdAndDelete(req.params.quizId);

    res.json({ message: 'Quiz and associated questions deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

