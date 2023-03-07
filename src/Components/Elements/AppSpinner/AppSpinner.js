import React from 'react'
import { useSelector } from 'react-redux'

export default function AppSpinner() {
    const apiIsLoading = useSelector(state => state.spinner.isLoading); //apiIsLoading
    return (
        <>
            {apiIsLoading &&
                <div className='AppSpinner'>

                    <div className="spinner"></div>

                </div>
            }
        </>
    )
}
