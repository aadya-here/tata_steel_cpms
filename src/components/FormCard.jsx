import React from 'react';

const FormCard = ({ form_log }) => {
    const cardStyles = {
        backgroundColor: '#fff',
        padding: '15px',
        margin: '8px 0',
        borderRadius: '8px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)',
        transition: 'box-shadow 0.3s ease',
    };

    const textStyles = {
        fontSize: '16px',
        margin: '7px',
        marginTop: '5px',
        marginBottom: '0',
    };

    return (
        <div style={cardStyles}>
            <p style={textStyles}>
                Project {form_log.project_id} : {form_log.project_title}
            </p>
            <p style={textStyles}>{form_log.form_name} </p>
            <p style={textStyles}>Date: {form_log.date}</p>
        </div>
    );
};

export default FormCard;
