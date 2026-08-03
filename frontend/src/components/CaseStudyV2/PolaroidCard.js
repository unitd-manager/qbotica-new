'use client';

import './PolaroidCard.css';
import Image from 'next/image';

export default function PolaroidCard({
  industry = 'Transportation & Supply Chain',
  since = 'CLIENT SINCE 2023',
}) {
  return (
    <div className="polaroid-wrap">

      {/* Tape */}
      <div className="polaroid-tape"></div>

      {/* Card */}
      <div className="polaroid-card">

        {/* Image */}
        <div className="polaroid-frame">
          <div className="polaroid-image">

          <Image
            src="/assets/images/polaris-cropbg.jpg"
            alt="Polaris"
            fill
            priority
            className="polaroid-logo"
          />
        </div>
        </div>

        {/* Industry Label */}
        <div className="polaroid-label">
          Industry
        </div>

        {/* Industry Name */}
        <div className="polaroid-industry">
          {industry}
        </div>

        {/* Client Since */}
        <div className="polaroid-since">
          {since}
        </div>

      </div>

    </div>
  );
}