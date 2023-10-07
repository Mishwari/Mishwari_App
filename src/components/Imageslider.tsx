"use client";
import React from 'react';
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
function imageslider() {
    return (
        <div className=' relative z-0'>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide> <Image alt='' src='/img1.jpg' height={100} width={700}  style={{objectFit:'fill',height:'25vh',width:'100%',padding:'0 0',opacity:'0.5'}} /> </SwiperSlide>
                <SwiperSlide> <Image alt='' src='/img2.jpg' height={100} width={700}  style={{objectFit:'fill',height:'25vh',width:'100%',padding:'0 0',opacity:'0.5'}} /> </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default imageslider