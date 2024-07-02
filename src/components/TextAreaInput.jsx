import React from 'react';

const TextAreaInput = ({ placeholder, onChange, value }) => {
    return (
        <textarea
            placeholder={placeholder}
            className="textArea"
            onChange={onChange}
            value={value}
        />
    );
};

const styles = `
    .textArea {
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 10px;
        margin: 10px 0;
        height: 100px;
        resize: vertical;
        font-size: 15px;
    }
`;

const MultiLineInput = () => (
    <>
        <style>{styles}</style>
        <TextAreaInput />
    </>
);

export default MultiLineInput;
