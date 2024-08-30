import React from 'react';
import axios from 'axios';
import RecipeForm from '../components/RecipeForm';

const CreateRecipe = () => {
    const handleSubmit = async (recipe) => {
        try {
            const response = await axios.post('http://localhost:5000/api/recipes/', recipe);
            const newRecipeId = response.data._id;
            window.location.href = `/recipe/${newRecipeId}`;
        } catch (error) {
            console.error('There was an error creating the recipe!', error);
        }
    };

    return (
        <div>
            <h1 className="text-center text-3xl font-bold mt-8">Create a New Recipe</h1>
            <RecipeForm onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateRecipe;
