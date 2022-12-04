import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../../reducers/counterSlice'

export default function Layout() {

    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            Layout
            <div>
                <div>
                    <button
                        aria-label="Increment value"
                        onClick={() => dispatch(increment())}
                    >
                        Increment
                    </button>
                    <span>{count}</span>
                    <button
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement())}
                    >
                        Decrement
                    </button>
                </div>
            </div>
            <Outlet />
        </div>

    )
}
