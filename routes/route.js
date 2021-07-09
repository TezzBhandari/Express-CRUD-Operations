const express = require('express');
const {
  getAllDishes,
  addDish,
  deleteAll,
  getDish,
  updateDish,
  deleteDish,
  addComment,
} = require('../controllers/dishes');

const router = express.Router();

router
  .route('/')
  .get(getAllDishes)
  .put((req, res, next) => {
    res.status(403).json({
      success: true,
      msg: 'PUT operation is not supported on /dishes.',
    });
  });

router.post('/add', addDish);
router.delete('/all', deleteAll);

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

router.route('/comment/add/:id').post(addComment);

module.exports = router;
