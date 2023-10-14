import React, { useState } from 'react'

function cost() {
    const [departureTime, setDepartureTime] = useState()
    const [busRating, setBbusRating] = useState()
    const [minumumtripCost, setMminumumtripCost] = useState()
    const [maximumtripCost, setMaximumtripCost] = useState()

    
    return (
        <div >
            <h1 className='font-bold pt-6'>Cost</h1>
            <div className='flex flex-col justify-center items-center gap-y-5'>
                <div className='flex justify-center items-center gap-x-5'>

                    <div className='flex flex-col items-center'>
                        <h1>Min</h1>
                        <p className='h-6 w-20 border border-slate-300 rounded-lg '></p>
                    </div>

                    <div className='flex flex-col items-center'>
                        <h1>Max</h1>
                        <p className='h-6 w-20 border border-slate-300 rounded-lg '></p>
                    </div>
                </div>
                <div>
                    <label htmlFor="" className='h-auto'>
                        <input type='range' min="0" max="1000" />
                    </label>
                </div>
            </div>

        </div>
    )
}

export default cost