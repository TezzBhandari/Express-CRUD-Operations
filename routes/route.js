const express = require('express');
const {
  getAllDishes,
  addDish,
  deleteAll,
  getDish,
  updateDish,
  deleteDish,
  addComment,
  getAllComment,
  deleteAllComment,
  getComment,
  updateComment,
  deleteComment,
} = require('../controllers/dishes');

const router = express.Router();

// CRUD OPERATIONS ON DISHES
router
  .route('/')
  .get(getAllDishes)
  .put((req, res, next) => {
    res.status(403).json({
      success: true,
      msg: 'PUT operation is not supported on /dishes.',
    });
  })
  .delete(deleteAll)
  .post(addDish);

// CRUD OPERATIONS ON SPECIFIC DISH
router
  .route('/:id')
  .get(getDish)
  .post((req, res, next) => {
    res.status(403).json({
      success: false,
      msg: `Post operation not supported on ${req.params.id}`,
    });
  })
  .put(updateDish)
  .delete(deleteDish);

// CRUD Opeartions on Sub Documents routes
router
  .route('/:dishId/comment')
  .post(addComment)
  .get(getAllComment)
  .put((req, res, next) => {
    res.status(400).json({
      success: false,
      msg: 'PUT Operations is not supported on this route',
    });
  })
  .delete(deleteAllComment);

router
  .route('/:dishId/comment/:commentId')
  .get(getComment)
  .post((req, res) => {
    res.status(400).json({
      success: false,
      msg: 'POST operatin not supported in this route.',
    });
  })
  .put(updateComment)
  .delete(deleteComment);

module.exports = router;
