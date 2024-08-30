import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeGrid from '../components/RecipeGrid';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [cuisineFilter, setCuisineFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [mealTypeFilter, setMealTypeFilter] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/recipes/get');
                if (response.data && Array.isArray(response.data)) {
                    setRecipes(response.data);
                    setFilteredRecipes(response.data);
                } else {
                    console.error('Invalid response format:', response.data);
                }
            } catch (error) {
                console.error('There was an error fetching the recipes!', error);
            }
        };

        fetchRecipes();
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        filterRecipes(term, cuisineFilter, typeFilter, mealTypeFilter);
    };

    const handleCuisineFilterChange = (event) => {
        const selectedCuisine = event.target.value;
        setCuisineFilter(selectedCuisine);
        filterRecipes(searchTerm, selectedCuisine, typeFilter, mealTypeFilter);
    };

    const handleTypeFilterChange = (event) => {
        const selectedType = event.target.value;
        setTypeFilter(selectedType);
        filterRecipes(searchTerm, cuisineFilter, selectedType, mealTypeFilter);
    };

    const handleMealTypeFilterChange = (event) => {
        const selectedMealType = event.target.value;
        setMealTypeFilter(selectedMealType);
        filterRecipes(searchTerm, cuisineFilter, typeFilter, selectedMealType);
    };

    // Function to filter recipes based on search term and selected filters
    const filterRecipes = (searchTerm, cuisine, type, mealType) => {
        const filtered = recipes.filter((recipe) => 
            (recipe.title.toLowerCase().includes(searchTerm) || 
            recipe.description.toLowerCase().includes(searchTerm)) &&
            (cuisine === '' || recipe.cuisine === cuisine) &&
            (type === '' || recipe.type === type) &&
            (mealType === '' || recipe.mealType === mealType)
        );
        setFilteredRecipes(filtered);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginTop: '32px' }}>Discover Recipes</h1>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search recipes..."
                    style={{
                        padding: '10px',
                        width: '50%',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        fontSize: '16px'
                    }}
                />
                <select
                    value={cuisineFilter}
                    onChange={handleCuisineFilterChange}
                    style={{
                        padding: '10px',
                        marginLeft: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        fontSize: '16px'
                    }}
                >
                    <option value="">All Cuisines</option>
                    <option value="Indian">Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Italian">Italian</option>
                    <option value="French">French</option>
                    <option value="Mexican">Mexican</option>
                </select>
                <select
                    value={typeFilter}
                    onChange={handleTypeFilterChange}
                    style={{
                        padding: '10px',
                        marginLeft: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        fontSize: '16px'
                    }}
                >
                    <option value="">All Types</option>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                    <option value="Vegan">Vegan</option>
                </select>
                <select
                    value={mealTypeFilter}
                    onChange={handleMealTypeFilterChange}
                    style={{
                        padding: '10px',
                        marginLeft: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        fontSize: '16px'
                    }}
                >
                    <option value="">All Meal Types</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Snacks">Snacks</option>
                </select>
            </div>
            <RecipeGrid recipes={filteredRecipes} />
        </div>
    );
};

export default Home;
