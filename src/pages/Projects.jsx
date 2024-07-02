import React, { useEffect, useState } from 'react';
import { useVendor } from '../context/vendor_context';
import { Link, useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { supabase } from '../supabaseClient';
import '../styles/projects.css';

const ProjectsPage = () => {
    const { vendorId } = useVendor();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [vendorName, setVendorName] = useState('');
    const [activeTab, setActiveTab] = useState('ongoing');
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        if (vendorId) {
            fetchProjects();
        }
    }, [vendorId]);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('vendor_id', vendorId)
                .eq('sent_to_vendor', true);

            if (error) {
                throw error;
            }

            setProjects(data);
            filterProjectsByTab(activeTab, data);
        } catch (error) {
            console.error('Error fetching projects:', error.message);
            // Handle error (e.g., show a message to the user)
        }
    };

    const filterProjectsByTab = (tab, projects) => {
        const filtered = projects.filter(project => project.status === tab);
        setFilteredProjects(filtered);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        filterProjectsByTab(tab, projects);
    };

    const navigateToProjectDetails = (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    return (
        <div className="container">
            <h2>Vendor Projects</h2>
            <p>Vendor ID: {vendorId}</p>
            {vendorName && <p>Vendor Name: {vendorName}</p>}

            <div className="tabs">
                <button className={activeTab === 'ongoing' ? 'active' : ''} onClick={() => handleTabChange('ongoing')}>
                    Ongoing
                </button>
                <button className={activeTab === 'upcoming' ? 'active' : ''} onClick={() => handleTabChange('upcoming')}>
                    Upcoming
                </button>
                <button className={activeTab === 'completed' ? 'active' : ''} onClick={() => handleTabChange('completed')}>
                    Completed
                </button>
            </div>

            <div className="projects">
                {filteredProjects.map(project => (
                    <ProjectCard project={project} />

                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;
