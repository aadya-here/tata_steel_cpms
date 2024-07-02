import React, { useState } from 'react';
import PropTypes from 'prop-types'; // For prop types validation

const InputField = ({ placeholder, iconLib: IconComponent, iconName, onChangeText }) => {
    const [isFocused, setIsFocused] = useState(false);

    const styles = {
        inputContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            width: '100%',
            borderRadius: '10px',
            margin: '5px 0',
            padding: '10px',
            border: isFocused ? '2px solid #08077A' : '2px solid #ccc',
        },
        icon: {
            marginRight: '10px',
        },
        inputBox: {
            flex: 1,
            fontSize: '15px',
            color: '#000',
            border: 'none',
            outline: 'none',
        },
    };

    return (
        <div style={styles.inputContainer}>
            {/* <IconComponent name={iconName} size={24} color="grey" style={styles.icon} /> */}
            <input
                type="text"
                placeholder={placeholder}
                style={styles.inputBox}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => onChangeText(e.target.value)}
            />
        </div>
    );
};

InputField.propTypes = {
    placeholder: PropTypes.string.isRequired,
    iconLib: PropTypes.elementType.isRequired,
    iconName: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
};

export default InputField;
