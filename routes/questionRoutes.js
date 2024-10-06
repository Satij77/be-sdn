const express = require('express');
const router = express.Router();

const {
  getQuestionsByQuizId,
  addQuestionToQuiz,
  addMultipleQuestionsToQuiz,
  updateQuestion,
  deleteQuestion,
  getQuestionsWithCapital,
  getAllQuestions
} = require('../controllers/questionController');

// Route to get all questions for a specific quiz
router.get('/quizzes/:quizId/questions', getQuestionsByQuizId);
router.post('/quizzes/:quizId/question', addQuestionToQuiz);
router.post('/quizzes/:quizId/questions', addMultipleQuestionsToQuiz);
router.put('/questions/:questionId', updateQuestion);
router.delete('/questions/:questionId', deleteQuestion);
router.get('/quizzes/:quizId/populate', getQuestionsWithCapital);
router.get('/questions', getAllQuestions); 
module.exports = router;
