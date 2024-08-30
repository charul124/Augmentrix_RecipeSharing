const express = require('express');
const mongoose = require('mongoose'); // Add this line
const router = express.Router();
const Recipe = require('../models/Recipe');


// Create a new recipe
router.post('/', async (req, res) => {
  try {
    const { title, description, image, steps, cuisine, type, mealType, ingredients } = req.body;

    // Basic validation for required fields
    if (!title || !Array.isArray(steps) || steps.length === 0) {
      return res.status(400).json({ message: 'Title and steps are required, and steps should be an array.' });
    }

    // Additional validation for required fields
    if (!cuisine || !type || !mealType) {
      return res.status(400).json({ message: 'Cuisine, type, and meal type are required.' });
    }

    // Validate ingredients structure
    if (!Array.isArray(ingredients) || ingredients.some(ing => !ing.heading || !Array.isArray(ing.items))) {
      return res.status(400).json({ message: 'Ingredients must be structured with headings and items.' });
    }

    const newRecipe = new Recipe({
      title,
      description,
      image,
      steps,
      cuisine,
      type,
      mealType,
      ingredients // Save the structured ingredients
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Error creating recipe', error });
  }
});

// Get all recipes (with optional filters)
router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const recipes = await Recipe.find(filters); // Filters are passed from query params
    if (Object.keys(filters).length === 0) { // If no filters are provided, retrieve all recipes
      recipes = await Recipe.find();
    }
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
});

// Get all recipes (without filters)
router.get('/get', async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Retrieve all recipes
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
});

// Get a recipe by ID
router.get('/:id', async (req, res) => {
  const recipeId = req.params.id;

  // Log the received ID for debugging
  console.log('Received ID:', recipeId);

  // Check if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res.status(400).json({ message: 'Invalid recipe ID format' });
  }

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    } 
    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ message: 'Error fetching recipe', error });
  }
});


// Update a recipe by ID
router.put('/:id', async (req, res) => {
  const recipeId = req.params.id;

  if (!recipeId || typeof recipeId !== 'string' || recipeId.trim() === '') {
    return res.status(400).json({ message: 'Invalid recipe ID' });
  }

  const { title, description, image, steps, cuisine, type, mealType, ingredients } = req.body;

  if (steps && !Array.isArray(steps)) {
    return res.status(400).json({ message: 'Steps should be an array.' });
  }

  if (ingredients && (!Array.isArray(ingredients) || ingredients.some(ing => !ing.heading || !Array.isArray(ing.items)))) {
    return res.status(400).json({ message: 'Ingredients must be structured with headings and items.' });
  }

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { title, description, image, steps, cuisine, type, mealType, ingredients },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Error updating recipe', error });
  }
});

// Delete a recipe by ID
router.delete('/:id', async (req, res) => {
  const recipeId = req.params.id;

  if (!recipeId || typeof recipeId !== 'string' || recipeId.trim() === '') {
    return res.status(400).json({ message: 'Invalid recipe ID' });
  }

  try {
    const recipe = await Recipe.findByIdAndDelete(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Error deleting recipe', error });
  }
});

module.exports = router;
