const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');
const validateObjectId = require('../middleware/validateObjectId');

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.put('/:id', auth, validateObjectId, updateTask);
router.delete('/:id', auth, validateObjectId, deleteTask);

module.exports = router;
