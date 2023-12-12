import React from 'react';

const Button = ({ onClick, isVisible }) => {
    return (
        <button
            type="button"
            className="button"
            onClick={onClick}
            style={{ display: isVisible ? 'block' : 'none' }}
        >
            Load more
        </button>
    );
};

export default Button;

