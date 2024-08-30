import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeForm from '../components/RecipeForm';
import { useParams, useNavigate } from 'react-router-dom';

const EditRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        if (response.status === 200) {
          setRecipe(response.data);
        } else {
          setError('Recipe not found');
        }
      } catch (error) {
        console.error('There was an error fetching the recipe!', error);
        setError('There was an error fetching the recipe.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  const handleSubmit = async (updatedRecipe) => {
    try {
      setLoading(true);
      console.log('Updating recipe with ID:', id);
      const response = await axios.put(`http://localhost:5000/api/recipes/${id}`, updatedRecipe);
      console.log('Recipe updated successfully:', response.data);
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error('There was an error updating the recipe!', error);
      setError('There was an error updating the recipe.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-8">Edit Recipe</h1>
      {recipe && <RecipeForm onSubmit={handleSubmit} recipe={recipe} />}
    </div>
  );
};

export default EditRecipe;
