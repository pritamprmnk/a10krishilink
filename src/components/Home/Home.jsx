import React from 'react';
import ImageSlider from '../ImageSlider/ImageSlider';
import HowItWorks from '../HowItWorks/HowItWorks';
import AgriculturalNews from '../AgriculturalNews/AgriculturalNews';
import Testimonials from '../Testimonials/Testimonials';
import ModernTrade from '../ModernTrade/ModernTrade';
import LatestCrops from '../LatestCrops/LatestCrops';

const Home = () => {
    return (
        <div>
            <ImageSlider></ImageSlider>
            <LatestCrops></LatestCrops>
            <ModernTrade></ModernTrade>
            <HowItWorks></HowItWorks>
            <AgriculturalNews></AgriculturalNews>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;