'use client';

import './CaseStudyContent.css';

import Challenge from './Challenge';
import Solution from './Solution';
import Impact from './Impact';
import WhyItWorked from './WhyItWorked';
import Sidebar from './Sidebar';

export default function CaseStudyContent() {

    return (

        <section className="case-study-content-wrapper">

            <div className="case-study-content-container">

                <div className="case-study-left">

                    <Challenge />

                    <Solution />

                    <Impact />

                    <WhyItWorked />

                </div>

                <aside className="case-study-right">

                    <Sidebar />

                </aside>

            </div>

        </section>

    );

}