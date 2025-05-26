// models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  category: {
    type: String,
    required: true,
    enum: ['cookies', 'seasonal', 'custom'],
    default: 'cookies'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  badge: {
    type: String,
    enum: ['bestseller', 'new', 'limited', ''],
    default: ''
  },
  ingredients: [{
    type: String
  }],
  allergens: [{
    type: String
  }],
  nutritionalInfo: {
    calories: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 }
  },
  inventory: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Inventory cannot be negative']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  weight: {
    type: Number, // in grams
    default: 50
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search optimization
ProductSchema.index({ title: 'text', description: 'text' });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema); 