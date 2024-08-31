import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RecipeGrid from '../components/RecipeGrid';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/my-recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h1 h1 className="text-center text-3xl font-bold mt-8">My Recipes</h1>
      <RecipeGrid recipes={recipes} />
    </div>
  );
};

export default MyRecipes;