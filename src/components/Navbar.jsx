// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; // Assuming the CSS file contains necessary styles

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/projects">Projects</Link>
                </li>

                <li>
                    <Link to="/logs">Logs</Link>
                </li>

                <li>
                    <Link to="/forms">Forms</Link>
                </li>
                <li>
                    <Link to="/submitted-forms">Submitted Forms</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
