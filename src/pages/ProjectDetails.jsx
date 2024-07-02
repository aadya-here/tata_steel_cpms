// ProjectDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Assuming supabase is imported and configured for API calls
import FormItem from '../components/FormItem'; // Import your FormItem component
import '../styles/projectDetails.css'; // Import your stylesheet

const ProjectDetailsPage = () => {
    const { projectId } = useParams(); // Get projectId from route params
    const navigate = useNavigate();
    const [project, setProject] = useState(null); // State to store project details

    useEffect(() => {
        // Fetch project details based on projectId
        const fetchProjectDetails = async () => {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('project_id', projectId)
                    .single();

                if (error) {
                    throw error;
                }

                setProject(data); // Set project details to state
            } catch (error) {
                console.error('Error fetching project details:', error.message);
                // Handle error (e.g., show a message to the user)
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    if (!project) {
        return <div className="loading">Loading...</div>; // Display loading state while fetching data
    }

    return (
        <div className="container">
            <h2 className="pageTitle">Project Details</h2>
            <FormItem title="Project ID" value={projectId} />
            <FormItem title="Project Title" value={project.project_title || 'N/A'} />
            <FormItem title="Type" value={project.type || 'N/A'} />
            <FormItem title="Status" value={project.status} />
            <FormItem title="Location" value={project.location || 'N/A'} />
            <FormItem title="Project Goal" value={project.project_goal || 'N/A'} />
            <FormItem title="Planned Start Date" value={project.planned_start_date || 'N/A'} />
            <FormItem title="Actual Start Date" value={project.actual_start_date || 'N/A'} />
            <FormItem title="Planned End Date" value={project.planned_end_date || 'N/A'} />
            <FormItem title="Actual End Date" value={project.actual_end_date || 'N/A'} />
            <FormItem title="Delivery End Date" value={project.delivery_end_date || 'N/A'} />
            <FormItem title="Validity End Date" value={project.validity_end_date || 'N/A'} />

            <Link to="/create-log" className="backLink">Create Today's Log</Link>
            <Link to="/projects" className="backLink">Back to Projects</Link>
        </div>
    );
};

export default ProjectDetailsPage;

