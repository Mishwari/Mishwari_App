import Image from 'next/image'
import Navbar from '../components/Navbar'
import Imageslider from '../components/Imageslider'
import Butt_Selecte_trip from '../components/Booking_Board/Butt_Selecte_trip'
export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <Navbar/>
        <Imageslider/>
        <Butt_Selecte_trip/>
      </div>
    </div>

  )
}