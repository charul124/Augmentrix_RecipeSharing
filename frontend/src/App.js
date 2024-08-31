import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CreateRecipe from './pages/CreateRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetail from './pages/RecipeDetail';
import MyRecipes from './pages/MyRecipes'; // Import the MyRecipes component
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar'; // Import the Navbar component
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Render the Navbar component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateRecipe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditRecipe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-recipes"
          element={
            <ProtectedRoute>
              <MyRecipes />
            </ProtectedRoute>
          }
        />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;