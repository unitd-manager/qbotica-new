'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { DivTag, H2Tag, H4Tag, H5Tag, PTag, SectionTag } from '../Common/HTMLTags';
import Image from 'next/image';
import ChartFromWP from '../Common/Chart';

export default function TimelineSections({ data }) {
    if (!data || typeof data !== 'object') return null;

    const {
        main_title,
        sub_title,
        description,
        timelines = [],
        cta_button,
        class_name,
        id,
        padding = {}
    } = data;

    const wrapperRef = useRef(null);
    const rowRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progressHeight, setProgressHeight] = useState(0);

    useEffect(() => {
        const observers = [];

        rowRefs.current.forEach((row, index) => {
            if (!row) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveIndex(index);
                    }
                },
                { threshold: 0.45 }
            );

            observer.observe(row);
            observers.push(observer);
        });

        return () => observers.forEach((observer) => observer.disconnect());
    }, [timelines]);

    useEffect(() => {
        const calculateProgressHeight = () => {
            const wrapper = wrapperRef.current;
            const activeRow = rowRefs.current[activeIndex];

            if (!wrapper || !activeRow) {
                setProgressHeight(0);
                return;
            }

            const wrapperRect = wrapper.getBoundingClientRect();
            const rowRect = activeRow.getBoundingClientRect();
            const newHeight = Math.max(0, rowRect.top + rowRect.height / 2 - wrapperRect.top);
            setProgressHeight(newHeight);
        };

        calculateProgressHeight();
        window.addEventListener('resize', calculateProgressHeight);
        return () => window.removeEventListener('resize', calculateProgressHeight);
    }, [activeIndex, timelines.length]);

    let paddingClass = '';
    if (padding.padding_options && padding.padding_options === true) {
        const {
            padding_position = [],
            desktop_padding = {},
            mobile_padding = {}
        } = padding;

        if (padding_position.includes('top')) {
            if (desktop_padding?.padding_top_desktop)
                paddingClass += ` padding-top-desktop-${desktop_padding.padding_top_desktop}px`;
            if (mobile_padding?.padding_top_mobile)
                paddingClass += ` padding-top-mobile-${mobile_padding.padding_top_mobile}px`;
        }

        if (padding_position.includes('bottom')) {
            if (desktop_padding?.padding_bottom_desktop)
                paddingClass += ` padding-bottom-desktop-${desktop_padding.padding_bottom_desktop}px`;
            if (mobile_padding?.padding_bottom_mobile)
                paddingClass += ` padding-bottom-mobile-${mobile_padding.padding_bottom_mobile}px`;
        }
    }

    const renderBlock = (block) => {
        if (!block) return null;

        return (
            <DivTag className="timeline-text-content">
                {block.label && <PTag className="timeline-label">{block.label}</PTag>}
                {block.title && <H5Tag className="timeline-title" dangerouslySetInnerHTML={{ __html: block.title }} />}
                {block.subtitle && <PTag className="timeline-subtitle">{block.subtitle}</PTag>}
                {block.description && <DivTag className="timeline-description" dangerouslySetInnerHTML={{ __html: block.description }} />}
                {block.note && <PTag className="timeline-note">{block.note}</PTag>}
                {block.status && <PTag className="timeline-status">{block.status}</PTag>}
            </DivTag>
        );
    };

    return (
        <SectionTag className={`timeline-section ${class_name}`} id={id}>
            <DivTag className="container">
                <DivTag className={`sub-section ${paddingClass}`}>
                    {/* Section Header */}
                    <DivTag className="main-content text-center">
                        {main_title && <H2Tag className="main-title" dangerouslySetInnerHTML={{ __html: main_title }} />}
                        {sub_title && <H4Tag className="sub-title" dangerouslySetInnerHTML={{ __html: sub_title }} />}
                        {description && <DivTag dangerouslySetInnerHTML={{ __html: description }} />}
                    </DivTag>

                    {/* Timeline Wrapper with spine */}
                    <DivTag className="timeline-wrapper" ref={wrapperRef} style={{ '--progress-height': `${progressHeight}px` }}>
                        {timelines.map((item, index) => {
                            const leftContent = renderBlock(item.left);
                            const rightContent = renderBlock(item.right);

                            return (
                                <DivTag
                                    className={`row timeline-row align-items-center ${activeIndex === index ? 'active' : ''}`}
                                    key={index}
                                    ref={(el) => (rowRefs.current[index] = el)}
                                >
                                    <DivTag className="col-md-6 timeline-col">
                                        {leftContent}
                                    </DivTag>
                                    <DivTag className="col-md-6 timeline-col">
                                        {rightContent}
                                    </DivTag>
                                </DivTag>
                            );
                        })}
                        {cta_button && (
                            <DivTag className="timeline-cta">
                                <Link href={cta_button.url} target={cta_button.target || '_self'} className="btn primary-btn">
                                    {cta_button.title || 'Learn More'}
                                </Link>
                            </DivTag>
                        )}
                    </DivTag>
                </DivTag>
            </DivTag>
        </SectionTag>
    );
}