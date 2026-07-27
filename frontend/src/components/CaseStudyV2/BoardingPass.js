'use client';

import './BoardingPass.css';
import Image from 'next/image';

export default function BoardingPass({
  scale = 1,
}) {
  return (
    <div
  className="bp-ticket"
  style={{
    transform: `scale(${scale})`,
    transformOrigin: "top right",
    right: "-30px",
    top: "20px",

  }}
>
    

      {/* LEFT SIDE */}
      <div className="bp-left">

   
    <div className="bp-paper">

          <div className="bp-frame">
            <div className="bp-frame-svg">

<svg
    viewBox="0 0 1000 520"
    preserveAspectRatio="none"
>

<path
d="
M40 0
L960 0
L1000 40

L1000 480
L960 520

L40 520
L0 480

L0 40
L40 0
"

className="bp-frame-path"
/>

</svg>

</div>

            <div className="bp-header">

              <div className="bp-header-left">

                <svg
                  className="bp-plane"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>

                <span>ADMISSION PASS</span>

              </div>

              <div className="bp-header-line"></div>

            </div>

            <div className="bp-logo">

              <Image
                src="/assets/images/polaris-cropbg.jpg"
                alt="Polaris"
                fill
                priority
                className="bp-logo-image"
              />

            </div>

            <div className="bp-divider">

              <span className="bp-line"></span>

              <span className="bp-star">✦</span>

              <span className="bp-line"></span>

            </div>

            <div className="bp-client">

              <small>CLIENT</small>

              <h3>Polaris Transportation Group</h3>

            </div>

          </div>

        </div>

      </div>

      
      {/* RIGHT SIDE */}

      <div className="bp-right">

        <div className="bp-right-inner">

          <div className="bp-vip">
            VIP ACCESS
          </div>

          <h2 className="bp-title">
  CASE STUDY
</h2>

          <div className="bp-subtitle">
            ADMISSION PASS
          </div>

          <div className="bp-ticket-box">

            <label>TICKET NO.</label>

            <strong>PTG-2025-001</strong>

          </div>

          
          <div className="bp-barcode">

            {[
              2,1,3,1,2,4,1,2,1,3,2,1,4,1,2,1,3,2,1,2,
              4,1,2,1,3,2,1,4,2,1,3,1,2,4,1,3,2,1,2,3
            ].map((w, i) => (
              <span
                key={i}
                style={{ width: `${w}px` }}
              />
            ))}

          </div>

          <div className="bp-caption">

            DIGITALLY TRANSFORMING
            <br />
            TRANSPORTATION

          </div>

        </div>

      </div>

    </div>
  );
}