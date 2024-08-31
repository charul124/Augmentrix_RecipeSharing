import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeForm from '../components/RecipeForm';
import { useParams, useNavigate } from 'react-router-dom';
import useToken from '../pages/useToken';

const EditRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token, isValid } = useToken();

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        setError('There was an error fetching the recipe.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleSubmit = async (updatedRecipe) => {
    if (!isValid) {
      setError('Token is not valid');
      return;
    }
    console.log('handleSubmit called with updatedRecipe:', updatedRecipe);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      console.log('Sending PUT request with headers:', headers);
      const response = await axios.put(`http://localhost:5000/api/recipes/${id}`, updatedRecipe, { headers });
      console.log('Response from server:', response);
      navigate(`/recipe/${id}`);

    } catch (error) {
      if (error.response.status === 401) {
        alert("Sorry, you cannot edit this recipe as you are not the author.");
      } else {
        console.error('Error updating recipe:', error);
        alert('Error updating recipe. Please try again later.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-8">Edit Recipe</h1>
      {recipe && <RecipeForm onSubmit={handleSubmit} recipe={recipe} />}
    </div>
  );
};

export default EditRecipe;