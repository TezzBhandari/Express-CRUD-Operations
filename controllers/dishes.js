const Dish = require('../model/dishes');

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

const addComment = async (req, res, next) => {
  try {
    const result = await Dish.findByIdAndUpdate(
      req.params.id,
      {
        $push: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: 'Successfully added a comment',
      response: result,
    });
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
};
