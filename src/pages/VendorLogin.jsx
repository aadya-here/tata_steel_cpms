import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useVendor } from '../context/vendor_context';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const VendorLoginPage = () => {
    const { setVendorId } = useVendor();
    const [vendorList, setVendorList] = useState([]);
    const [vendorCode, setVendorCode] = useState('');
    const [selectedVendor, setSelectedVendor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const { data, error } = await supabase
                    .from('vendors')
                    .select('vendor_id, vendor_name');

                if (error) {
                    console.error('Error fetching vendors:', error);
                    return;
                }

                const formattedVendors = data.map(vendor => ({
                    value: vendor.vendor_id,
                    label: vendor.vendor_name
                }));

                setVendorList(formattedVendors);
            } catch (error) {
                console.error('Unexpected error fetching vendors:', error.message);
            }
        };

        fetchVendors();
    }, []);

    const handleVendorSelect = (selectedOption) => {
        setSelectedVendor(selectedOption);
    };

    const handleVendorLogin = async (e) => {
        e.preventDefault();
        if (!selectedVendor || !vendorCode) {
            alert('Please select a vendor and enter the vendor code.');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('vendors')
                .select('*')
                .eq('vendor_id', selectedVendor.value)
                .single();

            if (error) {
                console.error('Error fetching vendor:', error);
                alert('Unable to fetch vendor details.');
                return;
            }

            if (data && data.vendor_code === parseInt(vendorCode)) {
                alert('Vendor login successful.');
                setVendorId(selectedVendor.value); // Set vendorId in context
                navigate('/projects');
            } else {
                alert('Invalid vendor code.');
            }
        } catch (error) {
            console.error('Error during vendor login:', error);
            alert('An unexpected error occurred during vendor login.');
        }
    };

    // console.log(selectedVendor.value)

    return (
        <div className="container">
            <h2 className="header">Vendor Login</h2>
            <form onSubmit={handleVendorLogin}>
                <Select
                    options={vendorList}
                    value={selectedVendor}
                    onChange={handleVendorSelect}
                    placeholder="Select Vendor"
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Enter Vendor Code"
                    value={vendorCode}
                    onChange={(e) => setVendorCode(e.target.value)}
                />
                <button type="submit">Vendor Login</button>
            </form>
        </div>
    );
};

export default VendorLoginPage;
