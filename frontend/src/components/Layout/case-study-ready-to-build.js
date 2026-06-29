import React from 'react';
import { DivTag, H2Tag, PTag } from '../Common/HTMLTags';
import './case-study-style.css';

export default function ReadyToBuildPanel() {
  return (
    <section className="cta">
      <DivTag className="cta-inner">
        <H2Tag>
          Ready to build your <br />
          <em>own success story?</em>
        </H2Tag>
        
        <PTag>
          Let's identify where AI and automation can create measurable impact across your 
          operations. Free discovery call, ROI estimate in 48 hours.
        </PTag>
        
        <DivTag className="cta-actions">
          <a href="#" className="btn-primary-cta">
            Schedule a Discovery Call →
          </a>
          <a href="#" className="btn-secondary-cta">
            Talk to an Expert
          </a>
        </DivTag>
      </DivTag>
    </section>
  );
}