import React from 'react';

const ProjectDetailItem = ({ title, value }) => {
    const styles = {
        container: {
            marginBottom: '10px',
            fontSize: '16px',
        },
        title: {
            fontWeight: 'bold',
            marginRight: '10px',
        },
        value: {
            display: 'inline-block',
            minWidth: '150px',
        },
        tableRow: {
            display: 'flex',
            alignItems: 'center',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.tableRow}>
                <span style={styles.title}>{title}:</span>
                <span style={styles.value}>{value || 'N/A'}</span>
            </div>
        </div>
    );
};

export default ProjectDetailItem;
