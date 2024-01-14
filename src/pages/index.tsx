import Image from 'next/image'
import Navbar from '../components/Navbar'
import Imageslider from '../components/Imageslider'
import Butt_Selecte_trip from '../components/Booking_Board/Butt_Selecte_trip'
export default function Home() {
  return (
    <div className="flex flex-col gap-4 max-w-6xl w-full min-h-screen mx-auto ">
      <div className="">
        <Navbar/>
        <Imageslider/>
        <Butt_Selecte_trip/>
      </div>
      <div className='bg-[#31324A]  flex  justify-center  text-white py-2 mt-auto'>
        <p>طور بكل ❤️ في اليمن </p> 
      </div>
    </div>

  )
}