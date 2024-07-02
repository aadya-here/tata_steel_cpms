import React from 'react';

const Title = ({ text }) => {
    return <h1 style={styles.title}>{text}</h1>;
};

const styles = {
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2F394B',
        marginTop: 25,
        textAlign: 'center',
        marginBottom: 20,
    },
};

export default Title;
