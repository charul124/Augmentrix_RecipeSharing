import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return setError('No recipe ID provided');

      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError(error.response?.data?.message || 'Error fetching recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5000/api/recipes/${id}`);
        alert('Recipe deleted successfully.');
        navigate('/');
      } catch (error) {
        console.error('Error deleting recipe:', error);
        setError('There was an error deleting the recipe.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }}>Error: {error}</div>;
  }

  if (!recipe) {
    return <div style={{ color: 'red', textAlign: 'center' }}>Recipe not found</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px' }}
        loading="lazy"
      />
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>{recipe.description}</p>

      {/* Displaying tags for cuisine, type, and meal type */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <span style={{ backgroundColor: '#f0ad4e', padding: '5px 10px', borderRadius: '5px' }}>{recipe.cuisine}</span>
        <span style={{ backgroundColor: '#5bc0de', padding: '5px 10px', borderRadius: '5px' }}>{recipe.type}</span>
        <span style={{ backgroundColor: '#d9534f', padding: '5px 10px', borderRadius: '5px' }}>{recipe.mealType}</span>
      </div>

      {/* Displaying categorized ingredients */}
      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Ingredients:</h2>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>{ingredient.heading}</h3>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                {ingredient.items.map((item, idx) => (
                  <li key={idx} style={{ fontSize: '16px' }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Displaying steps */}
      {recipe.steps && recipe.steps.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Start Cooking : </h2>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index} style={{ fontSize: '16px', marginBottom: '8px' }}>
                <b>Step {index+1}</b> : {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <a
          href={`mailto:?subject=Check out this recipe&body=Check out this recipe: ${window.location.href}`}
          style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}
          aria-label="Share recipe"
        >
          Share
        </a>
        <a
          href={`/edit/${recipe._id}`} 
          style={{ backgroundColor: '#2ecc71', color: '#fff', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}
          aria-label="Edit recipe"
        >
          Edit
        </a>
        <button
          onClick={handleDelete}
          style={{ backgroundColor: '#e74c3c', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
          aria-label="Delete recipe"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
