"use client";
import dynamic from 'next/dynamic';
import React from 'react';

const HeroSection = dynamic(() => import('./HeroSection'), {
  ssr: false,
  loading: () => <div style={{ backgroundColor: '#030712', minHeight: '100vh' }} />,
});

export default function HeroSectionWrapper(props) {
  return <HeroSection {...props} />;
}
