import React from 'react'

function Button({
    btnText, 
    type='button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {


    return (
        <button 
            type={type}
            className={`px-6 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}
            {...props}
        >
            {btnText}
        </button>
    )
}

export default Button;