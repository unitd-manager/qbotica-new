'use client';

import './PolaroidCard.css';
import Image from 'next/image';

export default function PolaroidCard({
  label = 'Industry',
  industry = 'Transportation & Supply Chain',
  since = 'CLIENT SINCE 2023',
  imageUrl = '/assets/images/polaris-cropbg.jpg',
  imageAlt = 'Polaris',
}) {
  return (
    <div className="polaroid-wrap">
      <div className="polaroid-tape"></div>

      <div className="polaroid-card">
        <div className="polaroid-frame">
          <div className="polaroid-image">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              className="polaroid-logo"
            />
          </div>
        </div>

        <div className="polaroid-label">{label}</div>
        <div className="polaroid-industry">{industry}</div>
        <div className="polaroid-since">{since}</div>
      </div>
    </div>
  );
}