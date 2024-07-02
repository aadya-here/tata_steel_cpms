import React from 'react';

const Subheading = ({ text }) => {
    return <p style={styles.subheading}>{text}</p>;
};

const styles = {
    subheading: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#000',
        marginVertical: '15px',
        textAlign: 'left',
        // Add any additional styles you need
    },
};

export default Subheading;
