import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const cardStyles = {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer', // Ensure the card is clickable
        textDecoration: 'none', // Remove default link underline
        color: '#333', // Set text color
    };

    const titleStyles = {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    };

    return (
        <Link to={`/projects/${project.project_id}`} style={cardStyles}>
            <div>
                <h3 style={titleStyles}>Project ID: {project.project_id}</h3>
                <p>Type: {project.type}</p>
                <p>Status: {project.status}</p>
                <p>Location: {project.location}</p>
                <p>Vendor ID: {project.vendor_id}</p>
            </div>
        </Link>
    );
};

export default ProjectCard;
