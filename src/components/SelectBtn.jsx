import React, { useId } from 'react'

function SelectBtn({
    label,
    options=[],
    className = '',
    ...props
}, ref) {

    const id = useId();

    return (
        <div className='w-full'>
            {label && (
                <label htmlFor={id}>{label}</label>
            )}
            <select 
                name=""
                className={`w-full px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 ${className}`}
                id={id}
                {...props}
                ref={ref}
            >
                {options?.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(SelectBtn);