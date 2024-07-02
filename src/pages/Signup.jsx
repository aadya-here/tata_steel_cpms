import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
// import '../styles/auth.css'; // Assuming the CSS file contains necessary styles


const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vendorCode, setVendorCode] = useState('');
    const [name, setName] = useState('');
    const [gatepassNumber, setGatepassNumber] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const navigate = useNavigate();

    const signUpWithSupabase = async (email, password) => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            console.error('Error signing up with Supabase:', error.message);
            throw error;
        }

        // Get the signed-up user
        const { data: user, error: getUserError } = await supabase.auth.getUser();
        if (getUserError) {
            console.error('Error retrieving user after signup:', getUserError.message);
            throw getUserError;
        }
        return user;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Step 1: Sign up user using Supabase auth
            const { user } = await signUpWithSupabase(email, password);

            // Step 2: Insert additional details into vendor_user table
            const { data, error: insertError } = await supabase
                .from('vendor_user')
                .insert([
                    {
                        email,
                        created_at: moment().format(),
                        vendor_code: vendorCode,
                        name,
                        gatepass: gatepassNumber,
                        mobile: mobileNumber,
                        user_id: user.id, // Assuming user.id is the ID returned from Supabase auth
                    }
                ])
                .select();

            if (insertError) {
                console.error('Error inserting into vendor_user:', insertError.message);
                throw insertError;
            }

            console.log('Insert successful:', data);

            // Step 3: Navigate to login page on successful signup
            navigate('/login');
        } catch (error) {
            alert('Error signing up: ' + error.message);
        }
    };

    return (
        <div className="container">
            <h2 className="header">Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Vendor Code"
                    value={vendorCode}
                    onChange={(e) => setVendorCode(e.target.value)}
                    required
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Gatepass Number"
                    value={gatepassNumber}
                    onChange={(e) => setGatepassNumber(e.target.value)}
                    required
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default SignupPage;
