import React from 'react';
import ImageSlider from '../ImageSlider/ImageSlider';
import HowItWorks from '../HowItWorks/HowItWorks';
import AgriculturalNews from '../AgriculturalNews/AgriculturalNews';
import Testimonials from '../Testimonials/Testimonials';
import ModernTrade from '../ModernTrade/ModernTrade';

const Home = () => {
    return (
        <div>
            <ImageSlider></ImageSlider>
            <ModernTrade></ModernTrade>
            <HowItWorks></HowItWorks>
            <AgriculturalNews></AgriculturalNews>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;