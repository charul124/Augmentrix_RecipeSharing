import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ backgroundColor: '#2d3748', padding: '1rem' }} >
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                <Link to="/" style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }} >Gourmet Gallery</Link>
                <div>
                    <Link to="/create" style={{ color: 'white', marginRight: '1rem' }}>Create Recipe</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;