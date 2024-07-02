import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
    const [vendorId, setVendorIdState] = useState(null);
    const [user_id, setUser_id] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const setVendorId = async (vendor_id) => {
        setVendorIdState(vendor_id);
        try {
            if (vendor_id !== null) {
                localStorage.setItem('vendorId', vendor_id.toString());
            } else {
                localStorage.removeItem('vendorId');
            }
        } catch (error) {
            console.error('Error saving vendor ID:', error);
        }
    };

    const fetchUserAndVendor = async () => {
        setIsLoading(true);
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error getting session:', error);
                setIsLoading(false);
                return;
            }
            if (session) {
                const { access_token, refresh_token } = session;
                await supabase.auth.setSession({ access_token, refresh_token });
            }

            const { data: userData, error: userError } = await supabase.auth.getUser();
            if (userError) {
                console.error('Error fetching user:', userError);
                setIsLoading(false);
                return;
            }
            const userId = userData?.user?.id ?? null;
            setUser_id(userId);

            // Retrieve vendorId from localStorage
            const storedVendorId = localStorage.getItem('vendorId');
            if (storedVendorId) {
                setVendorIdState(parseInt(storedVendorId, 10));
            }
        } catch (error) {
            console.error('Unexpected error fetching user and vendor:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserAndVendor();
    }, []);

    return (
        <VendorContext.Provider value={{ vendorId, user_id, setVendorId, isLoading }}>
            {children}
        </VendorContext.Provider>
    );
};

export const useVendor = () => {
    const context = useContext(VendorContext);
    if (!context) {
        throw new Error('useVendor must be used within a VendorProvider');
    }
    return context;
};
