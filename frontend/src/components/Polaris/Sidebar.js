'use client';

import './Sidebar.css';

export default function Sidebar({ acf }) {

    const {
        sidebar_image,
        sidebar_client_heading,
        sidebar_client_description,
        case_study_details,
        performance_metrics,
        topics,
        sidebar_cta_heading,
        sidebar_cta_description,
        sidebar_demo_link,
        sidebar_expert_link,
    } = acf || {};

    if (!acf) return null;

    return (
        <aside className="sidebar">

            {/* CLIENT HOVER CARD */}
            <div className="sidebar-client">

                <div className="sidebar-image-layer">
                    {sidebar_image?.url && (
                        <img
                            src={sidebar_image.url}
                            alt={sidebar_image.alt || sidebar_client_heading || 'Client'}
                            className="sidebar-image"
                        />
     )}
                </div>

                <div className="sidebar-slide-card">
                    <div className="sidebar-slide-content">

                       
                        {sidebar_client_description && (
                            <p>{sidebar_client_description}</p>
                        )}

                        <button>✓ Verified Customer</button>

                    </div>
                </div>

            </div>

            {/* CASE STUDY DETAILS */}
            {case_study_details?.length > 0 && (
                <div className="sidebar-card">

                    <h5>CASE STUDY DETAILS</h5>

                    <table>
                        <tbody>
                            {case_study_details.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.detail_label}</td>
                                    <td>{item.detail_value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            )}

            {/* PERFORMANCE METRICS */}
            {performance_metrics?.length > 0 && (
                <div className="sidebar-card">

                    <h5>PERFORMANCE METRICS</h5>

                    {performance_metrics.map((item, index) => (
                        <div className="metric" key={index}>
                            <div className="metric-row">
                                <span>{item.metric_name}</span>
                                <strong>{item.metric_value}</strong>
                            </div>
                            <div className="metric-line">
                                <div className="metric-fill"></div>
                            </div>
                        </div>
                    ))}

                </div>
            )}

            {/* TOPICS */}
            {topics?.length > 0 && (
                <div className="sidebar-card">

                    <h5>TOPICS</h5>

                    <div className="topics">
                        {topics.map((item, index) => (
                            <span key={index} className="topic">
                                {item.topic_name}
                            </span>
                        ))}
                    </div>

                </div>
            )}

            {/* CTA */}
            <div className="sidebar-cta">

                {sidebar_cta_heading && (
                    <h4>{sidebar_cta_heading}</h4>
                )}

                {sidebar_cta_description && (
                    <p>{sidebar_cta_description}</p>
                )}

                {sidebar_expert_link && (
                    <a
                        href={sidebar_expert_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="primary-btn"
                    >
                      Talk to an Expert   
                    </a>
                )}

             

            </div>

        </aside>
    );
}