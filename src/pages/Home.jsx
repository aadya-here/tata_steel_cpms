// src/components/HomePage.js
import React from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
// import '../styles'; 

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert('Error logging out: ' + error.message);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="container">
            <h2 className="header">Welcome to the Home Page</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default HomePage;
