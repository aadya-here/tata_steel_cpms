import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CollapsibleSection = ({ isCollapsed, toggleCollapsed, fetchContent, headingText, children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async () => {
        if (isCollapsed && fetchContent) {
            setIsLoading(true);
            try {
                await fetchContent();
            } catch (error) {
                console.error('Error fetching content:', error.message);
            } finally {
                setIsLoading(false);
            }
        }
        toggleCollapsed(!isCollapsed);
    };

    return (
        <div className="collapsible-section">
            <div className="section-header" onClick={handleToggle}>
                <h2>{headingText}</h2>
                <span>{isCollapsed ? '+' : '-'}</span>
            </div>
            {!isCollapsed && (
                <div className="section-content">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        children // Render children when content is fetched
                    )}
                </div>
            )}
        </div>
    );
};

CollapsibleSection.propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
    toggleCollapsed: PropTypes.func.isRequired,
    fetchContent: PropTypes.func, // Optional function to fetch content asynchronously
    headingText: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default CollapsibleSection;
