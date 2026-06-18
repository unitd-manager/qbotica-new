'use client';

import './Challenge.css';

export default function Challenge() {

  const challengeCards = [
    "Extracting critical shipment data — tracking numbers, origin/destination, pricing inputs, special handling instructions — from wildly inconsistent email formats with no standard structure across hundreds of vendors.",

    "High-volume manual processing creating bottlenecks that delayed vendor responses by hours, directly impacting turnaround time, client SLAs, and competitive positioning.",

    "Noisy email threads filled with legal disclaimers, marketing signatures, and long forwarded chains that masked the actual quotation data and drove up error rates on extraction.",

    "A hard scaling ceiling: to handle growing volume, the only option was adding headcount — an unsustainable cost model in a competitive, margin-constrained freight environment."
  ];

  return (

    <section className="challenge-section">

      <div className="challenge-container">

        <span className="challenge-label">
          THE CHALLENGE
        </span>

        <h2
          className="challenge-title"
          dangerouslySetInnerHTML={{
            __html:
              'Hundreds of emails daily.<br/><span>Zero automation.</span>',
          }}
        />

        <div className="challenge-description">

          <p>
            Polaris Transportation Group's operations team was buried. Every day,
            hundreds of quotation requests arrived from freight vendors — each
            formatted differently, each containing shipment data buried inside
            long, messy email threads that mixed real information with forwarded
            chains, legal disclaimers, and irrelevant attachments.
          </p>

          <p>
            The team was skilled and fast. But skilled and fast wasn't enough.
            As freight volumes grew, the process that worked at 50 documents a day
            started breaking down at 300. Response times slipped. Errors crept in.
            The team was spending the first hours of every shift doing data entry,
            not logistics.
          </p>

</div>
        <div className="challenge-cards">

          {challengeCards.map((item, index) => (

            <div
              className="challenge-card"
              key={index}
            >

              <div className="challenge-number">

                {(index + 1).toString().padStart(2, '0')}

              </div>

              <div className="challenge-content">

                <h4>
                  Challenge {(index + 1).toString().padStart(2, '0')}
                </h4>

                <p>
                  {item}
                </p>

              </div>

            </div>

          ))}

        </div>

        <div className="challenge-quote">

          <div className="challenge-quote-line"></div>

          <p>

          "Our team was spending the first three hours of every shift reading
          emails and copying data into spreadsheets. These were skilled logistics
          people doing unskilled data entry. We knew something had to change."

          </p>

          <span>

            Operations Manager • Polaris Transportation Group

          </span>

        </div>

      </div>

    </section>

  );

}