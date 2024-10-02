const express = require('express');
const router = express.Router();
const {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  addQuestionToQuiz,
  addMultipleQuestionsToQuiz,
  getQuestionsWithKeyword
} = require('../controllers/quizController');

// Routes for quizzes
router.get('/quizzes', getQuizzes);
router.get('/quizzes/:quizId', getQuizById);
router.post('/quizzes', createQuiz);
router.put('/quizzes/:quizId', updateQuiz);
router.delete('/quizzes/:quizId', deleteQuiz);

// Route for adding questions to a quiz
router.post('/quizzes/:quizId/question', addQuestionToQuiz);
router.post('/quizzes/:quizId/questions', addMultipleQuestionsToQuiz);

// Route for finding questions with the word "capital" in text
router.get('/quizzes/:quizId/populate', getQuestionsWithKeyword);

// Route to update a quiz by ID (EDIT QUIZ)
router.put('/quizzes/:quizId', updateQuiz);

module.exports = router;
