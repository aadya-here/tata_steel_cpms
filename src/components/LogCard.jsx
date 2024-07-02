import React from 'react';

const LogCard = ({ log }) => {
    return (
        <div style={styles.card}>
            <p style={styles.text}>
                Project {log.project_id} : {log.project_title}
            </p>
            <p style={styles.text}>{log.date} | {log.day}</p>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: '#fff',
        padding: '16px',
        margin: '8px 0',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    text: {
        fontSize: '16px',
        marginBottom: '8px',
    },
};

export default LogCard;
