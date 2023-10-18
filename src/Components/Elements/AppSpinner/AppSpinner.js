import React from 'react'
import { useSelector } from 'react-redux'

export default function AppSpinner() {
    const requestCount = useSelector(state => state.spinner.requestCount);
    return (
        <>
            {requestCount > 0 &&
                <div className='AppSpinner'>
                    <div className="spinner"></div>
                </div>
            }
        </>
    )
}
