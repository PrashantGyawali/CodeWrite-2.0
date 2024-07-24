import "./Home.css"


import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, EffectCards } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/autoplay"
import "swiper/css/effect-cards"
import "swiper/css/keyboard"



const Slider =({classNames,type}) => {
    return (
        <Swiper
        rewind={true}
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards,Autoplay]}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }}
        className="swiper" 
        >
        {
            classNames.map((styleClass,index) => <SwiperSlide key={index} className={`${styleClass} ${type}`}></SwiperSlide>)
        }

        </Swiper>
    );
}

export default Slider;