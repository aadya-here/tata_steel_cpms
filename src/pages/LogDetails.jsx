import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Assuming supabase is imported and configured for API calls
import FormItem from '../components/FormItem'; // Import the FormItem component
import '../styles/logDetails.css'; // Import your stylesheet

const LogDetailsPage = () => {
    const { logId } = useParams(); // Get logId from route params
    const [log, setLog] = useState(null); // State to store log details

    useEffect(() => {
        // Fetch log details based on logId
        const fetchLogDetails = async () => {
            try {
                const { data, error } = await supabase
                    .from('logs')
                    .select('*')
                    .eq('log_id', logId)
                    .single();

                if (error) {
                    throw error;
                }

                setLog(data); // Set log details to state
            } catch (error) {
                console.error('Error fetching log details:', error.message);
                // Handle error (e.g., show a message to the user)
            }
        };

        fetchLogDetails();
    }, [logId]);



    if (!log) {
        return <div className="loading">Loading...</div>; // Display loading state while fetching data
    }

    return (
        <div className="container">
            <h2 className="pageTitle">Log Details</h2>
            <FormItem title="Log ID" value={log.log_id} />
            <FormItem title="Project ID" value={log.project_id || 'N/A'} />
            <FormItem title="Vendor ID" value={log.vendor_id || 'N/A'} />
            <FormItem title="Work Permit" value={log.work_permit || 'N/A'} />
            <FormItem title="Valid From" value={log.valid_from || 'N/A'} />
            <FormItem title="Valid Till" value={log.valid_till || 'N/A'} />
            <FormItem title="Number of Workers" value={log.num_workers || 'N/A'} />
            {/* Add more FormItem components for other fields */}

            {/* Example of navigating back to logs list */}
            <Link to="/logs" className="backLink">Back to Logs</Link>
        </div>
    );
};

export default LogDetailsPage;
