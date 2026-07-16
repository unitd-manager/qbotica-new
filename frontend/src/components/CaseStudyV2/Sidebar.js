'use client';

import './Sidebar.css';

export default function Sidebar() {

  const metrics = [
    {
      name: 'Noise Removal Rate',
      value: '>90%',
    },
    {
      name: 'Workflow Automation',
      value: '100%',
    },
    {
      name: 'Processing Speed Gain',
      value: '~95%',
    },
    {
      name: 'Exception Auto-resolution',
      value: '~80%',
    },
  ];

  const topics = [
    'Agentic AI',
    'DoqumentAI',
    'Email Automation',
    'RPA',
    'Freight & Logistics',
    'Intelligent OCR',
    'Noise Filtering',
    'HTML',
  ];

  return (

    <aside className="sidebar">

      {/* CLIENT HOVER CARD */}

      <div className="sidebar-client">

        <div className="sidebar-image-layer">

          <img
            src="/assets/images/polaris-sidebar.png"
            alt="Polaris Transportation"
            className="sidebar-image"
        />

        </div>

        <div className="sidebar-slide-card">

          <div className="sidebar-slide-content">

            <p>

              Polaris Transportation Group is a leading North American freight
              and logistics operator managing thousands of shipments daily
              across complex multi-vendor networks.

            </p>

            <button>

              ✓ Verified Customer

            </button>

          </div>

        </div>

      </div>

      {/* CASE STUDY DETAILS */}

      <div className="sidebar-card">

        <h5>

          CASE STUDY DETAILS

        </h5>

        <table>

          <tbody>

            <tr>
              <td>Client</td>
              <td>Polaris Transportation Group</td>
            </tr>

            <tr>
              <td>Industry</td>
              <td>Transportation & Supply Chain</td>
            </tr>

            <tr>
              <td>qBotica Product</td>
              <td>DoqumentAI + RPA</td>
            </tr>

            <tr>
              <td>Use Case</td>
              <td>Email Parsing & Quotation Automation</td>
            </tr>

            <tr>
              <td>Delivery Model</td>
              <td>Managed Service</td>
            </tr>

            <tr>
              <td>Time to Live</td>
              <td>3 weeks</td>
            </tr>

          </tbody>

        </table>

      </div>

      {/* PERFORMANCE */}

      <div className="sidebar-card">

        <h5>

          PERFORMANCE METRICS

        </h5>

        {metrics.map((item,index)=>(

          <div
            className="metric"
            key={index}
          >

            <div className="metric-row">

              <span>

                {item.name}

              </span>

              <strong>

                {item.value}

              </strong>

            </div>

            <div className="metric-line">

              <div className="metric-fill"></div>

            </div>

          </div>

        ))}

      </div>

      {/* TOPICS */}

      <div className="sidebar-card">

        <h5>

          TOPICS

        </h5>

        <div className="topics">

          {topics.map((item,index)=>(

            <span
              key={index}
              className="topic"
            >

              {item}

            </span>

          ))}

        </div>

      </div>

      {/* CTA */}

      <div className="sidebar-cta">

        <h4>

          See this for your business

        </h4>

        <p>

          Free process discovery call. We&apos;ll map your document workflows
          and show where automation delivers the fastest ROI.

        </p>

        
        <a  href="https://meetings.hubspot.com/automation-demo/scheduler"
          target="_blank"
          rel="noopener noreferrer"
          className="primary-btn"
        >

           Talk to an Expert →

        </a>

      </div>

    </aside>

  );

}