import React from 'react';
import axios from 'axios';
import RecipeForm from '../components/RecipeForm';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
    const navigate = useNavigate();

    const handleSubmit = async (recipe) => {
        try {
            const response = await axios.post('http://localhost:5000/api/recipes/', recipe);
            navigate(`/recipe/${response.data._id}`);
        } catch (error) {
            console.error('There was an error creating the recipe!', error);
            alert('Failed to create the recipe. Please try again.');
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
