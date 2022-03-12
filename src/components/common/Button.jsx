import React from 'react';

const Button = ({onClick, label, classes, disabled}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={classes}
        >
            {label}
        </button>
    );
};

export default Button;
