import React, { useEffect, useState } from 'react'

function bustype() {
    const [bustype, setBustype] = useState<string[]>([])

    // const Togglebtn = (index: string) => {
    //     if (bustype == 1) {
    //         setBustype(index)
    //         console.log('bustype:massbus')
    //     } else if (bustype == 2) {
    //         setBustype(index)
    //         console.log('bustype:Bulka Bus')
    //     }
    // }

    const OnTarvelModeSelected = (e: any) => {

        const selectedvalue = e.target.value;

        if (e.target.checked) {
            setBustype((prevValue: any) => [...prevValue, selectedvalue])

        } else {
            setBustype((prevValue) => prevValue.filter((item) => item !== selectedvalue))

        }

    }

    console.log('bus type:' + bustype)


    return (
        <div>
            <h1 className='font-bold'>Bus Type</h1>
            <div className='my-4 cursor-pointer '>
                <div className='flex items-center gap-x-4'>
                    <label className={`border border-slate-400 p-2 rounded-lg w-fit flex flex-col justify-center items-center ${bustype.includes('massbus') ? 'bg-[#005687]' : 'bg-[#e2e1e1]'}`}>
                        <input onChange={(e) => OnTarvelModeSelected(e)} type='checkbox' value="massbus" className={`hidden border border-slate-400 p-2 rounded-lg w-fit flex flex-col justify-center items-center ${bustype.includes('massbus') ? `bg-[#5d859c] text-white` : ``} `} />
                        <img src="/icons/massbus.svg" alt="massbus" className='h-8 w-8 ' />
                        <p className='text-base pt-1'>Mass Bus</p>
                    </label>

                    <label className={`border border-slate-400 p-2 rounded-lg w-fit flex flex-col justify-center items-center ${bustype.includes('bulkabus') ? 'bg-[#005687] border-2 border-black' : 'bg-[#e2e1e1]'}`}>
                        <input type='checkbox' value="bulkabus" onChange={(e) => OnTarvelModeSelected(e)}   className={`hidden border border-slate-400 p-2 rounded-lg w-fit flex flex-col justify-center items-center `} />
                        <img src="/icons/Bulkabus.svg" alt="massbus" className='h-8 w-8 ' />
                        <p className='text-base pt-1'>Bulka Bus</p>
                    </label>

                </div>
                <h1 className='text-bold text-black'> you selected:{bustype}  </h1>
            </div>
            <p className=' border-b border-slate-500 h-2 w-full'></p>
        </div>
    )
}

export default bustype