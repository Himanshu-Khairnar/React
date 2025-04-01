import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Companies from './components/Companies';
import WhatsIsGpt from './components/WhatsIsGpt';

export default function App() {
   return (
    <div>
      <Header/>
      <Hero/>
      <Companies/>
      <WhatsIsGpt/>
      <Footer/>
    </div>
   );
}
