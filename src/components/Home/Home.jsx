import React, { useEffect, useState } from 'react';
import ImageSlider from '../ImageSlider/ImageSlider';
import HowItWorks from '../HowItWorks/HowItWorks';
import AgriculturalNews from '../AgriculturalNews/AgriculturalNews';
import Testimonials from '../Testimonials/Testimonials';
import ModernTrade from '../ModernTrade/ModernTrade';
import LatestCrops from '../LatestCrops/LatestCrops';
import Loader from "../Loader/Loader";

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
                <Loader />
            </div>
        );
    }

    return (
        <div>
            <ImageSlider />
            <LatestCrops />
            <ModernTrade />
            <HowItWorks />
            <AgriculturalNews />
            <Testimonials />
        </div>
    );
};

export default Home;
