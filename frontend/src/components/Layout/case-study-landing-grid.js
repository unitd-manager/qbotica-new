'use client';

import { useState, useEffect } from 'react';
import {
  DivTag,
  H2Tag,
  PTag,
  SpanTag,
} from '../Common/HTMLTags';
import './case-study-landing-style.css';
const filterStyles = {
  filterOuter: {
    padding: '24px 0',
    borderBottom: '1px solid #e5e7eb',
  },
  filterInner: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    gap: '10px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px 6px',
    WebkitOverflowScrolling: 'touch',
  },
};

export default function CaseStudiesLandingGrid({ data }) {
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    console.log('========== CaseStudiesLandingGrid ==========');
    console.log('Full data:', data);
    console.log('Filters:', data?.filters);
    console.log('Cases:', data?.cases);

    if (data?.cases?.length) {
      console.log('First Case:', data.cases[0]);
      console.log('First Case Tags:', data.cases[0].tags);
      console.log('First Case Image:', data.cases[0].image);
    }
  }, [data]);

  if (!data) return null;

  const {
    heading,
    sub_heading,
    empty_state_title,
    empty_state_description,
    filters = [],
    cases = [],
  } = data;

  const filteredCases =
    activeFilter === 'all'
      ? cases
      : cases.filter(
          (item) => item.category === activeFilter
        );

  return (
    <>
      {/* Filter */}
      <DivTag
  className="filter-outer"
  id="case-study-landing-grid"
  style={filterStyles.filterOuter}
>
  <DivTag
    className="filter-inner"
    style={filterStyles.filterInner}
  >
          {filters.map((filter, index) => (
            <button
              key={filter.id || index}
              className={`filter-tab ${
                activeFilter === filter.id ? 'active' : ''
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.filter_label}
            </button>
          ))}
        </DivTag>
      </DivTag>

      {/* Heading */}
      <DivTag className="section-head reveal visible">
        <DivTag>
          <H2Tag>{heading}</H2Tag>
          <PTag>{sub_heading}</PTag>
        </DivTag>

        <SpanTag className="count-badge">
          {filteredCases.length} stories
        </SpanTag>
      </DivTag>

      {/* Grid */}
      <DivTag className="grid-wrap">
        <DivTag className="case-grid">
          {filteredCases.map((caseItem, index) => {
            console.log('Rendering Case:', caseItem);

            const image =
              typeof caseItem.image === 'string'
                ? caseItem.image
                : caseItem.image?.url || '';

            return (
              <article
                key={caseItem.id || index}
                className="case-card reveal visible"
              >
                <DivTag
                  className="cc-image"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(11,17,32,.12) 0%, rgba(11,17,32,.75) 100%), url('${image}')`,
                  }}
                >
                  <SpanTag className="cc-industry">
                    {caseItem.industry}
                  </SpanTag>

                  <DivTag className="cc-stat">
                    <DivTag className="cc-stat-num">
                      {caseItem.statistic_number}
                    </DivTag>

                    <DivTag className="cc-stat-label">
                      {caseItem.statistic_label}
                    </DivTag>
                  </DivTag>
                </DivTag>

                <DivTag className="cc-body">
                  {/* Tags */}
                  <DivTag className="cc-tags">
                    {Array.isArray(caseItem.tags) &&
                      caseItem.tags.map((tag, tagIndex) => (
                        <SpanTag
                          key={tagIndex}
                          className="cc-tag"
                        >
                          {tag.tag}
                        </SpanTag>
                      ))}
                  </DivTag>

                  {/* Title */}
                  <DivTag className="cc-title">
                    {caseItem.title}
                  </DivTag>

                  {/* Description */}
                  <DivTag className="cc-desc">
                    {caseItem.description}
                  </DivTag>

                  {/* Footer */}
                  <DivTag className="cc-footer">
                    <SpanTag className="cc-product">
                      {caseItem.product}
                    </SpanTag>

                    {caseItem.link && (
                      <a
                        href={caseItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cc-link"
                      >
                        Read story →
                      </a>
                    )}
                  </DivTag>
                </DivTag>
              </article>
            );
          })}

          {filteredCases.length === 0 && (
            <DivTag className="empty-state visible">
              <h3>{empty_state_title}</h3>
              <p>{empty_state_description}</p>
            </DivTag>
          )}
        </DivTag>
      </DivTag>
    </>
  );
}