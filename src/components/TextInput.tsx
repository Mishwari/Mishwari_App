import React, { useState } from 'react'

interface TextInputProps {
  title?:string;
  type?: string ;
  placeholder?: string;
  value?:any;
  setValue?:any;

}


function TextInput({title="المعلومات", placeholder="مثال", type="text",value, setValue}:TextInputProps) {
  // const [value, setValue] = useState<string | number | undefined>()
  return (
    <div className='px-4 py-2 w-full'>
        <h1 className='text-sm'>{title}</h1>
        <input
          type={type} 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className='w-full px-2 py-1 border-b-1.5  border-[#005687] text-lg font-bold focus:outline-none'
        />
    </div>
  )
}

export default TextInput