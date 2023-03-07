import React from 'react'
import { useSelector } from 'react-redux'

export default function AppSpinner() {
    const apiIsLoading = useSelector(state => state.spinner.isLoading); //apiIsLoading
    return (
        <div className='AppSpinner'>
            <div className={`${apiIsLoading ? "loading-overlay is-active" : "loading-overlay "}`} >
                <span class="fas fa-spinner fa-3x fa-spin"></span>
            </div>
        </div>
    )
}
