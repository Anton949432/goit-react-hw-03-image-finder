import React from 'react';

const Button = ({ onClick }) => {
    return (
        <button type="button" className="button" onClick={onClick}>
            Load more
        </button>
    );
};

export default Button;

