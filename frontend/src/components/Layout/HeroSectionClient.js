"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const Hero = dynamic(
  () => import('./home-banner-with-rotating-cube'),
  { ssr: false }
);

export default function HeroSectionClient(props) {
  return <Hero {...props} />;
}
