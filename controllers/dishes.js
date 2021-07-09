const Dish = require('../model/dishes');
const createError = require('http-errors');

const getAllDishes = async (req, res, next) => {
  try {
    const result = await Dish.find({});
    res.status(200).json({ success: true, dishes: result });
  } catch (err) {
    next(err);
  }
};

const addDish = async (req, res, next) => {
  try {
    const result = await Dish.create(req.body);
    res
      .status(201)
      .json({ success: true, msg: 'Dish Created', response: result });
  } catch (err) {
    next(err);
  }
};

const deleteAll = async (req, res, next) => {
  try {
    const result = await Dish.remove({});
    res
      .status(200)
      .json({ success: true, msg: 'All data is deleted', response: result });
  } catch (err) {
    next(err);
  }
};

const getDish = async (req, res, next) => {
  try {
    const result = await Dish.findById(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const updateDish = async (req, res, next) => {
  try {
    const result = await Dish.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      msg: `successfully updated the dish with an id of ${req.params.id}`,
      response: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteDish = async (req, res, next) => {
  try {
    const result = await Dish.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      msg: `successfully deleted a dish with an id of ${req.params.id}`,
      response: result,
    });
  } catch (err) {
    next(err);
  }
};

// CRUD OPERATIONS ON SUB DOCUMENTS

// ADD COMMENT
const addComment = async (req, res, next) => {
  try {
    const result = await Dish.findByIdAndUpdate(
      req.params.dishId,
      {
        $push: req.body,
      },
      { new: true }
    );
    if (!result) {
      next(createError(400, `Dish ${req.params.dishId} does not exist`));
    } else {
      res.status(200).json({
        success: true,
        message: `Successfully added a comment on Dish ${req.params.dishId}`,
        response: result,
      });
    }
  } catch (err) {
    next(err);
  }
};

// GET ALL THE COMMENTS
const getAllComment = async (req, res, next) => {
  try {
    const result = await Dish.findById(req.params.dishId).select({
      comments: 1,
      _id: 0,
    });
    if (!result) {
      next(createError(400, `Dish ${req.params.dishId} does not exist`));
    } else {
      res.status(200).json({
        success: true,
        msg: `All the comments on Dish ${req.params.dishId}`,
        data: result,
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// DELETE ALL THE COMMENTS
const deleteAllComment = async (req, res, next) => {
  try {
    const result = await Dish.findByIdAndUpdate(
      req.params.dishId,
      {
        $set: {
          comments: [],
        },
      },
      { new: true }
    );
    if (!result) {
      next(createError(400, `Dish ${req.params.dishId} does not exist`));
    } else {
      res.status(200).json({
        success: true,
        msg: `All the comments on Dish ${req.params.dishId} are deleted.`,
        data: result,
      });
    }
  } catch (err) {
    next(err);
  }
};

// GET COMMENT
const getComment = async (req, res, next) => {
  try {
    const result = await Dish.findById(req.params.dishId);
    if (result != null && result.comments.id(req.params.commentId) != null) {
      res.status(200).json({
        success: true,
        msg: `Succesfully got the comment ${req.params.commentId}`,
        data: result.comments.id(req.params.commentId),
      });
    } else if (result == null) {
      next(createError(403, `Dish ${req.params.dishId} does not exist`));
    } else if (result.comments.id(req.params.commentId) == null) {
      next(createError(403, `Comment ${req.params.commentId} does not exist`));
    } else {
      next(createError(500, `Internal Sever Error!`));
    }
  } catch (err) {
    next(err);
  }
};

// UPDATE COMMENT
const updateComment = async (req, res, next) => {
  try {
    const dish = await Dish.findById(req.params.dishId);
    if (dish != null && dish.comments.id(req.params.commentId) != null) {
      if (req.body.rating != null && req.body.comment != null) {
        dish.comments.id(req.params.commentId).rating = req.body.rating;
        dish.comments.id(req.params.commentId).comment = req.body.comment;
        const result = await dish.save();
        res.status(200).json({
          success: true,
          msg: `Successfully updated the comment ${req.params.commentId}`,
          response: result,
        });
      } else {
        next(createError(400, `Field cannot be empty!`));
      }
    } else if (dish == null) {
      next(createError(403, `Dish ${req.params.dishId} does not exist`));
    } else if (dish.comments.id(req.params.commentId) == null) {
      next(createError(403, `Comment ${req.params.commentId} does not exist`));
    } else {
      next(createError(500, `Internal Sever Error!`));
    }
  } catch (err) {
    next(err);
  }
};

// DELETE COMMENT
const deleteComment = async (req, res, next) => {
  try {
    const dish = await Dish.findById(req.params.dishId);
    if (dish != null && dish.comments.id(req.params.commentId) != null) {
      dish.comments.id(req.params.commentId).remove();
      const result = await dish.save();
      res.status(200).json({
        success: true,
        msg: `Succesfully deleted the comment ${req.params.commentId}`,
        response: result,
      });
    } else if (result == null) {
      next(createError(403, `Dish ${req.params.dishId} does not exist`));
    } else if (result.comments.id(req.params.commentId) == null) {
      next(createError(403, `Comment ${req.params.commentId} does not exist`));
    } else {
      next(createError(500, `Internal Sever Error!`));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
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
};
