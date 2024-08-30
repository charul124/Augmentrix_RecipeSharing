import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetail from './pages/RecipeDetail';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/create" element={<CreateRecipe />} />
                <Route path="/edit/:id" element={<EditRecipe />} />;
                <Route path="/recipe/:id" element={<RecipeDetail />} />
            </Routes>
        </Router>
    );
}

export default App;