import React, { useState } from 'react'
import Within_Cities from './Within_Cities'
import Between_Cities from './Between_Cities'
import { Tab, Tabs } from '@nextui-org/react'

function Butt_Selecte_trip() {
  const [togglebtn, settogglebtn] = useState('1')

  const Togglebtn = (index: string) => {
    settogglebtn(index)
  }

  function renderButton() {
    if (togglebtn === '1') {
      return <Between_Cities />
    }
    else if (togglebtn === '2') {
      return <Within_Cities />
    }
  }
  return (
    <div className='pt-6 pb-0 mb-0 px-2 w-full'>
      <Tabs style={{margin:''}} aria-label="Options" classNames={{ tabContent: 'text-primary' }} color='primary' onSelectionChange={settogglebtn as any} fullWidth className='w-full' disabledKeys={['3']}>
        <Tab key="1" title="بين المدن"></Tab>
        <Tab key="2" title="داخل المدينة"></Tab>
        <Tab key="3" title="دولي"></Tab>
      </Tabs>
      <div>
        {renderButton()}
      </div>
    </div>
  )
}

export default Butt_Selecte_trip