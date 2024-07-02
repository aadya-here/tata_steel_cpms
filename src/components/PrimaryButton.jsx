import React from 'react';

const PrimaryButton = ({ text, onPress }) => {
    const styles = {
        button: {
            backgroundColor: '#060665',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '10px 20px',
            margin: '20px',
            marginBottom: '50px',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        }
    };

    const hoverStyles = {
        backgroundColor: '#040442',
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
            onClick={onPress}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {text}
        </button>
    );
};

export default PrimaryButton;
