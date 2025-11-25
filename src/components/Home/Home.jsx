import React from 'react';
import ImageSlider from '../ImageSlider/ImageSlider';
import HowItWorks from '../HowItWorks/HowItWorks';
import AgriculturalNews from '../AgriculturalNews/AgriculturalNews';
import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
    return (
        <div>
            <ImageSlider></ImageSlider>
            <HowItWorks></HowItWorks>
            <AgriculturalNews></AgriculturalNews>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;