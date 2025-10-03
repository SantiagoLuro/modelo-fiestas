
import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/HeroSection';
import CountdownSection from '@/components/CountdownSection';
import EventDetails from '@/components/EventDetails';
import PhotoGallery from '@/components/PhotoGallery';
import MusicSection from '@/components/MusicSection';
import DressCode from '@/components/DressCode';
import RSVP from '@/components/RSVP';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>XV Años de Martina - ¡Celebremos Juntos!</title>
        <meta name="description" content="Te invitamos a celebrar los XV años de Martina. Una noche mágica llena de música, baile y momentos inolvidables." />
        <meta property="og:title" content="XV Años de Martina - ¡Celebremos Juntos!" />
        <meta property="og:description" content="Te invitamos a celebrar los XV años de Martina. Una noche mágica llena de música, baile y momentos inolvidables." />
      </Helmet>
      
      <div className="min-h-screen relative">
        <HeroSection />
        <CountdownSection />
        <EventDetails />
        <PhotoGallery />
        <MusicSection />
        <DressCode />
        <RSVP />
        <Footer />
      </div>
    </>
  );
};

export default Home;
