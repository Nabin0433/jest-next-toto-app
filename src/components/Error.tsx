import React from 'react'

const Error = ({ value }: { value: string }) => {
    return (
        <div className='h-[50vh] w-full flex items-center justify-center'>
            <p className='text-red-600'>{value}</p>
        </div>
    )
}

export default Error