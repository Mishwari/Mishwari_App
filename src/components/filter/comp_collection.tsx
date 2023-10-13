import React from 'react'
import Bustype from './bustype'
import DepartureTime from './departureTime'
import Busrating from './bus_rating'
import CostFilter from './cost.tsx'
function comp_collection() {
  return (
    <div>
        <Bustype/>
        <DepartureTime/>
        <Busrating/>
        <CostFilter/>
        

    </div>
  )
}
export default comp_collection