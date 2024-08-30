const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  items: [{ type: String, required: true }]
});

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  steps: [{ type: String, required: true }],
  cuisine: { type: String, enum: ['Indian', 'Chinese', 'Italian', 'French', 'Mexican'], required: true },
  type: { type: String, enum: ['Veg', 'Non-Veg', 'Vegan'], required: true },
  mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks'], required: true },
  ingredients: [IngredientSchema]
});

module.exports = mongoose.model('Recipe', RecipeSchema);
