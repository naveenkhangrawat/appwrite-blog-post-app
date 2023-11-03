import React, { useId } from 'react'

function Input({
    label,
    type='text',
    placeholder='',
    className='',
    ...props
}, ref) {

    const id = useId();


    return (
        <div className='w-full'>
            {label && (
                <label 
                    htmlFor={id}
                    className='inline-block mb-1 pl-1'
                >
                    {label}
                </label>
            )}
            <input 
                type={type}
                placeholder={placeholder}
                id={id}
                className={`w-full px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 ${className}`}
                {...props}
                ref={ref}
            />
            
        </div>
    )
}

export default React.forwardRef(Input);