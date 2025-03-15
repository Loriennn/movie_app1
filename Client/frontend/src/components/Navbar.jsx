import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">Movie App</Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/top-rated" className="hover:text-gray-300">Top Rated</Link>
                    <Link to="/random" className="hover:text-gray-300">Random</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
