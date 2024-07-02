import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useVendor } from '../context/vendor_context';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [vendorName, setVendorName] = useState('');
    const { vendorId } = useVendor(); // Correctly destructure vendorId from context
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const { data: { user }, error } = await supabase.auth.getUser();
                if (error) {
                    console.error('Error fetching user:', error);
                    return;
                }
                setUserDetails(user);

                console.log('vendorId:', vendorId); // Ensure vendorId is correctly received

                if (vendorId) {
                    const { data: vendorData, error: vendorError } = await supabase
                        .from('vendors')
                        .select('vendor_name')
                        .eq('vendor_id', vendorId)
                        .single();

                    if (vendorError) {
                        console.error('Error fetching vendor:', vendorError);
                        return;
                    }
                    console.log('vendorData:', vendorData);
                    setVendorName(vendorData.vendor_name);
                }
            } catch (error) {
                console.error('Unexpected error fetching details:', error.message);
            }
        };

        fetchUserDetails();
    }, [vendorId]); // Ensure useEffect dependency includes vendorId

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert('Error signing out: ' + error.message);
        } else {
            navigate('/');
        }
    };

    if (!userDetails) {
        return (
            <div className="profile-container">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <h2 className="profile-title">Profile</h2>
            <p className="profile-label">Email: {userDetails.email}</p>
            {vendorName && <p className="profile-label">Vendor: {vendorName}</p>}
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default ProfilePage;
