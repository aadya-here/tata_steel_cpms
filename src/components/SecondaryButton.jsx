import React from 'react';

const SecondaryButton = ({ text, onClick }) => {
    const styles = {
        button: {
            border: '2px solid #060665',
            borderRadius: '10px',
            padding: '10px 35px',
            margin: '10px',
            fontWeight: 'bold',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        }
    };

    const hoverStyles = {
        backgroundColor: '#060665',
        color: '#fff',
    };

    const handleMouseEnter = (e) => {
        Object.assign(e.target.style, hoverStyles);
    };

    const handleMouseLeave = (e) => {
        Object.assign(e.target.style, styles.button);
    };

    return (
        <button
            style={styles.button}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {text}
        </button>
    );
};

export default SecondaryButton;
