const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2,  'Name must be at least 2 characters'],
    maxlength: [30, 'Name must not exceed 30 characters'],
  },
  weather: {
    type: String,
    required: [true, 'Weather is required'],
    enum: {
      values: ['hot', 'warm', 'cold'],
      message: 'Weather must be one of: hot, warm, cold',
    },
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Owner is required'],
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',

  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("item", clothingItemSchema);